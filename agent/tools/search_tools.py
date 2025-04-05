from langchain_community.tools import DuckDuckGoSearchResults
from crewai.tools import tool
# Web search tool using DuckDuckGo
@tool
def scrape_web_tool(query: str):
    """
    Searches the web and returns results.
    """
    search_tool = DuckDuckGoSearchResults(num_results=10, verbose=True)
    return search_tool.run(query)

# Web scraping tool