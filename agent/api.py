from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, validator
from datetime import date, datetime
from typing import Optional, Dict
from agents import season_agent, location_agent, lodging_agent, persona_agent, planner_agent, budget_agent
from tasks import location_task, weather_task, lodging_task, persona_task, planner_task, budget_task
from crewai import Crew, Process, Task
import uuid

app = FastAPI(title="AI-Powered Trip Planner API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

class TripRequest(BaseModel):
    from_city: str
    destination_city: str
    date_from: str
    date_to: str
    people: str
    relationship: str
    interests: str
    luxury: str
    budget: str

    @validator('date_from', 'date_to')
    def validate_dates(cls, value):
        try:
            datetime.strptime(value, '%m-%d-%Y')
            return value
        except ValueError:
            raise ValueError('Date must be in MM-DD-YYYY format')

class ChatRequest(BaseModel):
    itinerary_id: str
    user_message: str

class ItineraryResponse(BaseModel):
    itinerary_id: str
    travel_plan: str
    locations: list[str]

itinerary_storage: Dict[str, str] = {}

@app.get("/")
async def root():
    return {"message": "Welcome to AI-Powered Trip Planner API"}

def extract_locations(travel_plan: str) -> list:
    # Split the plan into lines and look for location mentions
    lines = travel_plan.split('\n')
    locations = set()
    
    # Common location indicators
    indicators = ['visit', 'at']
    
    for line in lines:
        line = line.lower()
        for indicator in indicators:
            if indicator in line:
                # Get the word after the indicator
                parts = line.split(indicator)
                if len(parts) > 1:
                    # Get the first word/phrase after the indicator
                    location = parts[1].split(',')[0].split('.')[0].strip()
                    if location:
                        locations.add(location.title())
    
    return list(locations)

@app.post("/generate-plan", response_model=ItineraryResponse)
async def generate_plan(trip_request: TripRequest):
    try:
        # Convert string dates to date objects
        date_from = datetime.strptime(trip_request.date_from, '%m-%d-%Y').date()
        date_to = datetime.strptime(trip_request.date_to, '%m-%d-%Y').date()
        
        # Initialize Tasks
        loc_task = location_task(
            location_agent, 
            trip_request.from_city, 
            trip_request.destination_city, 
            date_from,
            date_to
        )
        
        weather_task_obj = weather_task(
            season_agent, 
            trip_request.destination_city, 
            date_from,
            date_to
        )
        
        persona_task_obj = persona_task(
            persona_agent,
            trip_request.people,
            trip_request.relationship
        )
        
        budget_task_obj = budget_task(
            [loc_task, persona_task_obj],
            budget_agent,
            trip_request.budget,
            trip_request.luxury
        )
        
        lodging_task_obj = lodging_task(
            [loc_task, persona_task_obj, budget_task_obj],
            lodging_agent,
            trip_request.people
        )
        
        planner_task_obj = planner_task(
            [loc_task, weather_task_obj, lodging_task_obj, persona_task_obj],
            planner_agent
        )

        # Define Crew
        crew = Crew(
            agents=[
                location_agent, 
                season_agent,
                persona_agent,
                budget_agent,
                lodging_agent,
                planner_agent
            ],
            tasks=[
                loc_task,
                weather_task_obj,
                persona_task_obj,
                budget_task_obj,
                lodging_task_obj,
                planner_task_obj
            ],
            process=Process.sequential,
            full_output=True,
            verbose=True,
        )

        # Run Crew AI
        result = crew.kickoff()
        
        # Generate unique ID and store itinerary
        itinerary_id = str(uuid.uuid4())
        itinerary_storage[itinerary_id] = str(result)
        
        # Extract locations from the travel plan
        locations = extract_locations(str(result))
        
        return ItineraryResponse(
            itinerary_id=itinerary_id,
            travel_plan=str(result),
            locations=locations
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/itinerary/{itinerary_id}")
async def get_itinerary(itinerary_id: str):
    if itinerary_id not in itinerary_storage:
        raise HTTPException(status_code=404, detail="Itinerary not found")
    return {"travel_plan": itinerary_storage[itinerary_id]}

@app.post("/modify-itinerary")
async def modify_itinerary(chat_request: ChatRequest):
    try:
        if chat_request.itinerary_id not in itinerary_storage:
            raise HTTPException(status_code=404, detail="Itinerary not found")
        
        # Get the existing itinerary
        current_itinerary = itinerary_storage[chat_request.itinerary_id]
        
        # Create a modification prompt
        modification_prompt = f"""
        Current Itinerary:
        {current_itinerary}
        
        User Request for Changes:
        {chat_request.user_message}
        
        Please modify the itinerary according to the user's request while maintaining the overall structure and quality.
        """
        
        # Create a modification task
        modification_task = Task(
            description=modification_prompt,
            agent=planner_agent,
            expected_output="A modified travel itinerary based on the user's request that maintains the same structure and quality as the original plan."
        )

        # Create a crew with just the modification task
        modification_crew = Crew(
            agents=[planner_agent],
            tasks=[modification_task],
            process=Process.sequential
        )
        
        # Get the modified result
        modification_result = modification_crew.kickoff()
        
        # Update the stored itinerary
        itinerary_storage[chat_request.itinerary_id] = str(modification_result)
        
        return {
            "itinerary_id": chat_request.itinerary_id,
            "travel_plan": str(modification_result)
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) 