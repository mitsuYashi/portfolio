import React, { useCallback, useEffect, useState } from "react";
import { css } from "@emotion/react";
import next, { NextPage } from "next";
import Panel from "./Panel";

const board = css`
  position: relative;
  width: 400px;
  height: 400px;
  margin: 0 auto;
`;

const gameboard = css`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr;

  margin: 0 auto;
  width: 400px;
  height: 400px;
  border: 1px solid #3a3a45;
  border-radius: 5px;
`;

const panel = css`
  width: 100px;
  height: 100px;
  border: 1px solid #3a3a4516;
`;

const gameOver = css`
  width: 100%;
  height: 100%;
  color: #eef;
  font-size: 2rem;
  text-align: center;
  line-height: 400px;
  background-color: rgba(32, 32, 32, 0.5);
  position: absolute;
`;

const scoreCss = css`
  margin: 0 auto 20px auto;
  width: 200px;
  height: 5rem;
  background-color: #fff8d4;
  color: #252038;
  text-align: center;
  line-height: 50px;
  border-radius: 10px;
  font-weight: bold;
  span {
    display: block;
    height: 2rem;
  }
`;

const textCenter = css`
  width: 100%;
  height: 2rem;
  text-align: center;
`;

const fontChange = css`
  outline: none;
  border: none;
  height: 3rem;
  background-color: #d4dcff;
  position: absolute;
  top: 45px;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
  &:hover {
    background-color: #afbeff;
  }
`;

const randomGenerate = (panelNums: number[][]): [number, number] => {
  let zeroLength = 0;
  let zeroPointer: number[][] = [];
  panelNums.map((arr, column) => {
    zeroLength += arr.filter((num, row) => {
      num === 0 ? zeroPointer.push([column, row]) : null;
      return num === 0;
    }).length;
  });
  if (zeroLength === 0) {
    return [0, 0];
  }

  const randomNum = Math.floor(Math.random() * zeroLength);
  const [y, x] = zeroPointer[randomNum];
  return [y, x];
};

const continueGame = (panelNums: number[][]): boolean => {
  let zeroLength = 0;
  panelNums.map((arr, column) => {
    zeroLength += arr.filter((num, row) => {
      return num === 0;
    }).length;
  });
  console.log(zeroLength);
  if (zeroLength !== 0) {
    return true;
  }
  for (let column = 0; column < 4; column++) {
    for (let row = 0; row < 3; row++) {
      if (panelNums[column][row] === panelNums[column][row + 1]) {
        return true;
      }
    }
  }
  for (let column = 0; column < 3; column++) {
    for (let row = 0; row < 4; row++) {
      if (panelNums[column][row] === panelNums[column + 1][row]) {
        return true;
      }
    }
  }
  return false;
};

const Game2048: React.FC = () => {
  const [panelNums, setPanelNums] = useState([
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    // [2, 4, 2, 4],
    // [4, 2, 4, 2],
    // [2, 4, 2, 4],
    // [4, 2, 4, 2],
  ]);
  const [newPanelNums, setNewPanelNums] = useState<number[][]>([]);
  const [isStarted, setIsStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [hiScore, setHiScore] = useState(0);
  const [fontNum, setFontNum] = useState(0);

  const generateNewPanel = useCallback(() => {
    const [y, x] = randomGenerate(panelNums);
    const next = [...panelNums];
    if (next[y][x] !== 0) {
      return false;
    }
    const randomNum = Math.floor(Math.random() * 4 + 1);
    if (randomNum === 4) {
      next[y][x] = 4;
    } else {
      next[y][x] = 2;
    }
    setPanelNums(next);
  }, [panelNums]);

  const moveLeft = useCallback(() => {
    for (let column = 0; column < 4; column++) {
      for (let row = 1; row < 4; row++) {
        if (panelNums[column][row] === 0) {
          continue;
        } else {
          if (panelNums[column][row - 1] === 0) {
            const next = [...panelNums];
            next[column][row - 1] = next[column][row];
            next[column][row] = 0;
            setPanelNums(next);
            moveLeft();
          }
        }
      }
    }
  }, [panelNums]);
  const moveUp = useCallback(() => {
    for (let column = 1; column < 4; column++) {
      for (let row = 0; row < 4; row++) {
        if (panelNums[column][row] === 0) {
          continue;
        } else {
          if (panelNums[column - 1][row] === 0) {
            const next = [...panelNums];
            next[column - 1][row] = next[column][row];
            next[column][row] = 0;
            setPanelNums(next);
            moveUp();
          }
        }
      }
    }
  }, [panelNums]);
  const moveRight = useCallback(() => {
    for (let column = 0; column < 4; column++) {
      for (let row = 2; row >= 0; row--) {
        if (panelNums[column][row] === 0) {
          continue;
        } else {
          if (panelNums[column][row + 1] === 0) {
            const next = [...panelNums];
            next[column][row + 1] = next[column][row];
            next[column][row] = 0;
            setPanelNums(next);
            moveRight();
          }
        }
      }
    }
  }, [panelNums]);
  const moveDown = useCallback(() => {
    for (let column = 2; column >= 0; column--) {
      for (let row = 0; row < 4; row++) {
        if (panelNums[column][row] === 0) {
          continue;
        } else {
          if (panelNums[column + 1][row] === 0) {
            const next = [...panelNums];
            next[column + 1][row] = next[column][row];
            next[column][row] = 0;
            setPanelNums(next);
            moveDown();
          }
        }
      }
    }
  }, [panelNums]);

  const addLeft = useCallback(() => {
    for (let column = 0; column < 4; column++) {
      for (let row = 0; row < 3; row++) {
        if (panelNums[column][row] === 0) {
          continue;
        } else {
          if (panelNums[column][row] === panelNums[column][row + 1]) {
            const next = [...panelNums];
            next[column][row] = next[column][row] * 2;
            next[column][row + 1] = 0;
            const newScore = score + next[column][row];
            setScore(newScore);
            hiScore < newScore ? setHiScore(newScore) : null;
            setPanelNums(next);
            moveLeft();
          }
        }
      }
    }
  }, [panelNums, score, hiScore, moveLeft]);
  const addUp = useCallback(() => {
    for (let column = 0; column < 3; column++) {
      for (let row = 0; row < 4; row++) {
        if (panelNums[column][row] === 0) {
          continue;
        } else {
          if (panelNums[column][row] === panelNums[column + 1][row]) {
            const next = [...panelNums];
            next[column][row] = next[column][row] * 2;
            next[column + 1][row] = 0;
            const newScore = score + next[column][row];
            setScore(newScore);
            hiScore < newScore ? setHiScore(newScore) : null;
            setPanelNums(next);
            moveUp();
          }
        }
      }
    }
  }, [panelNums, score, hiScore, moveUp]);
  const addRight = useCallback(() => {
    for (let column = 0; column < 4; column++) {
      for (let row = 3; row > 0; row--) {
        if (panelNums[column][row] === 0) {
          continue;
        } else {
          if (panelNums[column][row] === panelNums[column][row - 1]) {
            const next = [...panelNums];
            next[column][row] = next[column][row] * 2;
            next[column][row - 1] = 0;
            const newScore = score + next[column][row];
            setScore(newScore);
            hiScore < newScore ? setHiScore(newScore) : null;
            setPanelNums(next);
            moveRight();
          }
        }
      }
    }
  }, [panelNums, score, hiScore, moveRight]);
  const addDown = useCallback(() => {
    for (let column = 3; column > 0; column--) {
      for (let row = 0; row < 4; row++) {
        if (panelNums[column][row] === 0) {
          continue;
        } else {
          if (panelNums[column][row] === panelNums[column - 1][row]) {
            const next = [...panelNums];
            next[column][row] = next[column][row] * 2;
            next[column - 1][row] = 0;
            const newScore = score + next[column][row];
            setScore(newScore);
            hiScore < newScore ? setHiScore(newScore) : null;
            setPanelNums(next);
            moveDown();
          }
        }
      }
    }
  }, [panelNums, score, hiScore, moveDown]);

  const resetGame = useCallback(() => {
    const newPanelNums = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];
    const [y, x] = randomGenerate(panelNums);
    if (newPanelNums[y][x] !== 0) {
      return false;
    }
    const randomNum = Math.floor(Math.random() * 2 + 1) * 2;
    newPanelNums[y][x] = randomNum;
    setPanelNums(newPanelNums);
    setScore(0);
  }, [panelNums]);

  const pushArrFunction = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft" || event.key === "a") {
        console.log("ArrowLeft Key is pressed!");
        moveLeft();
        addLeft();
        generateNewPanel();
      }
      if (event.key === "ArrowUp" || event.key === "w") {
        console.log("ArrowUp Key is pressed!");
        moveUp();
        addUp();
        generateNewPanel();
      }
      if (event.key === "ArrowRight" || event.key === "d") {
        console.log("ArrowRight Key is pressed!");
        moveRight();
        addRight();
        generateNewPanel();
      }
      if (event.key === "ArrowDown" || event.key === "s") {
        console.log("ArrowDown Key is pressed!");
        moveDown();
        addDown();
        generateNewPanel();
      }
      if (event.key === " ") {
        resetGame();
      }
      if (event.key === "f") {
        fontNum >= 5 ? setFontNum(0) : setFontNum(fontNum + 1);
      }
    },
    [
      // panelNums,
      moveLeft,
      addLeft,
      generateNewPanel,
      moveUp,
      addUp,
      moveRight,
      addRight,
      moveDown,
      addDown,
      resetGame,
      fontNum,
    ]
  );

  useEffect(() => {
    document.addEventListener("keydown", pushArrFunction, false);
    return () => {
      document.removeEventListener("keydown", pushArrFunction, false);
    };
  }, [pushArrFunction]);

  useEffect(() => {
    if (!isStarted) {
      const [y, x] = randomGenerate(panelNums);

      setPanelNums((prev) => {
        prev[y][x] = 2;
        setNewPanelNums(prev);
        return prev;
      });
      setIsStarted(true);
    }
  }, [panelNums, isStarted]);

  // console.log(panelNums);
  return (
    <div>
      <h1>2048</h1>
      <button
        onClick={() => (fontNum >= 5 ? setFontNum(0) : setFontNum(fontNum + 1))}
        css={fontChange}
      >
        フォントを変更する
      </button>
      <div css={scoreCss}>
        <span>hiscore: {hiScore}</span>
        <span>score: {score}</span>
      </div>
      <div css={board}>
        {continueGame(panelNums) === false ? (
          <div css={gameOver}>GameOver</div>
        ) : null}
        <div css={gameboard}>
          {panelNums == null
            ? null
            : panelNums.map((num) =>
                num.map((val, index) => (
                  <Panel numprops={val} key={index} fontNum={fontNum} />
                ))
              )}
        </div>
      </div>
      <div css={textCenter}>Spaceでリセット</div>
    </div>
  );
};

export default Game2048;
