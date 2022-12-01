import * as fs from "fs";

const caloriesList = fs.readFileSync(__dirname + "/data.txt", {
  encoding: "utf8",
  flag: "r",
});

const highestCalorieTotal = Math.max(
  ...caloriesList
    .split(/\r?\n\n/)
    .map((sg) => sg.split(/\r?\n/).reduce((p, cs) => p + Number(cs), 0))
);

const sumOfTopThreeMostCalorieElves = caloriesList
  .split(/\r?\n\n/)
  .map((sg) => sg.split(/\r?\n/).reduce((p, cs) => p + Number(cs), 0))
  .sort((a, b) => (a > b ? -1 : 1))
  .splice(0, 3)
  .reduce((p, cc) => p + cc, 0);

console.log("Part 1:", highestCalorieTotal);
console.log("Part 2:", sumOfTopThreeMostCalorieElves);
