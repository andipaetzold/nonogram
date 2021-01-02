export enum Cell {
    FILLED,
    EMPTY,
    UNKNOWN,
}

export function cellToString(cell: Cell): string {
    switch (cell) {
        case Cell.FILLED:
            return "X";
        case Cell.EMPTY:
            return " ";
        case Cell.UNKNOWN:
            return "?";
    }
}
