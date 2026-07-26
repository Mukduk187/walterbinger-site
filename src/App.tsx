import { AnimatePresence } from "motion/react";
import { useEffect } from "react";
import { CvRoom } from "./components/CvRoom";
import { DeveloperInspector } from "./components/DeveloperInspector";
import { GratitudeSequence } from "./components/GratitudeSequence";
import { LivingMapScene } from "./components/LivingMapScene";
import { SnowGlobeScene } from "./components/SnowGlobeScene";
import {
  hasEveryLens,
  hydrateRouteFromHash,
  useUniverseStore,
} from "./state/universeStore";

export default function App() {
  const mode = useUniverseStore((state) => state.mode);
  const activeLensIds = useUniverseStore((state) => state.activeLensIds);
  const startConvergence = useUniverseStore((state) => state.startConvergence);
  const toggleDebug = useUniverseStore((state) => state.toggleDebug);

  useEffect(() => {
    hydrateRouteFromHash();
    const hydrate = () => hydrateRouteFromHash();
    window.addEventListener("hashchange", hydrate);
    window.addEventListener("popstate", hydrate);
    return () => {
      window.removeEventListener("hashchange", hydrate);
      window.removeEventListener("popstate", hydrate);
    };
  }, []);

  useEffect(() => {
    if (
      (mode === "sky" || mode === "world") &&
      hasEveryLens(activeLensIds)
    ) {
      startConvergence();
    }
  }, [activeLensIds, mode, startConvergence]);

  useEffect(() => {
    const openInspector = (event: KeyboardEvent) => {
      if (
        import.meta.env.DEV &&
        event.altKey &&
        event.shiftKey &&
        event.key.toLowerCase() === "d"
      ) {
        toggleDebug();
      }
    };
    window.addEventListener("keydown", openInspector);
    return () => window.removeEventListener("keydown", openInspector);
  }, [toggleDebug]);

  return (
    <>
      <AnimatePresence mode="wait">
        {mode === "cv" && <CvRoom key="cv" />}
        {(mode === "sky" || mode === "world") && (
          <LivingMapScene key="map" />
        )}
        {mode === "convergence" && <GratitudeSequence key="convergence" />}
        {mode === "snow-globe" && <SnowGlobeScene key="snow-globe" />}
      </AnimatePresence>
      <DeveloperInspector />
    </>
  );
}
