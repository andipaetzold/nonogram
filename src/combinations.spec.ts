import calcCombinations from "./combinations";
import { Cell } from "./Cell";

describe("calcLineCombinations", () => {
    test.each`
        segments  | line       | combinations
        ${[3]}    | ${"???"}   | ${["XXX"]}
        ${[2]}    | ${"???"}   | ${["XXO", "OXX"]}
        ${[1]}    | ${"???"}   | ${["XOO", "OXO", "OOX"]}
        ${[1, 1]} | ${"???"}   | ${["XOX"]}
        ${[2, 1]} | ${"????"}  | ${["XXOX"]}
        ${[2, 1]} | ${"?????"} | ${["XXOXO", "XXOOX", "OXXOX"]}
    `(
        "calculates combinations: $segments, $line",
        ({ segments, line, combinations }) => {
            expect(calcCombinations(segments, fromString(line))).toStrictEqual(
                combinations.map(fromString)
            );
        }
    );

    test.each`
        segments  | line       | combinations
        ${[3]}    | ${"?X?"}   | ${["XXX"]}
        ${[2]}    | ${"??O"}   | ${["XXO"]}
        ${[2]}    | ${"O??"}   | ${["OXX"]}
        ${[2]}    | ${"?X?"}   | ${["XXO", "OXX"]}
        ${[2]}    | ${"OXX"}   | ${["OXX"]}
        ${[1]}    | ${"?O?"}   | ${["XOO", "OOX"]}
        ${[1, 1]} | ${"?O??"}  | ${["XOXO", "XOOX"]}
        ${[2, 1]} | ${"??O??"} | ${["XXOXO", "XXOOX"]}
        ${[1, 1]} | ${"OXOX?"} | ${["OXOXO"]}
    `(
        "calculates combinations with prefilled cells: $segments, $line",
        ({ segments, line, combinations }) => {
            expect(calcCombinations(segments, fromString(line))).toStrictEqual(
                combinations.map(fromString)
            );
        }
    );
});

function fromString(s: string): Array<Cell> {
    return s.split("").map((c) => {
        switch (c) {
            case "X":
                return Cell.FILLED;
            case "O":
                return Cell.EMPTY;
            case "?":
                return Cell.UNKNOWN;
            default:
                throw new Error("Invalid character");
        }
    });
}
