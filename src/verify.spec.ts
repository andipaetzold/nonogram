import { Cell } from "./Cell";
import { verifyLine } from "./verify";

describe("verifyLine", () => {
    it("returns false for unknown cells", () => {
        expect(verifyLine([], [Cell.EMPTY, Cell.UNKNOWN, Cell.EMPTY])).toBe(
            false
        );
    });

    it("returns true for empty lines", () => {
        expect(verifyLine([], [Cell.EMPTY, Cell.EMPTY, Cell.EMPTY])).toBe(true);
    });

    it("validates single segment line", () => {
        expect(verifyLine([2], [Cell.EMPTY, Cell.FILLED, Cell.FILLED])).toBe(
            true
        );
        expect(verifyLine([2], [Cell.FILLED, Cell.FILLED, Cell.EMPTY])).toBe(
            true
        );
        expect(verifyLine([2], [Cell.FILLED, Cell.FILLED, Cell.FILLED])).toBe(
            false
        );
    });

    it("validates multi segment lines", () => {
        expect(verifyLine([1, 1], [Cell.FILLED, Cell.EMPTY, Cell.FILLED])).toBe(
            true
        );
        expect(verifyLine([1, 1], [Cell.FILLED, Cell.FILLED, Cell.EMPTY])).toBe(
            false
        );
        expect(
            verifyLine(
                [1, 2],
                [Cell.FILLED, Cell.EMPTY, Cell.FILLED, Cell.FILLED]
            )
        ).toBe(true);
        expect(
            verifyLine(
                [1, 2],
                [Cell.FILLED, Cell.FILLED, Cell.FILLED, Cell.FILLED]
            )
        ).toBe(false);
    });
});
