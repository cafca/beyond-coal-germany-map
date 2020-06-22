import json
import logging
from collections import defaultdict

IN_PATH = "data/json/powerplants.json"
OUT_PATH = "data/geojson/plants.geojson"

logger = logging.getLogger("converter")


def read_data():
    with open(IN_PATH) as f:
        rv = json.load(f)
    return rv


def filter_plants(data):
    plants = dict()
    for plant in data:
        if plant["country"] != "Germany":
            continue

        # todo: compare by parsing date
        if plant["plantName"] in plants:
            if plant["date"] > plants[plant["plantName"]]["date"]:
                plants[plant["plantName"]] = plant
        else:
            plants[plant["plantName"]] = plant
    return plants.values()


def is_plant_retiring(plant):
    """Apply tests to find out whether plant is retiring."""

    # All plants that are retiring are currently open
    if plant["status"] != "Open":
        return False

    # All plants that are not retiring have a retYear of 0
    if (type(plant["retYear"])) == int:
        return plant["retYear"] > 0

    # Some plants that are retiring have a retYear that is a string,
    # such as "202x". All of these start with a number larger than 0.
    return int(plant["retYear"][0]) > 0


def transform_geojson(plants):
    rv = {"features": [], "type": "FeatureCollection"}
    unique_titles = set()

    for plant in plants:
        if is_plant_retiring(plant):
            plant["status"] = "Retiring"

        if plant["plantName"] in unique_titles:
            logger.warning(f"'{plant['plantName']}' is a duplicate title")
        unique_titles.add(plant["plantName"])

        plant_feature = {
            "type": "Feature",
            "properties": {
                "kind": "plant",
                "title": plant["plantName"],
                "date": plant["date"],
                "capacity": plant["operational"],
                "emissions": plant["emissionCo2"],
                "age": plant["age"],
                "owner": plant["owner"],
                "fuel": plant["fuel"],
                "maps": plant["Google link"],
                "status": plant["status"],
                "retirement": plant["retYear"],
            },
            "geometry": {"coordinates": [plant["long"], plant["lat"]], "type": "Point"},
        }
        rv["features"].append(plant_feature)
    return rv


def write_out(geojson):
    with open(OUT_PATH, "w+") as f:
        json.dump(geojson, f, ensure_ascii=False, indent=2)


def main():
    data = read_data()
    plants = filter_plants(data)
    geojson = transform_geojson(plants)
    write_out(geojson)


if __name__ == "__main__":
    main()
