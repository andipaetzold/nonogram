import { readGame, readSolution } from "../test/utils";
import { solve } from "./solve";

describe("solve", () => {
    test.each`
        gameFile       | solutionFile
        ${"5x5/snake"} | ${"5x5/snake-solution"}
        ${"5x5/skull"} | ${"5x5/skull-solution"}
        ${"5x5/sharp"} | ${"5x5/sharp-solution"}
        ${"10x10/tv"}  | ${"10x10/tv-solution"}
        ${"20x20/bus"} | ${"20x20/bus-solution"}
    `(`should solve $gameFile`, ({ gameFile, solutionFile }) => {
        const game = readGame(gameFile);
        const solution = readSolution(solutionFile);

        const solvedGrid = solve(game);
        expect(solvedGrid).toStrictEqual(solution);
    });
});
