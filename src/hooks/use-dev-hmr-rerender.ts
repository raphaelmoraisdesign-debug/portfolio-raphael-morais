import { useEffect, useReducer } from "react";

/**
 * Dev-only helper: force a component to re-render when a custom window event fires.
 */
export function useDevHmrRerender(eventName: string) {
  const [, bump] = useReducer((x: number) => x + 1, 0);

  useEffect(() => {
    if (!import.meta.env.DEV) return;

    const handler = () => bump();
    window.addEventListener(eventName, handler);

    return () => window.removeEventListener(eventName, handler);
  }, [eventName]);
}
