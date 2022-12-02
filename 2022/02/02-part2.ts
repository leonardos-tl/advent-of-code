import * as fs from "fs";

// A: 1 Rock
// B: 2 Paper
// C: 3 Scissors

// X: Lose
// Y: Draw
// Z: Win

// 6 = Win
// 3 = Draw
// 0 = Lose

const strategyGuideString = fs.readFileSync(__dirname + "/data.txt", {
  encoding: "utf8",
  flag: "r",
});

type Hands = {
  [letter: string]: number;
};

const hands: Hands = { A: 1, B: 2, C: 3 };
const battleScore = (oh: number, er: string) => {
  if (oh === 1) {
    return er === "X" ? 3 : er === "Y" ? 4 : 8;
  } else if (oh === 2) {
    return er === "X" ? 1 : er === "Y" ? 5 : 9;
  } else {
    return er === "X" ? 2 : er === "Y" ? 6 : 7;
  }
};

const totalScore = strategyGuideString
  .split(/\r?\n/)
  .filter((l) => !!l)
  .map((sp) => sp.split(" "))
  .map((pairs) => battleScore(hands[pairs[0]], pairs[1]))
  .reduce((p, c) => p + c, 0);

console.log(totalScore);
