import * as fs from "fs";

// A/X: 1 Rock
// B/Y: 2 Paper
// C/Z: 3 Scissors

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

const hands: Hands = { A: 1, B: 2, C: 3, X: 1, Y: 2, Z: 3 };
const battleScore = (oh: number, yh: number) => {
  if (oh === 1) {
    return yh === 3 ? 0 : yh === 1 ? 3 : 6;
  } else if (yh === 1) {
    return oh === 3 ? 6 : oh === 1 ? 3 : 0;
  } else {
    return yh > oh ? 6 : yh === oh ? 3 : 0;
  }
};

const totalScore = strategyGuideString
  .split(/\r?\n/)
  .filter((l) => !!l)
  .map((sp) => sp.split(" ").map((l) => hands[l]))
  .map((pairs) => {
    return pairs[1] + battleScore(pairs[0], pairs[1]);
  })
  .reduce((p, c) => p + c, 0);

console.log(totalScore);
