import { useEffect, useRef } from "react";

export const useDragScroll = (containerRef: React.RefObject<HTMLDivElement | null>) => {
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const scrollStart = useRef({ left: 0, top: 0 });

  useEffect(() => {
    if (!containerRef) return;	
    const container = containerRef.current;
    if (!container) return;

    const handleMouseDown = (e: MouseEvent) => {
      isDragging.current = true;
      dragStart.current = { x: e.clientX, y: e.clientY };
      scrollStart.current = {
        left: container.scrollLeft,
        top: container.scrollTop,
      };
      container.style.cursor = "grabbing";
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      const dx = e.clientX - dragStart.current.x;
      const dy = e.clientY - dragStart.current.y;
      container.scrollLeft = scrollStart.current.left - dx;
      container.scrollTop = scrollStart.current.top - dy;
    };

    const handleMouseUp = () => {
      isDragging.current = false;
      container.style.cursor = "default";
    };

    container.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      container.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [containerRef]);

  return isDragging;
};
