const REGION_DOT = {
  Luzon: 'bg-lagoon-500',
  Visayas: 'bg-coral-500',
  Mindanao: 'bg-deep-800',
};

/**
 * Expanded detail card for a single destination — description, best time to
 * visit, tags, and an "Add to itinerary" action. Shown when a destination is
 * selected either from the map or the list.
 */
export default function DestinationDetail({ destination, inItinerary, onAddToItinerary }) {
  return (
    <div className="space-y-3 p-4">
      <div className="aspect-video w-full overflow-hidden rounded-md bg-sand-300">
        {/* Placeholder image block — swap `image` in destinations.json for a
            real photo URL and this will render it automatically. */}
        <img
          src={destination.image}
          alt={destination.name}
          className="h-full w-full object-cover"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
      </div>

      <div className="flex items-start justify-between gap-2">
        <div>
          <h2 className="font-display text-xl font-semibold text-deep-950">
            {destination.name}
          </h2>
          <p className="flex items-center gap-1.5 text-xs text-deep-900/60">
            <span className={`h-2 w-2 rounded-full ${REGION_DOT[destination.region]}`} />
            {destination.region}
          </p>
        </div>
      </div>

      <p className="text-sm leading-relaxed text-deep-950/80">{destination.description}</p>

      <div>
        <p className="text-xs font-medium text-deep-900/60">Best time to visit</p>
        <p className="text-sm text-deep-950">{destination.bestTimeToVisit}</p>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {destination.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-sand-200 px-2.5 py-0.5 text-xs text-deep-950"
          >
            {tag}
          </span>
        ))}
      </div>

      <button
        onClick={() => onAddToItinerary(destination)}
        disabled={inItinerary}
        className="w-full rounded-md bg-coral-500 py-2 text-sm font-medium text-white transition-colors hover:bg-coral-600 disabled:cursor-not-allowed disabled:bg-sand-300 disabled:text-deep-900/50"
      >
        {inItinerary ? 'Added to itinerary' : 'Add to itinerary'}
      </button>
    </div>
  );
}
