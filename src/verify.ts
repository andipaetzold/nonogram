import { Cell } from "./Cell";
import { getLine } from "./Grid";
import { Game } from "./Game";

export function verify(game: Game): boolean {
    return (
        game.rows.every((colSegments, rowIndex) =>
            verifyLine(colSegments, getLine(game.grid, rowIndex, "horizontal"))
        ) &&
        game.columns.every((colSegments, colIndex) =>
            verifyLine(colSegments, getLine(game.grid, colIndex, "vertical"))
        )
    );
}

export function verifyLine(
    segments: ReadonlyArray<number>,
    line: ReadonlyArray<Cell>
): boolean {
    if (line.some((c) => c === Cell.UNKNOWN)) {
        return false;
    }

    if (segments.length === 0 && line.every((c) => c === Cell.EMPTY)) {
        return true;
    }

    const segmentStart = line.findIndex((c) => c === Cell.FILLED);
    if (segmentStart === -1) {
        return false;
    }

    for (let i = 0; i < segments[0]; ++i) {
        if (line[segmentStart + i] === Cell.EMPTY) {
            return false;
        }
    }

    if (
        segmentStart + segments[0] !== line.length &&
        line[segmentStart + segments[0]] === Cell.FILLED
    ) {
        return false;
    }

    return verifyLine(
        segments.slice(1),
        line.slice(segmentStart + segments[0])
    );
}
