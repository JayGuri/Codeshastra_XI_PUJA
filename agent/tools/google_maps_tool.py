import requests
from langchain.tools import BaseTool
from typing import Optional, Type
from pydantic import BaseModel, Field

# Example schema for input validation (optional but useful for LangChain)
 # Replace this with a secure method in pro

class GoogleMapsTool(BaseTool):
    name = "google_maps_tool"
    description = "Returns distance/duration or step-by-step directions between two places using Google Maps."

    def __init__(self):
        super().__init__()
        self.distance_matrix_url = "https://maps.googleapis.com/maps/api/distancematrix/json"
        self.directions_url = "https://maps.googleapis.com/maps/api/directions/json"

    def get_distance_and_duration(self, origin: str, destination: str, mode: str = "driving"):
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

    def _run(self, origin: str, destination: str, mode: str = "driving", steps: bool = False):
        if steps:
            return self.get_route_steps(origin, destination, mode)
        return self.get_distance_and_duration(origin, destination, mode)

    async def _arun(self, origin: str, destination: str, mode: str = "driving", steps: bool = False):
        # Optional: If using async agents, implement this.
        raise NotImplementedError("Async not implemented.")
