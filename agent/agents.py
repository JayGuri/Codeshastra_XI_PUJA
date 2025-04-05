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

season_agent = Agent(
    name="Season Analyser",
    role="Provide information about the weather of the city in the month that is given",
    goal="Provides information on weather of the city based on season.",
    backstory ="A local that knows about the weather",
    tools=[scrape_web_tool],
    verbose =True,
    max_iter=3,
    llm = LLM(model="gpt-3.5-turbo"),
    allow_delegation = False,
)

location_agent = Agent(
    name="Location Search",
    role="Provide the best attractions in the city mentioned",
    goal="Provides information on things to do in the city based on user interests. Also provide entry charges(if major attraction) , average charges , offers along with each location",
    backstory ="A local that knows about all the attractions in their city",
    tools=[scrape_web_tool],
    verbose =True,
    max_iter=3,
    llm = LLM(model="gemini/gemini-2.0-flash"),
    allow_delegation = False,
)

persona_agent = Agent(
    name="Persona Agent",
    role="Analyzes the relationship type to tweak suggestions",
    goal="Tailor the experience based on whether the trip is with friends, family, partner, or solo.",
    backstory ="You're a psychologist-turned-travel-consultant who crafts journeys that suit people's vibes perfectly.",
    verbose =True,
    max_iter=3,
    llm = LLM(model="gemini/gemini-2.0-flash"),
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
        function_calling_llm="gemini/gemini-2.0-flash"
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
    tools=[scrape_web_tool],
    async_execution=False,
    function_calling_llm= "gemini/gemini-2.0-flash"
)

budget_agent = Agent(
    name="Budget Strategist",
    role="""You are a travel budget expert who specializes in optimally allocating travel budgets across different expense categories.
            Your task is to create a budget allocation plan for a trip to help travelers manage their finances effectively.Consider the luxury level, relationship type, and trip duration in your allocation. A "luxury" trip would allocate more to premium accommodations and dining, while a "budget" trip would prioritize cost-effective options.""",
    goal="""Distribute the user's budget wisely according to the luxury level and number of people and trip details""",
    backstory="You're a financial planner for travel who optimizes budgets for fun and comfort.",
    verbose=True,
    async_execution=False,
    function_calling_llm="gpt-3.5-turbo"
)
 
planner_agent = Agent(
    role="Travel Planning Expert",
    goal="Compiles all gathered information to create a travel plan.",
    backstory="An expert in planning seamless travel itineraries.",
    verbose=True,
    max_iter=5,
    llm = LLM(model="gemini/gemini-2.0-flash"),
    allow_delegation=False,
)