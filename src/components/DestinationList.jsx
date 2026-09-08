const REGION_DOT = {
  Luzon: 'bg-lagoon-500',
  Visayas: 'bg-coral-500',
  Mindanao: 'bg-deep-800',
};

/**
 * Compact list of destinations matching the current filters. Clicking an
 * entry selects it, which both opens its detail card and flies the map to it.
 */
export default function DestinationList({ destinations, selectedId, onSelect }) {
  if (destinations.length === 0) {
    return (
      <div className="p-4 text-sm text-deep-900/50">
        No destinations match your filters. Try clearing a tag or region.
      </div>
    );
  }

  return (
    <ul className="themed-scroll max-h-56 space-y-1 overflow-y-auto p-2">
      {destinations.map((dest) => (
        <li key={dest.id}>
          <button
            onClick={() => onSelect(dest)}
            className={`flex w-full items-center gap-2 rounded-md px-2 py-2 text-left text-sm transition-colors ${
              selectedId === dest.id
                ? 'bg-lagoon-500/10 text-deep-950'
                : 'text-deep-950/80 hover:bg-sand-200'
            }`}
          >
            <span className={`h-2 w-2 flex-none rounded-full ${REGION_DOT[dest.region]}`} />
            <span className="truncate">{dest.name}</span>
            <span className="ml-auto flex-none text-xs text-deep-900/40">{dest.region}</span>
          </button>
        </li>
      ))}
    </ul>
  );
}
