import destinations from '../../data/destinations.json';

/**
 * Returns the full destinations dataset from data/destinations.json.
 *
 * Kept as its own hook (rather than importing the JSON directly in
 * components) so that swapping this for a fetch() call to a CMS or API
 * later only requires changing this one file.
 */
export function useDestinations() {
  return destinations;
}
