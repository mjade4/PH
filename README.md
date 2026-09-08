# Philippines Travel Map

An interactive web map of the Philippines for trip planning. Browse major
destinations across **Luzon**, **Visayas**, and **Mindanao**, filter by
region or interest, and build a simple trip itinerary as you explore.

![Screenshot placeholder](./public/images/screenshot-placeholder.png)
<!-- Replace the image above with an actual screenshot of the app once it's running. -->

## Features

- Interactive, zoomable/pannable map of the Philippines (Leaflet.js + OpenStreetMap tiles)
- Destination markers color-coded by region, with hover tooltips
- Click a destination (on the map or in the list) to see a detail card:
  description, best time to visit, image placeholder, and tags (beach,
  mountain, city, etc.)
- Search bar plus region and tag filters
- "Add to itinerary" — build an ordered trip list, remove items as you go
- Destination data lives in a single JSON file, so it's easy to add or edit
  places without touching any component code

## Tech stack

| Layer      | Choice                                   |
| ---------- | ----------------------------------------- |
| Framework  | React 18 + Vite                          |
| Map        | Leaflet.js via `react-leaflet`, OpenStreetMap tiles |
| Styling    | Tailwind CSS                             |
| Data       | Static JSON (`data/destinations.json`)   |
| Lint/format| ESLint + Prettier                        |
| Deployment | GitHub Pages (Actions workflow) or Vercel |

## Getting started

Requires [Node.js](https://nodejs.org/) 18+.

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server (http://localhost:5173)
npm run dev

# 3. Build for production
npm run build

# 4. Preview the production build locally
npm run preview
```

### Linting & formatting

```bash
npm run lint     # check for lint errors
npm run format   # auto-format with Prettier
```

## Project structure

```
philippines-travel-map/
├── data/
│   └── destinations.json   # all destination data — edit this to add places
├── public/
│   └── images/              # static assets (screenshots, destination photos)
├── src/
│   ├── components/
│   │   ├── MapView.jsx           # Leaflet map + markers
│   │   ├── FilterBar.jsx         # search + region/tag filters
│   │   ├── DestinationList.jsx   # filtered destination list
│   │   ├── DestinationDetail.jsx # detail card for a selected destination
│   │   └── ItineraryPanel.jsx    # trip itinerary list
│   ├── hooks/
│   │   └── useDestinations.js    # loads data/destinations.json
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .github/workflows/deploy.yml  # GitHub Pages CI deploy
├── vercel.json                   # Vercel deploy config
└── vite.config.js
```

## Editing destination data

Add or edit entries in `data/destinations.json`. Each destination looks like:

```json
{
  "id": "siargao",
  "name": "Siargao",
  "region": "Mindanao",
  "lat": 9.8482,
  "lng": 126.0458,
  "tags": ["beach", "surfing"],
  "bestTimeToVisit": "August – November (best swell for surfing)",
  "description": "The country's surfing capital...",
  "image": "/images/placeholder-siargao.jpg"
}
```

`region` should be one of `Luzon`, `Visayas`, or `Mindanao` to match the map's
color legend. `image` can point to a file in `public/images/` or an external URL.

## Deployment

### Option A — GitHub Pages (automatic)

A workflow at `.github/workflows/deploy.yml` builds and deploys the app to
GitHub Pages on every push to `main`.

1. Push this repo to GitHub.
2. In the repo settings, under **Pages**, set the source to **GitHub Actions**.
3. Push to `main` — the site will be published at
   `https://<your-username>.github.io/philippines-travel-map/`.

To deploy manually instead:

```bash
npm run deploy
```

(uses the `gh-pages` package to push the `dist/` build to a `gh-pages` branch)

### Option B — Vercel

1. Import the repository at [vercel.com/new](https://vercel.com/new).
2. Vercel will detect the Vite framework automatically using `vercel.json`.
3. Deploy — no extra configuration needed.

## Notes

- Map tiles are served by the public OpenStreetMap tile server, which is fine
  for development and light use. For production traffic, consider a paid tile
  provider (e.g. Mapbox, MapTiler) per their usage policies.
- Destination images are placeholders (`public/images/`) — replace with real
  photos before shipping.
