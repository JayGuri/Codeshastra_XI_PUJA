from crewai import Agent
from tools.search_tools import scrape_web_tool
from crewai import LLM
#from tools.google_maps_tool import GoogleMapsTool

#from pydantic import BaseModel
#maps = GoogleMapsTool()
#class Weather(BaseModel):
#   city: str
 #   temp: int

#class Attractions(BaseModel):
 #   attractions: dict


gemini_flash = LLM(
    model="gemini/gemini-2.0-flash",
    temperature=0.3,  
    max_tokens=2000,
    top_p=0.95, 
    frequency_penalty=0.25
)

season_agent = Agent(
    name="Season Analyst",
    role="Analyze historical weather patterns and seasonal trends",
    goal="Provide accurate weather expectations and packing recommendations",
    backstory="A meteorology expert with decade of travel industry experience",
    tools=[scrape_web_tool],
    verbose=True,
    max_iter=7,  # Increased for complex weather analysis
    llm=gemini_flash,
    async_execution=True,  # Enable parallel processing
    memory=True  # Remember previous analyses
)

location_agent = Agent(
    name="Attractions Curator",
    role="Identify trending and niche local experiences",
    goal="Curate personalized attraction lists with crowd predictions",
    backstory="A cultural anthropologist turned travel influencer",
    tools=[scrape_web_tool],
    verbose=True,
    max_iter=8,  # More iterations for comprehensive research
    llm=gemini_flash,
    async_execution=True,
    allow_delegation=False,
    memory=True
)

persona_agent = Agent(
    name="Travel Psychologist",
    role="Analyze group dynamics and personal preferences",
    goal="Optimize trip structure for relationship dynamics",
    backstory="Behavioral scientist specializing in group travel dynamics",
    verbose=True,
    llm=gemini_flash.clone(temperature=0.7),  # More creative suggestions
    max_rpm=15,  # Rate limiting for API safety
    memory=True,
    step_callback=lambda x: print(f"Analyzing group dynamics: {x}")
)

lodging_agent = Agent(
    name="Accommodation Specialist",
    role="Match lodging options to budget and preferences",
    goal="Find perfect accommodations balancing cost/quality",
    backstory="Former luxury hotel concierge with global network",
    tools=[scrape_web_tool],
    verbose=True,
    llm=gemini_flash,
    async_execution=True,
    max_retries=3,  # Handle flaky web sources
    cache=True  # Remember good options
)

transport_agent = Agent(
    name="Transportation Logistician",
    role="Optimize transportation between locations",
    goal="Create efficient travel routes with cost/time balance",
    backstory="Urban planner specializing in transit systems",
    tools=[scrape_web_tool],
    verbose=True,
    llm=gemini_flash,
    max_iter=6,
    allow_delegation=True,  # Can ask location agent for details
    memory=True
)

budget_agent = Agent(
    name="Financial Allocator",
    role="Distribute funds across trip components",
    goal="Create balanced budget respecting priorities",
    backstory="CPA with travel industry specialization",
    verbose=True,
    llm=gemini_flash.clone(temperature=0.1),  # More precise calculations
    step_callback=lambda x: print(f"Budget update: {x}"),
    max_iter=5,
    memory=True
)

planner_agent = Agent(
    name="Master Orchestrator",
    role="Synthesize all inputs into cohesive plan",
    goal="Produce detailed, executable travel itinerary",
    backstory="Professional travel planner with 1000+ successful trips",
    tools=[scrape_web_tool],
    verbose=True,
    llm=gemini_flash,
    max_iter=9,  # Most complex task
    allow_delegation=True,
    memory=True,
    step_callback=lambda x: print(f"Plan progress: {x}")
)