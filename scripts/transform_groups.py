import csv
import json

IN_PATH = "data/groups.csv"
OUT_PATH = "public/data/groups.geojson"


def valid(group):
    if group["Koordinaten"] == "":
        return False

    return True


def read_data():
    with open(IN_PATH) as f:
        rv = [
            group
            for group in csv.DictReader(f, delimiter=";", dialect="excel")
            if valid(group)
        ]
    return rv


def transform_geojson(data):
    rv = {"features": [], "type": "FeatureCollection"}

    def decode_coordinates(row):
        x, y = row["Koordinaten"].split(", ")
        return list(map(float, [y, x]))

    for row in data:
        feature = {
            "type": "Feature",
            "properties": {
                "title": row["Name Organisation/Gruppen"],
                "city": row["Ort (Stadt)"],
                "website": row["Webseite"],
                "contact": row["Kontakt (email)"],
                "plants": row["Kraftwerke"],
                "note": row["Besonderheit"],
                "news": row["News"],
            },
            "geometry": {"coordinates": decode_coordinates(row), "type": "Point"},
        }
        rv["features"].append(feature)
    return rv


def write_out(geojson):
    with open(OUT_PATH, "w+") as f:
        json.dump(geojson, f, ensure_ascii=False, indent=2)


def main():
    data = read_data()
    geojson = transform_geojson(data)
    write_out(geojson)


if __name__ == "__main__":
    main()
