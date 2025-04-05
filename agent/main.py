from agents import season_agent , location_agent , lodging_agent , persona_agent , planner_agent , budget_agent
from tasks import location_task, weather_task , lodging_task , persona_task , planner_task,budget_task
from crewai import Crew, Process
import streamlit as st

# Streamlit App Title
st.title("🌍 AI-Powered Trip Planner")

st.markdown("""
💡 **Plan your next trip with AI!**  
Enter your travel details below, and our AI-powered travel assistant will create a personalized itinerary including:
 Best places to visit 🎡   Accommodation & budget planning 💰
 Local food recommendations 🍕   Transportation & visa details 🚆
""")

# User Inputs
from_city = st.text_input("🏡 From City", "India")
destination_city = st.text_input("✈️ Destination City", "Rome")
date_from = st.date_input("📅 Departure Date")
date_to = st.date_input("📅 Return Date")
people = st.text_input("Number of people ")
relationship = st.text_input("Couple , solo , Family , Friends")
interests = st.text_area("🎯 Your Interests (e.g., sightseeing, food, adventure)", "sightseeing and good food")
luxury = st.text_area("budget, mediocre, or luxury")
budget = st.text_area("Budget In Dollars")

# Button to run CrewAI
if st.button("🚀 Generate Travel Plan"):
    if not from_city or not destination_city or not date_from or not date_to or not interests:
        st.error("⚠️ Please fill in all fields before generating your travel plan.")
    else:
        st.write("⏳ AI is preparing your personalized travel itinerary... Please wait.")

        # Initialize Tasks
        loc_task = location_task(location_agent, from_city, destination_city, date_from, date_to)
        weather_task = weather_task(season_agent, destination_city , date_from, date_to)
        persona_task = persona_task(persona_agent,people,relationship)
        budget_task = budget_task([loc_task,persona_task],budget_agent,budget,luxury)
        lodging_task = lodging_task([loc_task,persona_task,budget_task] ,lodging_agent,people)
        planner_task = planner_task([loc_task, weather_task,lodging_task,persona_task], planner_agent)


        # Define Crew
        crew = Crew(
            agents=[location_agent, season_agent ,persona_agent,budget_agent, lodging_agent   , planner_agent],
            tasks=[loc_task, weather_task ,persona_task,budget_task ,lodging_task, planner_task ],
            process=Process.sequential,
            full_output=True,
            verbose=True,
        )

        # Run Crew AI
        result = crew.kickoff()

        # Display Results
        st.subheader("✅ Your AI-Powered Travel Plan")
        st.markdown(result)


        # Ensure result is a string
        travel_plan_text = str(result)  # ✅ Convert CrewOutput to string

        st.download_button(
            label="📥 Download Travel Plan",
            data=travel_plan_text,  # ✅ Now passing a valid string
            file_name=f"Travel_Plan_{destination_city}.txt",
            mime="text/plain"
        )