import csv
import json
import os

from functools import reduce

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
}


def read_data(path):
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
        x, y = row["Koordinaten"].split(", ")
        return list(map(float, [y, x]))

    for row in data:
        if row is None:
            import pdb

            pdb.set_trace()
        feature = {
            "type": "Feature",
            "properties": {"kind": mapping["kind"]},
            "geometry": {"coordinates": decode_coordinates(row), "type": "Point"},
        }
        for k, v in mapping["fields"].items():
            feature["properties"][k] = row.get(v)
        rv["features"].append(feature)
    return rv


def write_out(geojson, out_path):
    with open(out_path, "w+") as f:
        json.dump(geojson, f, ensure_ascii=False, indent=2)


def make_in_path(kind):
    rv = reduce(os.path.join, IN_FOLDER + [f"{kind}.csv"])
    print(f"In path: {rv}")
    return rv


def make_out_path(kind):
    rv = reduce(os.path.join, OUT_FOLDER + [f"{kind}.geojson"])
    print(f"Out path: {rv}")
    return rv


def main():
    for (kind, mapping) in MAPPINGS.items():
        print(f"Mapping {kind}")
        data = read_data(make_in_path(kind))
        geojson = transform_geojson(data, mapping)
        write_out(geojson, make_out_path(kind))


if __name__ == "__main__":
    main()
