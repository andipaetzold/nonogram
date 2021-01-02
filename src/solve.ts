import { Cell } from "./Cell";
import calcCombinations from "./combinations";
import { fillCell, getLine, Grid, isDone, isGridEqual } from "./Grid";
import { Game } from "./Game";
import { verify } from "./verify";

export function solve({ grid: inputGrid, rows, columns }: Game): Grid {
    let grid = inputGrid;

    let prevGrid;

    do {
        prevGrid = grid;

        rows.forEach((row, rowIndex) => {
            const combinations = calcCombinations(row, getLine(grid, rowIndex, "horizontal"));

            if (combinations.length > 0) {
                const overlappings = getOverlappings(combinations);

                overlappings.forEach((value, index) => {
                    if (value !== null) {
                        grid = fillCell(grid, rowIndex, index, value);
                    }
                });
            }
        });

        columns.forEach((column, columnIndex) => {
            const combinations = calcCombinations(column, getLine(grid, columnIndex, "vertical"));

            if (combinations.length > 0) {
                const overlappings = getOverlappings(combinations);

                overlappings.forEach((value, index) => {
                    if (value !== Cell.UNKNOWN) {
                        grid = fillCell(grid, index, columnIndex, value);
                    }
                });
            }
        });
    } while (!isDone(grid) && !isGridEqual(prevGrid, grid));

    if (!isDone(grid) || !verify({ columns, rows, grid })) {
        throw new Error("Could not solve game");
    }

    return grid;
}

function getOverlappings(combinations: Array<Array<Cell>>): Array<Cell> {
    const firstRow = combinations[0];

    return firstRow.map((value, index) => {
        if (combinations.every((c) => c[index] === value)) {
            return value;
        } else {
            return Cell.UNKNOWN;
        }
    });
}
