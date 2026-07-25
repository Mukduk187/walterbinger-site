import { useEffect, useState } from "react";
import { useUniverseStore } from "../state/universeStore";

export function useReducedMotion(): boolean {
  const override = useUniverseStore((state) => state.reducedMotionOverride);
  const [systemPreference, setSystemPreference] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setSystemPreference(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return override ?? systemPreference;
}
