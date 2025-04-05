import requests
from config.config import GOOGLE_MAPS_API_KEY

class GoogleMapsTool:
    def __init__(self):
        self.distance_matrix_url = "https://maps.googleapis.com/maps/api/distancematrix/json"
        self.directions_url = "https://maps.googleapis.com/maps/api/directions/json"

    def get_distance_and_duration(self, origin: str, destination: str, mode: str = "driving"):
        """Returns distance and duration between two places."""
        params = {
            "origins": origin,
            "destinations": destination,
            "mode": mode,
            "key": GOOGLE_MAPS_API_KEY
        }
        response = requests.get(self.distance_matrix_url, params=params)
        data = response.json()

        try:
            element = data["rows"][0]["elements"][0]
            return {
                "distance": element["distance"]["text"],
                "duration": element["duration"]["text"],
                "status": element["status"]
            }
        except Exception as e:
            return {"error": str(e)}

    def get_route_steps(self, origin: str, destination: str, mode: str = "driving"):
        """Returns step-by-step directions between two places."""
        params = {
            "origin": origin,
            "destination": destination,
            "mode": mode,
            "key": GOOGLE_MAPS_API_KEY
        }
        response = requests.get(self.directions_url, params=params)
        data = response.json()

        try:
            steps = data["routes"][0]["legs"][0]["steps"]
            instructions = [
                {
                    "instruction": step["html_instructions"],
                    "distance": step["distance"]["text"],
                    "duration": step["duration"]["text"]
                }
                for step in steps
            ]
            return instructions
        except Exception as e:
            return {"error": str(e)}