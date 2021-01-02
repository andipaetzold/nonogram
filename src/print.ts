import { Cell, cellToString } from "./Cell";
import { Grid } from "./Game";

export function printLine(line: ReadonlyArray<Cell>): void {
    const lineToPrint = line.map((c) => cellToString(c)).join("");
    console.log(lineToPrint);
}

export function printGrid(grid: Grid) {
    const gridToPrint = grid
        .map((row) => row.map((c) => cellToString(c)).join(""))
        .join("\n");
    console.log(gridToPrint);
}
