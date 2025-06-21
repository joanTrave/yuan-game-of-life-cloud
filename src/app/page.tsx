"use client";

import { useRef, useState } from "react";
import { useGameLogic } from "@/app/components/useGameLogic";
import { useDragScroll } from "@/app/components/useDragScroll";
import { useZoom } from "@/app/components/useZoom";
import GameGrid from "@/app/components/GameGrid";
import ControlsPanel from "@/app/components/ControlsPanel";

const numRows = 200;
const numCols = 200;

export default function Home() {
  const [running, setRunning] = useState(false);
  const [speed, setSpeed] = useState(1000);
  const [zoomLevel, setZoomLevel] = useState(1);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { grid, setGrid, clearGrid } = useGameLogic(
    numRows,
    numCols,
    speed,
    running
  );

  const isDragging = useDragScroll(containerRef);
  useZoom(containerRef, setZoomLevel);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 overflow-hidden bg-black"
      style={{ scrollbarWidth: "none" }}
    >
      <ControlsPanel
        running={running}
        setRunning={setRunning}
        clearGrid={clearGrid}
        speed={speed}
        setSpeed={setSpeed}
      />
      <GameGrid
        grid={grid}
        setGrid={setGrid}
        isDragging={isDragging}
        zoomLevel={zoomLevel}
        running={running}
      />
    </div>
  );
}
