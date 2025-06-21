import { useEffect } from "react";

// useZoom.ts
export const useZoom = (
    containerRef: React.RefObject<HTMLDivElement | null>,
    setZoomLevel: React.Dispatch<React.SetStateAction<number>>
  ) => {
    useEffect(() => {
        if (!containerRef) return;
      const container = containerRef.current;
      if (!container) return;
  
      const handleWheel = (e: WheelEvent) => {
        if (e.ctrlKey || e.metaKey || e.altKey || e.shiftKey) return;
        e.preventDefault();
  
        const delta = e.deltaY > 0 ? -0.1 : 0.1;
        setZoomLevel((prev) => Math.min(3, Math.max(0.5, prev + delta)));
      };
  
      container.addEventListener("wheel", handleWheel, { passive: false });
  
      return () => {
        container.removeEventListener("wheel", handleWheel);
      };
    }, [containerRef, setZoomLevel]);
  };
  
