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

def persona_task(agent, people , relationship):
    return Task(
        description=f"""
        Provide travel-related theme and information including type of accomodation(ex.Hostel , Resort , Hotel) , local events , types of activities , based on the type of group (friends , partners , family , solo), cost of living,
        

        Number of people :{people}
        Relationship Between The group: {relationship}

        """,
        expected_output="A detailed report with relevant travel-related data.",
        agent=agent,
        
    )


def lodging_task(context ,agent, people  ):
    return Task(
        description=f"""
        Provide travel-related theme and information including type of accomodation(ex.Hostel , Resort , Hotel) , local events , types of activities , based on the type of group (friends , partners , family , solo), cost of living,
        

        Number of people :{people}
       

        """,
        context=context,
        expected_output="A detailed  report with relevant travel-related data.",
        agent=agent,
    )

def budget_task(context , agent , luxury,budget ):
    return Task(
        description=f"""
        TRIP DETAILS:
                        •⁠  ⁠Destination: (if provided, otherwise general allocation)
                        •⁠  ⁠Trip Duration: Number of days
                        •⁠  ⁠Number of Travelers: Number of people
                        •⁠  ⁠Total Budget: {budget} Budget
                        •⁠  ⁠Luxury Level:{luxury} (budget, mediocre, or luxury)
                        •⁠  ⁠Relationship Type: (friends, family, or couple)

                        Based on these details, create a budget allocation across the following categories:
                        1.⁠ ⁠Lodging
                        2.⁠ ⁠Transportation (includes local transport and any travel between cities)
                        3.⁠ ⁠Food and Dining
                        4.⁠ ⁠Activities and Attractions
                        5.⁠ ⁠Miscellaneous (shopping, souvenirs, contingency)

                        For each category, provide:
                        •⁠  ⁠The absolute amount in INR allocated
                        •⁠  ⁠The percentage of the total budget
                        •⁠  ⁠A brief justification for this allocation
                        •⁠  ⁠Any money-saving tips for this category
        """,
        context=context,
        expected_output="A detailed  report with relevant travel and budget related data.",
        agent=agent,
    )

def planner_task(context, agent ):
    return Task(
        description=f"""
        Combine information into a well-structured itinerary. Include:
        - City introduction (4 paragraphs)
        - Daily travel plan with time allocations
        - Expenses and tips

       
        """,
        expected_output="A structured markdown travel itinerary.",
        context=context,
        agent=agent,
        output_file='travel_plan.md',
    )