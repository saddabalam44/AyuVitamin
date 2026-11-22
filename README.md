# AyuVitamin

> **Understand your options. Find your next step.**

AyuVitamin is a bilingual health information and care navigation website. It helps people explore general health information, find healthcare facility listings, and reach public health resources. It is designed for India and supports English and Hindi.

## Features

### Search health topics

Search for a health concern such as cough, diabetes, back pain, anxiety, or acidity. The backend compares the search text with keywords in curated health records and returns the best match. Guides can include a summary, key points, sources, a safety disclaimer, and related home remedies. If no topic matches, the site shows general guidance to consult a qualified professional and use official health portals.

### Care Navigator

The home page has a short guided flow. Users choose a symptom area and say whether they have urgent warning signs. The flow provides general care-navigation guidance and can link to matching facility listings. It does not diagnose a condition. If warning signs are selected, it advises urgent evaluation and calling 112 or going to an emergency department.

### Healthcare facility listings

Browse and filter facility listings across Allopathy, AYUSH, Physiotherapy, and Mental Health. Listings include location, services, timings, and map links. Facility data is sample information.

### Home remedies

Health guides may include supportive remedies and safety notes. Users can listen to remedy information and mark it helpful.

### English and Hindi

Switch between English and Hindi. Speech playback uses the browser's built-in speech synthesis when available.

### My Care Kit

Save facilities and home remedies in the browser for quick reference.

### Emergency information and public resources

Emergency contacts are shown in the site interface, including 112 and 108. Search results can include links to educational resources and official public health portals. Always use emergency services for urgent situations.

## Technology

- **MongoDB** stores health information, facility listings, resources, and remedy votes when configured.
- **Express** provides the backend API.
- **React** builds the website interface, with React Router handling page routes.
- **Node.js** runs the backend server.
- **Mongoose** defines MongoDB schemas and handles database operations.
- **Vite** runs and builds the frontend; its development server proxies `/api` requests to the backend.
- **Axios** sends requests from the frontend to the backend.

## Data and storage

The backend uses the bundled JSON data in `backend/data/` and can connect to MongoDB for persistent storage. Saved items are stored in the browser.

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

The Vite development server proxies `/api` requests to `http://localhost:3001` by default.

## Medical safety

AyuVitamin provides general educational information and care navigation. It does not diagnose conditions, prescribe treatment, or replace a qualified healthcare professional. Home remedies are supportive information only. Facility listings and ratings may be sample data and should be verified before use. For an emergency in India, call **112** or go to the nearest emergency department.
