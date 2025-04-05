from crewai import Agent
from tools.search_tools import scrape_web_tool
from crewai import LLM
from tools.google_maps_tool import GoogleMapsTool
#from pydantic import BaseModel
maps = GoogleMapsTool()
#class Weather(BaseModel):
#   city: str
 #   temp: int

#class Attractions(BaseModel):
 #   attractions: dict

season_agent = Agent(
    name="Season Analyser",
    role="Provide information about the weather of the city in the month that is given",
    goal="Provides information on weather of the city based on season.",
    backstory ="A local that knows about the weather",
    tools=[scrape_web_tool],
    verbose =True,
    max_iter=5,
    llm = LLM(model="gpt-4o"),
    allow_delegation = False,
)

location_agent = Agent(
    name="Location Search",
    role="Provide the best attractions in the city mentioned",
    goal="Provides information on things to do in the city based on user interests.",
    backstory ="A local that knows about all the attractions in their city",
    tools=[scrape_web_tool],
    verbose =True,
    max_iter=5,
    llm = LLM(model="gpt-4o"),
    allow_delegation = False,
)

persona_agent = Agent(
    name="Persona Agent",
    role="Analyzes the relationship type to tweak suggestions",
    goal="Tailor the experience based on whether the trip is with friends, family, partner, or solo.",
    backstory ="You're a psychologist-turned-travel-consultant who crafts journeys that suit people's vibes perfectly.",
    verbose =True,
    max_iter=5,
    llm = LLM(model="gpt-4o"),
    allow_delegation = False,
)

lodging_agent = Agent(
        name="Lodging Expert",
        role="Hotel and Lodging Recommender",
        goal="Find the best lodging options based on the user's budget, luxury level, and preferences.",
        backstory="You're a travel industry expert with years of experience recommending accommodations across the globe.",
        tools=[scrape_web_tool],
        verbose=True,
        async_execution=False,
        function_calling_llm="gpt-4"
    )

#transportation agent 
transport_agent = Agent(
    role="Transport Recommender",
    goal="Select the best transportation options based on budget, destination, travel group, and duration",
    backstory=(
        "You are an expert in transportation logistics, able to recommend suitable travel methods "
        "based on factors like group size, comfort, and cost. You also consider the season and luxury level "
        "when selecting the best option."
    ),
    verbose=True,
    allow_delegation=False,
    tools=[scrape_web_tool, maps],
    async_execution=False,
)



