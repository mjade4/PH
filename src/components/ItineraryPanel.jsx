/**
 * Shows the user's in-progress trip itinerary: the destinations they've
 * added, in the order added, with a way to remove each one.
 */
export default function ItineraryPanel({ itinerary, onRemove }) {
  if (itinerary.length === 0) {
    return (
      <div className="p-4 text-sm text-deep-900/50">
        Your itinerary is empty. Click a destination, then "Add to itinerary" to start
        planning your trip.
      </div>
    );
  }

  return (
    <ol className="space-y-2 p-4">
      {itinerary.map((dest, index) => (
        <li
          key={dest.id}
          className="flex items-center justify-between gap-2 rounded-md border border-sand-300 bg-white px-3 py-2"
        >
          <div className="flex items-center gap-2 overflow-hidden">
            <span className="flex h-5 w-5 flex-none items-center justify-center rounded-full bg-deep-950 text-[11px] text-sand-100">
              {index + 1}
            </span>
            <span className="truncate text-sm text-deep-950">{dest.name}</span>
          </div>
          <button
            onClick={() => onRemove(dest.id)}
            className="flex-none text-xs text-deep-900/50 hover:text-coral-500"
            aria-label={`Remove ${dest.name} from itinerary`}
          >
            Remove
          </button>
        </li>
      ))}
    </ol>
  );
}
