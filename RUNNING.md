# Run StockVerse in your browser (direct instructions)

## 1) Open terminal in project folder

```bash
cd /workspace/Shotlist-software
```

## 2) Start the app

```bash
npm run start
```

You should see:

```text
StockVerse server running at http://localhost:8000
```

## 3) Open this URL in browser

- http://localhost:8000

If localhost fails, try:

- http://127.0.0.1:8000

## 4) If it still does not open

Run these exact checks:

```bash
node -v
npm -v
npm run check
```

Then in a second terminal:

```bash
curl -I http://127.0.0.1:8000
```

Expected response includes:

```text
HTTP/1.1 200 OK
```

## 5) Validate requested homepage content

- NIFTY and BANK NIFTY cards are visible.
- Top 5 gainers and top 5 losers sections are visible.
- Latest blogs/articles section is visible.
