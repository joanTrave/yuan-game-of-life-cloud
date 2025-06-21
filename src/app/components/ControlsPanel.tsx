import { FaPlay, FaPause, FaTrash } from "react-icons/fa";

type Props = {
  running: boolean;
  setRunning: (r: boolean) => void;
  clearGrid: () => void;
  speed: number;
  setSpeed: (s: number) => void;
};

export default function ControlsPanel({
  running,
  setRunning,
  clearGrid,
  speed,
  setSpeed,
}: Props) {
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-4 bg-black/60 p-3 rounded-lg shadow-lg">
      <button
        onClick={() => setRunning(!running)}
        className="bg-gray-800 hover:bg-gray-700 p-3 rounded-full transition"
        title={running ? "Pausar" : "Play"}
      >
        {running ? <FaPause size={20} /> : <FaPlay size={20} />}
      </button>
      <button
        onClick={clearGrid}
        className="bg-red-800 hover:bg-red-700 p-3 rounded-full transition"
        title="Limpiar"
      >
        <FaTrash size={20} />
      </button>
      <div
        className="flex items-center gap-2 text-sm text-white"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <span className="text-xs">Vel:</span>
        <input
          type="range"
          min={100}
          max={2000}
          step={100}
          value={speed}
          onChange={(e) => setSpeed(Number(e.target.value))}
          className="w-32 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
        />
      </div>
    </div>
  );
}
