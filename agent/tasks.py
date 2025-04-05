from crewai import Task

def location_task(agent, from_city, destination_city, date_from, date_to):
    return Task(
        description=f"""
        Provide travel-related information including accommodations, cost of living,
        visa requirements, transportation, weather, and local events.

        Traveling from: {from_city}
        Destination: {destination_city}
        Arrival Date: {date_from}
        Departure Date: {date_to}

        """,
        expected_output="A detailed markdown report with relevant travel data.",
        agent=agent,
        output_file='city_report.md',
    )

def weather_task(agent, destination_city , date_from, date_to):
    return Task(
        description=f"""
        Provide weather-related information on the given date in that region.

        Destination: {destination_city}
        Arrival Date: {date_from}
        Departure Date: {date_to}

        """,
        expected_output="A detailed markdown report with relevant weather data.",
        agent=agent,
        output_file='weather_report.md',
    )