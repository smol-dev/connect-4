import { NextPage } from "next";
import { useCallback, useState } from "react";
import { trpc } from "../utils/trpc";

export type CellState = "red" | "blue" | "empty";
export type User = "red" | "blue";

export type Board = {
  grid: CellState[][];
};

const Connect4: NextPage = () => {
  // const hello = trpc.example.hello.useQuery({ text: "from tRPC" });
  // const board = trpc.example.board.useQuery({ text: "from tRPC" });

  const [board, setBoard] = useState<Board>(emptyGrid());
  const [user, setUser] = useState<User>("red");

  function insertHelper(
    user: User,
    i: number,
    grid: CellState[][]
  ): CellState[][] {
    const row = [...(grid[i] ?? [])];
    const tmp = row.findIndex((el) => el === "empty");
    const index = tmp === -1 ? 0 : tmp;
    row[index] = user;
    grid[i] = row;
    return grid;
  }
  function toggleUser(user: User): User {
    return user === "red" ? "blue" : "red";
  }

  const insert = useCallback(
    (i: number) => {
      setBoard({
        grid: insertHelper(user, i, board.grid),
      });
      setUser(toggleUser(user));
    },

    [board.grid, user]
  );

  return (
    <>
      <main className="flex min-h-screen flex-col place-items-center bg-red-900 p-2">
        <h1 className="text-5xl font-extrabold leading-normal text-gray-700 md:text-[5rem]">
          Connect <span className="text-purple-300">4</span>
        </h1>
        <section
          id="board"
          className="flex aspect-square place-self-center self-center border text-center "
        >
          {board.grid.map((row, i) => (
            // row
            <div
              onClick={() => insert(i)}
              className="flex flex-col-reverse bg-green-400 hover:bg-green-700"
              key={i}
            >
              {row.map((cell, j) => (
                <div
                  className={`aspect-square w-14 border md:w-20 lg:w-32 xl:w-32 bg-${cell}-500`}
                  key={`${i}-${j}`}
                >
                  {/* {`${i}-${j}`} */}
                  {cell}
                </div>
              ))}
            </div>
          ))}
          {/* <pre>{`${JSON.stringify(board.grid)}`}</pre> */}
        </section>
      </main>
    </>
  );
};

export default Connect4;
/**
 * create a  10x10 connect-4 grid
 * @returns
 */
function emptyGrid(): Board | (() => Board) {
  const grid: [][] = new Array(7).fill(new Array(6).fill("empty"));
  return {
    grid,
  };
}
