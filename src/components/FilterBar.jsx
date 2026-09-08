const REGIONS = ['Luzon', 'Visayas', 'Mindanao'];

/**
 * Search + region/tag filter controls.
 *
 * All filter state is owned by the parent (App) — this component is purely
 * presentational so the filtering logic lives in one place.
 */
export default function FilterBar({
  query,
  onQueryChange,
  activeRegion,
  onRegionChange,
  allTags,
  activeTags,
  onToggleTag,
}) {
  return (
    <div className="space-y-3 border-b border-sand-300 p-4">
      <input
        type="search"
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        placeholder="Search destinations…"
        className="w-full rounded-md border border-sand-300 bg-white px-3 py-2 text-sm text-deep-950 placeholder:text-deep-900/40 focus:border-lagoon-500 focus:outline-none focus:ring-1 focus:ring-lagoon-500"
        aria-label="Search destinations"
      />

      <div>
        <p className="mb-1.5 text-xs font-medium text-deep-900/60">Region</p>
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => onRegionChange(null)}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
              activeRegion === null
                ? 'bg-deep-950 text-sand-100'
                : 'bg-sand-200 text-deep-950 hover:bg-sand-300'
            }`}
          >
            All
          </button>
          {REGIONS.map((region) => (
            <button
              key={region}
              onClick={() => onRegionChange(region)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                activeRegion === region
                  ? 'bg-deep-950 text-sand-100'
                  : 'bg-sand-200 text-deep-950 hover:bg-sand-300'
              }`}
            >
              {region}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-1.5 text-xs font-medium text-deep-900/60">Tags</p>
        <div className="flex flex-wrap gap-1.5">
          {allTags.map((tag) => {
            const active = activeTags.includes(tag);
            return (
              <button
                key={tag}
                onClick={() => onToggleTag(tag)}
                className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                  active
                    ? 'border-coral-500 bg-coral-500 text-white'
                    : 'border-sand-300 bg-white text-deep-950 hover:border-coral-500'
                }`}
                aria-pressed={active}
              >
                {tag}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
