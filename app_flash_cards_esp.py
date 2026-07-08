# ==========================================
# Spanish flashcard generator (Streamlit)
# Run: streamlit run app_flash_cards_esp.py
# Needs a Gemini API key in the GEMINI_API_KEY (or GENAI_API_KEY) env var
# or in .streamlit/secrets.toml (see secrets.toml.example)
# ==========================================

import json
import os
import random
import re

import streamlit as st
from google import genai


def get_api_key():
    for name in ("GEMINI_API_KEY", "GENAI_API_KEY"):
        key = os.environ.get(name)
        if not key:
            try:
                key = st.secrets[name]
            except Exception:
                key = None
        if key:
            return key
    return None


@st.cache_data(show_spinner=False)
def fetch_flashcards(lesson, _api_key):
    client = genai.Client(api_key=_api_key)
    prompt = f"""
    Create 20 Spanish-English flashcards for the following lesson/theme: "{lesson}".
    Focus on full sentences that would be useful as exercises.
    Return only a JSON array of objects with keys "spanish" and "english".
    Example: [{{"spanish":"Quiero pedir la cuenta, por favor.","english":"I want to ask for the bill, please."}}]
    """
    response = client.models.generate_content(model="gemini-2.5-flash", contents=prompt)
    raw_text = response.text.replace("```json", "").replace("```", "").strip()
    try:
        flashcards = json.loads(raw_text)
    except Exception:
        m = re.search(r"(\[.*\])", raw_text, re.DOTALL)
        if not m:
            raise ValueError(f"Unable to parse JSON from Gemini response:\n{raw_text}")
        flashcards = json.loads(m.group(1))
    if not isinstance(flashcards, list) or not all(isinstance(c, dict) for c in flashcards):
        raise ValueError(f"Parsed output is not a list of dictionaries:\n{flashcards}")
    random.shuffle(flashcards)
    return flashcards


st.title("🇪🇸🇺🇸 Spanish-English Flashcard Generator")
st.write("Generate custom flashcards with sentences based on any theme or lesson!")

api_key = get_api_key()
if not api_key:
    st.warning(
        "No Gemini API key found. Set the `GEMINI_API_KEY` (or `GENAI_API_KEY`) environment "
        "variable or add it to `.streamlit/secrets.toml` (see `secrets.toml.example`)."
    )
    st.stop()

if "flashcards" not in st.session_state:
    st.session_state.flashcards = []
    st.session_state.current_index = 0
    st.session_state.show_spanish = False

lesson = st.text_input("What lesson or theme do you want to study? (e.g., 'At the airport', 'Past tense verbs')")

if st.button("Generate Flashcards"):
    if not lesson:
        st.error("Please enter a lesson or theme.")
    else:
        try:
            st.session_state.flashcards = fetch_flashcards(lesson, api_key)
            st.session_state.current_index = 0
            st.session_state.show_spanish = False
            st.success("Flashcards ready! The deck is randomized from Gemini.")
        except Exception as e:
            st.error(f"An error occurred: {e}")

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
