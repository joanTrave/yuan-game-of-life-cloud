import { useEffect, useRef, useState } from "react";

export const useGameLogic = (
  numRows: number,
  numCols: number,
  speed: number,
  running: boolean
) => {
  const [grid, setGrid] = useState(() =>
    Array.from({ length: numRows }, () =>
      Array.from({ length: numCols }, () => 0)
    )
  );

  const runningRef = useRef(running);
  runningRef.current = running;

  const operations = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
    [1, 1],
    [1, -1],
    [-1, 1],
    [-1, -1],
  ];

  useEffect(() => {
    if (!runningRef.current) return;

    const interval = setInterval(() => {
      setGrid((g) =>
        g.map((row, i) =>
          row.map((cell, j) => {
            let neighbors = 0;
            for (let [x, y] of operations) {
              const newI = i + x;
              const newJ = j + y;
              if (
                newI >= 0 &&
                newI < numRows &&
                newJ >= 0 &&
                newJ < numCols
              ) {
                neighbors += g[newI][newJ];
              }
            }

            if (cell === 1 && (neighbors < 2 || neighbors > 3)) return 0;
            if (cell === 0 && neighbors === 3) return 1;

            return cell;
          })
        )
      );
    }, speed);

    return () => clearInterval(interval);
  }, [speed, running]);

  const clearGrid = () => {
    setGrid(
      Array.from({ length: numRows }, () =>
        Array.from({ length: numCols }, () => 0)
      )
    );
  };

  return { grid, setGrid, clearGrid };
};
