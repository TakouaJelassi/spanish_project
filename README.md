# Spanish Flashcards

Two small apps for learning Spanish:

1. **React flashcard app** — 99 built-in cards (Spanish / English / Portuguese) with tap-to-flip, prev/next, shuffle, slider, dark mode, and text-to-speech via the browser's built-in speech synthesis (no API key needed).
2. **Streamlit generator** (`app_flash_cards_esp.py`) — generates 20 fresh flashcards for any theme using the Gemini API.

## React app

Requires [Node.js](https://nodejs.org/) 20+.

```bash
npm install
npm run dev        # opens on http://localhost:5173
```

The card data lives in `src/App.jsx` (`flashcardsData`).

## Streamlit app

Requires Python 3.10+ and a [Gemini API key](https://aistudio.google.com/apikey).

```bash
python -m venv .venv
.venv\Scripts\activate          # Windows
pip install -r requirements.txt
```

Provide your API key either as an environment variable:

```bash
set GEMINI_API_KEY=your-key     # Windows (cmd)
```

or copy `secrets.toml.example` to `.streamlit/secrets.toml` and put the key there.
Never commit the real key to git.

Then run:

```bash
streamlit run app_flash_cards_esp.py
```
