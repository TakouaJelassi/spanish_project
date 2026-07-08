# ==========================================
# FILE NAME: app.py
# ==========================================

import os
import streamlit as st
import google.generativeai as genai
import json
import random


@st.cache_data(show_spinner=False)
def fetch_flashcards(lesson, api_key):
    genai.configure(api_key=api_key)
    model = genai.GenerativeModel('gemini-2.5-flash')
    prompt = f"""
    Create 20 Spanish-English flashcards for the following lesson/theme: "{lesson}".
    Focus on full sentences that would be useful as exercises.
    Return only a JSON array of objects with keys "spanish" and "english".
    Example: [{{"spanish":"Quiero pedir la cuenta, por favor.","english":"I want to ask for the bill, please."}}]
    """
    response = model.generate_content(prompt)
    raw_text = response.text.replace('```json', '').replace('```', '').strip()
    try:
        flashcards = json.loads(raw_text)
    except Exception:
        import re
        m = re.search(r'(\[.*\])', raw_text, re.DOTALL)
        if m:
            flashcards = json.loads(m.group(1))
        else:
            raise ValueError(f"Unable to parse JSON from Gemini response:\n{raw_text}")
    if not isinstance(flashcards, list) or not all(isinstance(c, dict) for c in flashcards):
        raise ValueError(f"Parsed output is not a list of dictionaries:\n{flashcards}")
    random.shuffle(flashcards)
    return flashcards

if "flashcards" not in st.session_state:
    st.session_state.flashcards = []
    st.session_state.current_index = 0
    st.session_state.show_spanish = False

if st.session_state.flashcards:
    card = st.session_state.flashcards[st.session_state.current_index]
    cols = st.columns([1, 2, 1, 2])
    if cols[0].button("Previous"):
        st.session_state.current_index = (st.session_state.current_index - 1) % len(st.session_state.flashcards)
        st.session_state.show_spanish = False
    if cols[1].button("Reveal Spanish"):
        st.session_state.show_spanish = True
    if cols[2].button("Next"):
        st.session_state.current_index = (st.session_state.current_index + 1) % len(st.session_state.flashcards)
        st.session_state.show_spanish = False
    if cols[3].button("Shuffle deck"):
        random.shuffle(st.session_state.flashcards)
        st.session_state.current_index = 0
        st.session_state.show_spanish = False

    st.markdown(f"**Card {st.session_state.current_index + 1}/{len(st.session_state.flashcards)}**")
    st.write(f"**English:** {card.get('english', '–')}")
    if st.session_state.show_spanish:
        st.write(f"**Spanish:** {card.get('spanish', '–')}")

# Set up the dynamic web page title
st.title("🇪🇸🇺🇸 Spanish-English Flashcard Generator")
st.write("Generate custom flashcards with sentences based on any theme or lesson!")

# 1. Input for the lesson/theme
lesson = st.text_input("What lesson or theme do you want to study? (e.g., 'At the airport', 'Past tense verbs')")

# 2. Optional hidden input for API key (local override)
# api_key_input = st.text_input("API key (leave blank to use environment/Streamlit secrets)", type="password")

def _get_api_key():
    
    env_key = os.getenv("GENAI_API_KEY")
    if env_key:
        return env_key
    try:
        return st.secrets["GENAI_API_KEY"]
    except Exception:
        return None

# 3. Button to trigger the generation
if st.button("Generate Flashcards"):
    if not lesson:
        st.error("Please enter a lesson or theme.")
    else:
        api_key = _get_api_key()
        if not api_key:
            st.error("API key not found. Set the GENAI_API_KEY environment variable, add it to Streamlit secrets under 'GENAI_API_KEY', or enter it above.")
        else:
            try:
                st.session_state.flashcards = fetch_flashcards(lesson, api_key)
                st.session_state.current_index = 0
                st.session_state.show_spanish = False
                st.success("Flashcards ready! The deck is randomized from Gemini.")
            except Exception as e:
                st.error(f"An error occurred: {e}")
