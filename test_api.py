import requests
from datetime import date

BASE_URL = "http://localhost:8000"

def test_trip_planner():
    initial_request = {
        "from_city": "New York",
        "destination_city": "Paris",
        "date_from": "2024-06-01",
        "date_to": "2024-06-07",
        "people": "2",
        "relationship": "couple",
        "interests": "art, food, culture",
        "luxury": "medium",
        "budget": "3000"
    }
    
    response = requests.post(f"{BASE_URL}/generate-plan", json=initial_request)
    print("Initial Plan Response:", response.json())
    
    itinerary_id = response.json()["itinerary_id"]
    
    get_response = requests.get(f"{BASE_URL}/itinerary/{itinerary_id}")
    print("\nRetrieved Itinerary:", get_response.json())
    
    modification_request = {
        "itinerary_id": itinerary_id,
        "user_message": "Can we add more restaurants to day 2 of the trip?"
    }
    
    modify_response = requests.post(f"{BASE_URL}/modify-itinerary", json=modification_request)
    print("\nModified Itinerary:", modify_response.json())

if __name__ == "__main__":
    test_trip_planner() 