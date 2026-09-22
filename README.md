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

### Frontend Firebase config

Copy `frontEnd/js/firebase-config.example.js` to `frontEnd/js/firebase-config.js` and fill in your own Firebase project's web app values (Firebase console → Project settings → General → Your apps). `firebase-config.js` is gitignored so it never gets committed.

## Running it

```bash
cd backEnd/Python
python app.py
```

This starts the Flask server on `http://127.0.0.1:5000`. Open `frontEnd/html/landingPage.html` in a browser (it calls that fixed localhost URL, so frontend and backend are expected to run on the same machine).

## Known gaps

- **No trained model weights.** `backEnd/BertModel/` only contains the tokenizer files (`config.json`, `vocab.txt`, etc.) — the actual fine-tuned model weights aren't in the repo, so `prediction.py`'s `BertForSequenceClassification.from_pretrained(...)` won't load as-is. You'd need to fine-tune your own or add the missing weights file.
- **No API keys included** — `API_key = "youtubeApi"` in `comments.py`/`main.py` and the `'xxxx'` placeholders in `app.py`'s Firebase config are exactly that: placeholders. Supply your own via environment variables rather than hardcoding them back in.
- **Frontend Firebase config moved out of source.** It used to be hardcoded (as a public client `apiKey`) across nine `frontEnd/js/*.js` files — harmless in principle for a Firebase web app (access is meant to be controlled by security rules, not by hiding the key), but it doesn't belong in source control either, and it pointed at one specific project. It's now loaded from a gitignored `frontEnd/js/firebase-config.js` (see Setup above) so a fork doesn't inherit someone else's project by default. **If the old key (`cyber-login-a72ce`) was ever public, check that project's Firestore/Storage security rules are locked down** — removing it from new commits doesn't undo it having been in git history.
- **No automated tests.**
- The backend calls `http://127.0.0.1:5000` from the frontend with no config for a real deployment target.
- `backEnd/OutputFiles/` and `backEnd/input.csv` (sample CSVs/PDFs from prior runs, containing real YouTube usernames and comments) have been removed from the repo — they were third-party public data, not needed to run or understand the project. The directory is still where `create_report.py` writes new reports; it's git-ignored now so future runs don't get re-committed.

## What's included vs. not

| Included | Not included |
|---|---|
| Full frontend (login/signup/landing/results pages) | Fine-tuned BERT weights |
| Flask backend + PDF report generation | API keys / credentials of any kind |
| `firebase-config.example.js` template | `requirements.txt` |
