import csv
import json
import os
import logging

from functools import reduce

logger = logging.getLogger("converter")

IN_FOLDER = ["data", "csv"]
OUT_FOLDER = ["data", "geojson"]

# Map CSV input column names to names of GeoJSON features

MAPPINGS = {
    "churches": {
        "kind": "church",
        "fields": {
            "title": "Kirche",
            "constructed": "Baudatum",
            "community": "Kirchengemeinde",
        },
    },
    "groups": {
        "kind": "group",
        "fields": {
            "title": "Name Organisation/Gruppen",
            "city": "Ort (Stadt)",
            "website": "Webseite",
            "contact": "Kontakt (email)",
            "plants": "Kraftwerke",
            "note": "Besonderheit",
            "news": "News",
        },
    },
    "mines": {
        "kind": "mine",
        "fields": {
            "title": "Tagebau",
            "territory": "Revier",
            "owner": "Unternehmen",
            "volume": "Abbaumenge (in Mio. t Braunkohle/ Unternehmensplanung)",
            "note": "Anmerkung",
            "size": "Größe (in km²)",
            "status": "Planungsstand",
            "plants": "Kraftwerke",
            "villages": "Bedrohte Dörfer",
        },
    },
    "villages": {
        "kind": "village",
        "fields": {
            "title": "Dorf",
            "relocations": "Umsiedlungen",
            "relocations_status": "Umsiedlungsstatus",
        },
    },
    "plants": {
        "kind": "plant",
        "fields": {
            "title": "title",
            "date": "date",
            "capacity": "capacity",
            "emissions": "emissions",
            "age": "age",
            "owner": "owner",
            "fuel": "fuel",
            "maps": "maps",
            "status": "status",
            "retirement": "retirement",
        },
    }
}


def read_data(path):
    unique_titles = set()

    def valid(entry):
        if entry.get("Koordinaten") == "":
            return False

        return True

    with open(path) as f:
        rv = [
            entry
            for entry in csv.DictReader(f, delimiter=";", dialect="excel")
            if valid(entry)
        ]
    return rv


def transform_geojson(data, mapping):
    rv = {"features": [], "type": "FeatureCollection"}

    def decode_coordinates(row):
        if "latitude" in row:
            x  = row["latitude"]
            y = row["longitude"]
        else:
            x, y = row["Koordinaten"].split(", ")
        return list(map(float, [y, x]))

    unique_titles = set()
    for row in data:
        feature = {
            "type": "Feature",
            "properties": {"kind": mapping["kind"]},
            "geometry": {"coordinates": decode_coordinates(row), "type": "Point"},
        }
        for k, v in mapping["fields"].items():
            feature["properties"][k] = row.get(v)

        if feature["properties"]["title"] in unique_titles:
            logger.warning(
                f"The {feature['properties']['kind']} {feature['properties']['title']} has a duplicate title"
            )
        unique_titles.add(feature["properties"]["title"])
        rv["features"].append(feature)
    return rv


def write_out(geojson, out_path):
    with open(out_path, "w+") as f:
        json.dump(geojson, f, ensure_ascii=False, indent=2)


def make_in_path(kind):
    rv = reduce(os.path.join, IN_FOLDER + [f"{kind}.csv"])
    logger.debug(f"In path: {rv}")
    return rv


def make_out_path(kind):
    rv = reduce(os.path.join, OUT_FOLDER + [f"{kind}.geojson"])
    logger.debug(f"Out path: {rv}")
    return rv


def main():
    for (kind, mapping) in MAPPINGS.items():
        logger.debug(f"Mapping {kind}")
        data = read_data(make_in_path(kind))
        geojson = transform_geojson(data, mapping)
        write_out(geojson, make_out_path(kind))


if __name__ == "__main__":
    main()
