type Props = {
    grid: number[][];
    setGrid: React.Dispatch<React.SetStateAction<number[][]>>;
    isDragging: React.MutableRefObject<boolean>;
    zoomLevel: number;
    running: boolean;
  };
  
  export default function GameGrid({
    grid,
    setGrid,
    isDragging,
    zoomLevel,
    running,
  }: Props) {
    return (
      <div
        className="absolute top-0 left-0 grid origin-center"
        style={{
          gridTemplateColumns: `repeat(${grid[0].length}, 20px)`,
          gridTemplateRows: `repeat(${grid.length}, 20px)`,
          width: `${grid[0].length * 20}px`,
          height: `${grid.length * 20}px`,
          transform: `scale(${zoomLevel})`,
        }}
      >
        {grid.map((row, i) =>
          row.map((cell, j) => (
            <div
              key={`${i}-${j}`}
              onClick={() => {
                if (running || isDragging.current) return;
                const newGrid = grid.map((r) => [...r]);
                newGrid[i][j] = grid[i][j] ? 0 : 1;
                setGrid(newGrid);
              }}
              className={`w-5 h-5 border border-gray-700 ${
                cell ? "bg-white" : "bg-black"
              }`}
              style={{ lineHeight: 0 }}
            />
          ))
        )}
      </div>
    );
  }
  