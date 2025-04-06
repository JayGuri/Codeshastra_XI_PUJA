from crewai import Task

def location_task(agent, from_city, destination_city, date_from, date_to):
    return Task(
        description=f"""
        Provide travel-related information , major attractions and trendy places,
        visa requirements, and local events.

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
        expected_output="A detailed report with relevant travel-related data in Markdown Format.",
        agent=agent,
        
    )


def lodging_task(context ,agent, people  ):
    return Task(
        description=f"""
        Provide travel-related theme and information including type of accomodation(ex.Hostel , Resort , Hotel) , local events , types of activities , based on the type of group (friends , partners , family , solo), cost of living,
        

        Number of people :{people}
       

        """,
        context=context,
        expected_output="A detailed  report with relevant travel-related data in Markdown format",
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
        expected_output="A detailed  report with relevant travel and budget related data in Markdown format",
        agent=agent,
    )

def planner_task(context, agent ):
    return Task(
        description=f"""
        Combine information into a well-structured itinerary. Include:
        - Detialed daily schedule , with locations and spending along with time
        - Daily travel plan with time allocations
        - Expenses and tips

       
        """,
        expected_output="A well structured markdown formatted travel itinerary.With a title as well",
        context=context,
        agent=agent,
        output_file='travel_plan.md',
    )



'''def weather_task(agent, destination_city, date_from, date_to):
    return Task(
        description=f"""
        Analyze historical weather patterns and current forecasts for {destination_city} between {date_from} to {date_to}.
        Provide:
        - Average temperatures (day/night)
        - Precipitation probability and type
        - Seasonal events/festivals
        - Weather-related travel warnings
        - Recommended clothing/packing items
        
        
        """,
        expected_output="Comprehensive weather report in markdown",
        agent=agent,
        output_file='weather_report.md',
    )


def location_task(agent, from_city, destination_city, date_from, date_to):
    return Task(
        description=f"""
        Create comprehensive city guide for {destination_city} focusing on:
        1. Categorized attractions (Historical, Cultural, Nature, etc.)
        2. Hidden local gems beyond tourist hotspots
        3. Opening hours/seasonal availability
        4. Entry fees with currency conversion from {from_city}
        5. Time required per attraction
        6. Nearby dining options for each location
        
        Include current promotions/combined tickets. Verify all prices from official sources.
        """,
        expected_output="Structured city guide with locations in markdown",
        agent=agent,
        output_file='city_report.md',
    )

def persona_task(agent, people, relationship):
    return Task(
        description=f"""
        Develop personalized travel profile for {people} {relationship} including:
        - Activity matrix (Adventure/Relaxation ratio)
        - Pace recommendations (slow vs packed itineraries)
        - Accommodation type preferences
        - Dining style suggestions
        - Social interaction levels
        - Safety considerations
        - Ice-breaking activities for groups
        - Relationship-enhancing experiences
        
        Create personality matrix scoring system (1-10) for different travel aspects.
        """,
        expected_output="Psychological travel profile with behavioral recommendations",
        agent=agent,
    )


def lodging_task(context, agent, people):
    return Task(
        description=f"""
        Recommend lodging options considering:
        1. Budget tiers (Budget/Midrange/Luxury)
        2. Location clusters near key attractions
        3. Amenity matrix (Pool/Gym/Kids facilities)
        4. Room configuration options for {people} people
        5. Local cultural immersion opportunities
        
        Include comparison tables showing value metrics. Verify cancellation policies.
        """,
        context=context,
        expected_output="Accommodation matrix with scoring system in markdown",
        agent=agent,
    )


def transport_task(agent, destination_city):
    return Task(
        description=f"""
        Analyze transportation options for {destination_city} including:
        - Cost/time comparisons: Public vs Private vs Tours
        - Ride-sharing economy options
        - Seasonal transport variations
        - Accessibility features
        - Luggage limitations
        - Local transit apps/payment methods
        - Night transportation availability
        
       key airport-hotel-attraction corridors.
        """,
        expected_output="Transportation related data in detail in markdown",
        agent=agent,
    )


def budget_task(context, agent, luxury, budget):
    return Task(
        description=f"""
        Create dynamic budget allocation model with:
        1. Fixed vs Variable costs breakdown
        2. Daily spending limits
        3. Pre-vs-Onsite cost ratios
        
        Develop 3 scenarios: Ideal/Average/Worst-case projections.
        Include interactive budget tracker template.
        """,
        context=context,
        expected_output="Financial model with scenario planning in markdown",
        agent=agent,
    )


def planner_task(context, agent):
    return Task(
        description=f"""
        Synthesize all inputs into comprehensive itinerary featuring:
        1. Daily schedule with each time of the day properly mapped out in detail buffer times
        2. Transportation legs with alternatives
        3. Meal planning with dietary options
        4. Energy level management
        5. Weather contingencies
        6. Local emergency contacts
        7. Language cheat sheet
        """,
        expected_output="A well structured json output with all the itenerary data",
        context=context,
        agent=agent,
        output_file='travel_plan.json',
    )'''