# AyuVitamin

> **Understand your options. Find your next step.**

AyuVitamin is a bilingual health information and care navigation website. It helps people explore general health information, find healthcare facility listings, and reach public health resources. It is designed for India and supports English and Hindi.

## Features

### Search health topics

Search for a health concern such as cough, diabetes, back pain, anxiety, or acidity. The backend compares the search text with keywords in curated health records and returns the best match. Guides can include a summary, key points, sources, a safety disclaimer, and related home remedies. If no topic matches, the site shows general guidance to consult a qualified professional and use official health portals.

### Care Navigator

The home page has a short guided flow. Users choose a symptom area and say whether they have urgent warning signs. The flow provides general care-navigation guidance and can link to matching facility listings. It does not diagnose a condition. If warning signs are selected, it advises urgent evaluation and calling 112 or going to an emergency department.

### Healthcare facility listings

Browse sample facility listings across Allopathy, AYUSH, Physiotherapy, and Mental Health. Filter by discipline and by city, area, address, or PIN code. Facility cards show available listing details such as services, timings, ratings, and a Google Maps link. The detail modal provides additional contact and location information where available.

The location button currently applies a preset Hyderabad area/PIN code; it does not use the user's GPS coordinates to find their actual location. Ratings displayed on facility cards come from the bundled listing data or fallback display values. The app does not currently retrieve live Google ratings.

### Home remedies

Some health guides include supportive home remedies with practice information and safety notes. Users can read remedy content aloud with the browser's speech synthesis and mark a remedy as helpful. The remedy content and ratings are curated/sample data. Votes are stored in MongoDB when connected; in local JSON fallback mode, changes are held in server memory and do not survive a server restart.

### English and Hindi

The interface has an English/Hindi toggle. Health records can include translated titles, summaries, and key points. Speech playback uses the browser's built-in Web Speech API when supported by the browser and available voices.

### My Care Kit

Save facilities and home remedies in the Care Kit for quick reference. Saved items are kept in the browser's local storage on that device; they are not synced to an account or across devices.

### Emergency information and public resources

Emergency contacts are shown in the site interface, including 112 and 108. Search results can include links to educational resources and official public health portals. Always use emergency services for urgent situations.

## Technology

- **MongoDB** stores health information, facility listings, and resource records when configured.
- **Express** provides the backend API.
- **React** builds the website interface, with React Router handling page routes.
- **Node.js** runs the backend server.
- **Mongoose** defines MongoDB schemas and handles database operations.
- **Vite** runs and builds the frontend; its development server proxies `/api` requests to the backend.
- **Axios** sends requests from the frontend to the backend.

## Data and storage

The starter data is in `backend/data/healthInfo.json`, `backend/data/facilities.json`, and `backend/data/resources.json`. The backend reads these files on startup and uses them when MongoDB is not connected. When MongoDB is connected, the backend syncs the bundled records into the database at startup. Facility records are replaced from the bundled list during that sync. Treat the bundled facility records and ratings as sample information and verify details with a provider before visiting.

The application does not require user accounts. Saved items are stored in browser local storage. Remedy votes are the main user action written to the backend; persistent storage for votes requires MongoDB to be connected.

## Run locally

You need Node.js and npm installed.

### 1. Start the backend

In a terminal:

```powershell
Set-Location D:\AyuVitamin\backend
npm install
npm start
```

The backend runs at `http://localhost:3001`. Check its status at `http://localhost:3001/api/health`.

To use MongoDB, configure `MONGODB_URI` in a `backend/.env` file. Without it, the server uses the local JSON data.

### 2. Start the frontend

Open a second terminal:

```powershell
Set-Location D:\AyuVitamin\frontend
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

## Medical safety

AyuVitamin provides general educational information and care navigation. It does not diagnose conditions, prescribe treatment, or replace a qualified healthcare professional. Home remedies are supportive information only. Facility listings and ratings may be sample data and should be verified before use. For an emergency in India, call **112** or go to the nearest emergency department.
