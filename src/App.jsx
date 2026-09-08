import { useMemo, useState } from 'react';
import MapView from './components/MapView.jsx';
import FilterBar from './components/FilterBar.jsx';
import DestinationList from './components/DestinationList.jsx';
import DestinationDetail from './components/DestinationDetail.jsx';
import ItineraryPanel from './components/ItineraryPanel.jsx';
import { useDestinations } from './hooks/useDestinations.js';

export default function App() {
  const destinations = useDestinations();

  // Filter state
  const [query, setQuery] = useState('');
  const [activeRegion, setActiveRegion] = useState(null);
  const [activeTags, setActiveTags] = useState([]);

  // Selection + itinerary state
  const [selectedId, setSelectedId] = useState(null);
  const [itinerary, setItinerary] = useState([]);
  const [activeTab, setActiveTab] = useState('explore'); // 'explore' | 'itinerary'

  const allTags = useMemo(
    () => [...new Set(destinations.flatMap((d) => d.tags))].sort(),
    [destinations]
  );

  const filteredDestinations = useMemo(() => {
    const q = query.trim().toLowerCase();
    return destinations.filter((dest) => {
      const matchesQuery = q === '' || dest.name.toLowerCase().includes(q);
      const matchesRegion = activeRegion === null || dest.region === activeRegion;
      const matchesTags = activeTags.every((tag) => dest.tags.includes(tag));
      return matchesQuery && matchesRegion && matchesTags;
    });
  }, [destinations, query, activeRegion, activeTags]);

  const selectedDestination = destinations.find((d) => d.id === selectedId) ?? null;

  function toggleTag(tag) {
    setActiveTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  }

  function selectDestination(dest) {
    setSelectedId(dest.id);
    setActiveTab('explore');
  }

  function addToItinerary(dest) {
    setItinerary((prev) => (prev.some((d) => d.id === dest.id) ? prev : [...prev, dest]));
  }

  function removeFromItinerary(id) {
    setItinerary((prev) => prev.filter((d) => d.id !== id));
  }

  return (
    <div className="flex h-screen w-screen flex-col bg-sand-100 md:flex-row">
      {/* Sidebar */}
      <aside className="flex h-1/2 w-full flex-none flex-col border-r border-sand-300 bg-sand-100 md:h-full md:w-96">
        <header className="border-b border-sand-300 p-4">
          <h1 className="font-display text-lg font-semibold text-deep-950">
            Philippines Travel Map
          </h1>
          <p className="text-xs text-deep-900/60">
            Explore destinations and build your trip itinerary
          </p>
        </header>

        {/* Tabs */}
        <div className="flex border-b border-sand-300">
          <button
            onClick={() => setActiveTab('explore')}
            className={`flex-1 py-2.5 text-sm font-medium transition-colors ${
              activeTab === 'explore'
                ? 'border-b-2 border-coral-500 text-deep-950'
                : 'text-deep-900/50 hover:text-deep-950'
            }`}
          >
            Explore
          </button>
          <button
            onClick={() => setActiveTab('itinerary')}
            className={`flex-1 py-2.5 text-sm font-medium transition-colors ${
              activeTab === 'itinerary'
                ? 'border-b-2 border-coral-500 text-deep-950'
                : 'text-deep-900/50 hover:text-deep-950'
            }`}
          >
            Itinerary {itinerary.length > 0 && `(${itinerary.length})`}
          </button>
        </div>

        <div className="themed-scroll flex-1 overflow-y-auto">
          {activeTab === 'explore' ? (
            <>
              <FilterBar
                query={query}
                onQueryChange={setQuery}
                activeRegion={activeRegion}
                onRegionChange={setActiveRegion}
                allTags={allTags}
                activeTags={activeTags}
                onToggleTag={toggleTag}
              />
              <DestinationList
                destinations={filteredDestinations}
                selectedId={selectedId}
                onSelect={selectDestination}
              />
              {selectedDestination && (
                <div className="border-t border-sand-300">
                  <DestinationDetail
                    destination={selectedDestination}
                    inItinerary={itinerary.some((d) => d.id === selectedDestination.id)}
                    onAddToItinerary={addToItinerary}
                  />
                </div>
              )}
            </>
          ) : (
            <ItineraryPanel itinerary={itinerary} onRemove={removeFromItinerary} />
          )}
        </div>
      </aside>

      {/* Map */}
      <main className="h-1/2 flex-1 md:h-full">
        <MapView
          destinations={filteredDestinations}
          focusedDestination={selectedDestination}
          onSelect={selectDestination}
        />
      </main>
    </div>
  );
}
