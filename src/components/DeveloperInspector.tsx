import {
  combinationKey,
  matchingQuartets,
  resolvePhenomena,
} from "../domain/cosmology";
import { useUniverseStore } from "../state/universeStore";

export function DeveloperInspector() {
  const debugOpen = useUniverseStore((state) => state.debugOpen);
  const mode = useUniverseStore((state) => state.mode);
  const activeLensIds = useUniverseStore((state) => state.activeLensIds);
  const centeredId = useUniverseStore((state) => state.centeredId);
  const pinnedIds = useUniverseStore((state) => state.pinnedIds);

  if (!import.meta.env.DEV || !debugOpen) {
    return null;
  }

  return (
    <aside className="developer-inspector">
      <p>{mode}</p>
      <p>{combinationKey(activeLensIds) || "no lenses"}</p>
      <p>{matchingQuartets(activeLensIds).length} matching quartets</p>
      <p>{resolvePhenomena(activeLensIds).map((item) => item.name).join(", ")}</p>
      <p>center: {centeredId ?? "origin"}</p>
      <p>pinned: {pinnedIds.join(", ") || "none"}</p>
    </aside>
  );
}
