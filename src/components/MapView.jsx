import { MapContainer, TileLayer, Marker, Tooltip, useMap } from 'react-leaflet';
import { divIcon } from 'leaflet';
import { useEffect } from 'react';

// Center of the Philippine archipelago, roughly between Luzon and Visayas
// so the initial view shows the whole country without excessive panning.
const PHILIPPINES_CENTER = [12.8797, 121.774];
const DEFAULT_ZOOM = 6;

// One-letter marker glyph + CSS class per region, so the map itself doubles
// as a region legend without needing a separate key.
const REGION_MARKER = {
  Luzon: { label: 'L', className: 'region-marker region-marker--luzon' },
  Visayas: { label: 'V', className: 'region-marker region-marker--visayas' },
  Mindanao: { label: 'M', className: 'region-marker region-marker--mindanao' },
};

function markerIcon(region) {
  const config = REGION_MARKER[region] ?? REGION_MARKER.Luzon;
  return divIcon({
    html: `<div class="${config.className}">${config.label}</div>`,
    className: '', // clear Leaflet's default icon styles/box
    iconSize: [26, 26],
    iconAnchor: [13, 13],
    popupAnchor: [0, -13],
  });
}

// Recenters/zooms the map imperatively when the selected destination changes
// (e.g. from a search result), without re-mounting the whole map.
function FlyToDestination({ destination }) {
  const map = useMap();

  useEffect(() => {
    if (destination) {
      map.flyTo([destination.lat, destination.lng], 9, { duration: 0.75 });
    }
  }, [destination, map]);

  return null;
}

/**
 * Renders the interactive Leaflet map with one marker per visible destination.
 *
 * @param {object[]} destinations - destinations to plot (already filtered)
 * @param {object|null} focusedDestination - destination to fly the map to
 * @param {(dest: object) => void} onSelect - called when a marker is clicked
 */
export default function MapView({ destinations, focusedDestination, onSelect }) {
  return (
    <MapContainer
      center={PHILIPPINES_CENTER}
      zoom={DEFAULT_ZOOM}
      minZoom={5}
      maxZoom={14}
      className="h-full w-full"
      scrollWheelZoom
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <FlyToDestination destination={focusedDestination} />

      {destinations.map((dest) => (
        <Marker
          key={dest.id}
          position={[dest.lat, dest.lng]}
          icon={markerIcon(dest.region)}
          eventHandlers={{ click: () => onSelect(dest) }}
        >
          <Tooltip direction="top" offset={[0, -14]} opacity={1}>
            {dest.name}
          </Tooltip>
        </Marker>
      ))}
    </MapContainer>
  );
}
