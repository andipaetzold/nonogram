import { Cell } from "./Cell";

export default function calcCombinations(
    segments: ReadonlyArray<number>,
    line: ReadonlyArray<Cell>
): Array<Array<Cell>> {
    const minimumRequiredCells =
        segments.reduce((prev, cur) => prev + cur, 0) + segments.length - 1;
    if (line.length < minimumRequiredCells) {
        return [];
    }

    if (segments.length === 0) {
        if (line.every((c) => [Cell.EMPTY, Cell.UNKNOWN].includes(c))) {
            return [new Array(line.length).fill(Cell.EMPTY)];
        } else {
            return [];
        }
    }

    const combinations: Array<Array<Cell>> = [];
    const curSegment = segments[0];

    const firstFilled = line.findIndex((c) => c === Cell.FILLED);

    let startPos = 0;
    while (
        startPos < line.length - minimumRequiredCells + 1 &&
        (startPos <= firstFilled || firstFilled === -1)
    ) {
        if (
            line
                .slice(startPos, startPos + curSegment)
                .every((c) => [Cell.FILLED, Cell.UNKNOWN].includes(c)) &&
            ([Cell.EMPTY, Cell.UNKNOWN].includes(line[startPos + curSegment]) ||
                startPos + curSegment === line.length)
        ) {
            const endOfLine = startPos + curSegment === line.length;
            const combinationStart = [
                ...new Array(startPos).fill(Cell.EMPTY),
                ...new Array(curSegment).fill(Cell.FILLED),
                ...(endOfLine ? [] : [Cell.EMPTY]),
            ];

            const recCombinations = calcCombinations(
                segments.slice(1),
                line.slice(combinationStart.length)
            );

            combinations.push(
                ...recCombinations.map((combination) => [
                    ...combinationStart,
                    ...combination,
                ])
            );
        }

        ++startPos;
    }

    return combinations;
}
