from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from datetime import date
from typing import Optional
from agents import season_agent, location_agent, lodging_agent, persona_agent, planner_agent, budget_agent
from tasks import location_task, weather_task, lodging_task, persona_task, planner_task, budget_task
from crewai import Crew, Process

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
    date_from: date
    date_to: date
    people: str
    relationship: str
    interests: str
    luxury: str
    budget: str

@app.get("/")
async def root():
    return {"message": "Welcome to AI-Powered Trip Planner API"}

@app.post("/generate-plan")
async def generate_plan(trip_request: TripRequest):
    try:
        # Initialize Tasks
        loc_task = location_task(
            location_agent, 
            trip_request.from_city, 
            trip_request.destination_city, 
            trip_request.date_from, 
            trip_request.date_to
        )
        
        weather_task_obj = weather_task(
            season_agent, 
            trip_request.destination_city, 
            trip_request.date_from, 
            trip_request.date_to
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
        
        return {
            "status": "success",
            "travel_plan": str(result)
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) 