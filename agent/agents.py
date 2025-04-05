from crewai import Agent
from tools.search_tools import scrape_web_tool
from crewai import LLM
#from pydantic import BaseModel

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


