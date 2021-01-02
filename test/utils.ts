import { Game } from "../src/Game";
import { Grid } from "../src/Grid";
import { readFileSync } from "fs";
import { Cell } from "../src/Cell";
import path from "path";

const gamesDir = path.resolve(__dirname, "../test/games");

export interface GameFile {
    columns: number[][];
    rows: number[][];
}

export function readGame(name: string): Game {
    const fileRaw = readFileSync(path.resolve(gamesDir, name + ".json"), {
        encoding: "utf-8",
    });
    const gameFile: GameFile = JSON.parse(fileRaw);

    const row = new Array(gameFile.columns.length).fill(Cell.UNKNOWN);
    const grid: Grid = new Array(gameFile.rows.length).fill(row);

    return {
        columns: gameFile.columns,
        rows: gameFile.rows,
        grid,
    };
}

export function readSolution(name: string): Array<Array<Cell>> {
    const fileRaw = readFileSync(path.resolve(gamesDir, name), {
        encoding: "utf-8",
    });

    return fileRaw
        .split("\n")
        .filter((r) => r.length !== 0)
        .map((r) =>
            r.split("").map((c) => {
                switch (c) {
                    case "X":
                        return Cell.FILLED;
                    case "O":
                        return Cell.EMPTY;
                    default:
                        throw new Error("Invalid char");
                }
            })
        );
}
