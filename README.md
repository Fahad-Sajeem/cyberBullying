# CyberShield — Cyberbullying Detection for YouTube Comments

CyberShield scans the comments on a YouTube video and flags which ones are hateful or offensive, using a fine-tuned BERT classifier. A user signs in, pastes a YouTube link, and gets back a PDF report listing every comment the model flagged, grouped by category.

> 🎓 Academic/learning project. Not a production moderation tool — see [Known gaps](#known-gaps) before trying to run it.

## How it works

1. **Sign in** — Firebase Authentication (email/password) gates access to the app.
2. **Submit a video** — paste a YouTube URL; the frontend extracts the video ID and posts it to the Flask backend.
3. **Fetch comments** — the backend pulls up to 100 top-level comments via the YouTube Data API v3 (`comments_retrieval.py`).
4. **Translate** — any non-English comment is translated to English via Google Cloud Translate before classification.
5. **Classify** — each comment is run through a fine-tuned BERT sequence classifier (`prediction.py`) with three classes: **Hate**, **Offensive**, **Neutral**.
6. **Report** — flagged comments (Hate/Offensive) are compiled into a PDF table (`create_report.py`, via ReportLab) and uploaded to Firebase Storage; the frontend links the user to it.

## Stack

- **Frontend:** static HTML/CSS/JS, Firebase Auth (client SDK)
- **Backend:** Flask (`backEnd/Python/app.py`), Flask-CORS
- **ML:** `transformers` (BERT, via PyTorch) fine-tuned for 3-class comment classification
- **APIs:** YouTube Data API v3, Google Cloud Translate API
- **Storage:** Firebase Storage (generated PDF reports), Firebase Admin SDK (backend)
- **PDF generation:** ReportLab

## Setup

```bash
pip install flask flask-cors firebase-admin google-cloud-translate google-api-python-client transformers torch pandas reportlab
```

There's no `requirements.txt` in the repo yet — the above is everything the backend imports.

You'll also need, none of which are included in this repo (see [Known gaps](#known-gaps)):
- A YouTube Data API v3 key
- A Google Cloud Translate API credential
- A Firebase project with Authentication + Storage enabled, and its Admin SDK service-account JSON
- The fine-tuned BERT model weights for `backEnd/BertModel/`

## Running it

```bash
cd backEnd/Python
python app.py
```

This starts the Flask server on `http://127.0.0.1:5000`. Open `frontEnd/html/landingPage.html` in a browser (it calls that fixed localhost URL, so frontend and backend are expected to run on the same machine).

## Known gaps

- **No trained model weights.** `backEnd/BertModel/` only contains the tokenizer files (`config.json`, `vocab.txt`, etc.) — the actual fine-tuned model weights aren't in the repo, so `prediction.py`'s `BertForSequenceClassification.from_pretrained(...)` won't load as-is. You'd need to fine-tune your own or add the missing weights file.
- **No API keys included** — `API_key = "youtubeApi"` in `comments.py`/`main.py` and the `'xxxx'` placeholders in `app.py`'s Firebase config are exactly that: placeholders. Supply your own via environment variables rather than hardcoding them back in.
- **Frontend Firebase config is a public client key** (`apiKey` visible in several `frontEnd/js/*.js` files) — this is normal for Firebase web apps (access is meant to be controlled by Firestore/Storage security rules, not by hiding the key), but it does point at a specific live Firebase project (`cyber-login-a72ce`). If that project is still active, double-check its security rules before treating it as safe to leave public.
- **No `requirements.txt`, `.gitignore`, or automated tests.** `__pycache__/` and various run outputs (`backEnd/OutputFiles/*.csv`, `*.pdf`) are committed — worth adding a `.gitignore` if you keep developing this.
- The backend calls `http://127.0.0.1:5000` from the frontend with no config for a real deployment target.

## What's included vs. not

| Included | Not included |
|---|---|
| Full frontend (login/signup/landing/results pages) | Fine-tuned BERT weights |
| Flask backend + PDF report generation | API keys / credentials of any kind |
| Sample output data (`backEnd/OutputFiles/`) from prior runs | `requirements.txt` |
