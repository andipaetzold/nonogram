import { Cell } from "./Cell";

export type Grid = ReadonlyArray<ReadonlyArray<Cell>>;

export function fillCell(
    grid: Grid,
    row: number,
    column: number,
    value: Cell
): Grid {
    return grid.map((r, rIndex) => {
        if (rIndex === row) {
            return r.map((c, cIndex) => {
                if (cIndex === column) {
                    return value;
                } else {
                    return c;
                }
            });
        } else {
            return r;
        }
    });
}

export function getLine(
    grid: Grid,
    index: number,
    direction: "horizontal" | "vertical"
): ReadonlyArray<Cell> {
    switch (direction) {
        case "vertical":
            return grid.map((r) => r[index]);
        case "horizontal":
            return grid[index];
        default:
            throw new Error("Unknown direction");
    }
}

export function isGridEqual(gridA: Grid, gridB: Grid): boolean {
    if (gridA.length !== gridB.length) {
        return false;
    }

    for (let i = 0; i < gridA.length; ++i) {
        const rowA = gridA[i];
        const rowB = gridB[i];

        if (rowA.length !== rowB.length) {
            return false;
        }

        for (let j = 0; j < rowA.length; ++j) {
            if (rowA[j] !== rowB[j]) {
                return false;
            }
        }
    }

    return true;
}

export function isDone(grid: Grid): boolean {
    return grid.every((row) => row.every((c) => c !== Cell.UNKNOWN));
}