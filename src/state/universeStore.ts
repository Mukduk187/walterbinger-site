import { z } from "zod";
import { create } from "zustand";
import {
  canonicalLensSet,
  LENS_IDS,
  type LensId,
} from "../domain/cosmology";

export type AppMode = "cv" | "sky" | "world" | "convergence" | "snow-globe";

const persistedSchema = z.object({
  version: z.literal(1),
  savedDiscoveryIds: z.array(z.string()).max(512),
  lastVisitedAt: z.string().optional(),
  reducedMotionOverride: z.boolean().nullable().optional(),
});

type PersistedUniverse = z.infer<typeof persistedSchema>;

const STORAGE_KEY = "waltron-universe-v1";

function readPersistence(): PersistedUniverse {
  if (typeof window === "undefined") {
    return {
      version: 1,
      savedDiscoveryIds: [],
    };
  }
  try {
    const parsed = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "");
    return persistedSchema.parse(parsed);
  } catch {
    return {
      version: 1,
      savedDiscoveryIds: [],
    };
  }
}

function writePersistence(value: PersistedUniverse): void {
  if (typeof window === "undefined") {
    return;
  }
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
}

interface UniverseState {
  mode: AppMode;
  activeLensIds: LensId[];
  pinnedIds: string[];
  hoveredId: string | null;
  selectedId: string | null;
  centeredId: string | null;
  currentTripDiscoveryIds: string[];
  savedDiscoveryIds: string[];
  reducedMotionOverride: boolean | null;
  debugOpen: boolean;
  enterSky: () => void;
  enterWorld: (id: string) => void;
  returnToSky: () => void;
  returnToCv: () => void;
  startConvergence: () => void;
  enterSnowGlobe: () => void;
  rebirth: () => void;
  toggleLens: (id: LensId) => void;
  clearLenses: () => void;
  togglePin: (id: string) => void;
  setHovered: (id: string | null) => void;
  setSelected: (id: string | null) => void;
  setCentered: (id: string | null) => void;
  saveCurrentTrip: () => void;
  setReducedMotionOverride: (value: boolean | null) => void;
  toggleDebug: () => void;
}

function navigateHash(path: string): void {
  if (typeof window === "undefined") {
    return;
  }
  const next = path.startsWith("#") ? path : `#${path}`;
  if (window.location.hash !== next) {
    window.history.pushState(null, "", next);
  }
}

const initialPersistence = readPersistence();

export const useUniverseStore = create<UniverseState>((set, get) => ({
  mode: "cv",
  activeLensIds: [],
  pinnedIds: [],
  hoveredId: null,
  selectedId: null,
  centeredId: null,
  currentTripDiscoveryIds: [],
  savedDiscoveryIds: initialPersistence.savedDiscoveryIds,
  reducedMotionOverride: initialPersistence.reducedMotionOverride ?? null,
  debugOpen: false,
  enterSky: () => {
    navigateHash("/sky");
    set({ mode: "sky", selectedId: null, centeredId: null });
  },
  enterWorld: (id) => {
    navigateHash(`/world/${id}`);
    set((state) => ({
      mode: "world",
      activeLensIds:
        state.mode === "snow-globe" ? [] : state.activeLensIds,
      centeredId: id,
      selectedId: id,
      currentTripDiscoveryIds: state.currentTripDiscoveryIds.includes(id)
        ? state.currentTripDiscoveryIds
        : [...state.currentTripDiscoveryIds, id],
    }));
  },
  returnToSky: () => {
    navigateHash("/sky");
    set({ mode: "sky", selectedId: null, centeredId: null });
  },
  returnToCv: () => {
    navigateHash("/");
    set({
      mode: "cv",
      activeLensIds: [],
      selectedId: null,
      centeredId: null,
    });
  },
  startConvergence: () => {
    navigateHash("/convergence");
    set({ mode: "convergence", selectedId: null });
  },
  enterSnowGlobe: () => {
    navigateHash("/snow-globe");
    set({ mode: "snow-globe", selectedId: null, centeredId: null });
  },
  rebirth: () => {
    navigateHash("/sky");
    set({
      mode: "sky",
      activeLensIds: [],
      pinnedIds: [],
      hoveredId: null,
      selectedId: null,
      centeredId: null,
    });
  },
  toggleLens: (id) =>
    set((state) => {
      if (state.mode === "convergence" || state.mode === "snow-globe") {
        return state;
      }
      const isActive = state.activeLensIds.includes(id);
      const activeLensIds = canonicalLensSet(
        isActive
          ? state.activeLensIds.filter((lensId) => lensId !== id)
          : [...state.activeLensIds, id],
      );
      return { activeLensIds };
    }),
  clearLenses: () => set({ activeLensIds: [] }),
  togglePin: (id) =>
    set((state) => ({
      pinnedIds: state.pinnedIds.includes(id)
        ? state.pinnedIds.filter((pinnedId) => pinnedId !== id)
        : [...state.pinnedIds, id],
      selectedId: state.selectedId === id ? null : id,
    })),
  setHovered: (id) => set({ hoveredId: id }),
  setSelected: (id) => set({ selectedId: id }),
  setCentered: (id) => set({ centeredId: id }),
  saveCurrentTrip: () => {
    const savedDiscoveryIds = [
      ...new Set([
        ...get().savedDiscoveryIds,
        ...get().currentTripDiscoveryIds,
      ]),
    ];
    writePersistence({
      version: 1,
      savedDiscoveryIds,
      lastVisitedAt: new Date().toISOString(),
      reducedMotionOverride: get().reducedMotionOverride,
    });
    set({ savedDiscoveryIds });
  },
  setReducedMotionOverride: (value) => {
    writePersistence({
      version: 1,
      savedDiscoveryIds: get().savedDiscoveryIds,
      lastVisitedAt: new Date().toISOString(),
      reducedMotionOverride: value,
    });
    set({ reducedMotionOverride: value });
  },
  toggleDebug: () => set((state) => ({ debugOpen: !state.debugOpen })),
}));

export function hydrateRouteFromHash(): void {
  const hash = window.location.hash.replace(/^#/, "");
  const store = useUniverseStore.getState();

  if (hash === "/sky") {
    useUniverseStore.setState({ mode: "sky" });
    return;
  }
  if (hash.startsWith("/world/")) {
    const id = hash.slice("/world/".length);
    useUniverseStore.setState({
      mode: "world",
      centeredId: id,
      selectedId: id,
    });
    return;
  }
  if (hash === "/convergence") {
    useUniverseStore.setState({ mode: "convergence" });
    return;
  }
  if (hash === "/snow-globe") {
    useUniverseStore.setState({ mode: "snow-globe" });
    return;
  }
  if (hash === "/" || hash === "") {
    useUniverseStore.setState({ mode: "cv" });
    return;
  }

  store.returnToCv();
}

export function hasEveryLens(ids: readonly LensId[]): boolean {
  return LENS_IDS.every((id) => ids.includes(id));
}
