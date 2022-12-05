import * as fs from "fs";

const data = [
  ["S", "Z", "P", "D", "L", "B", "F", "C"],
  ["N", "V", "G", "P", "H", "W", "B"],
  ["F", "W", "B", "J", "G"],
  ["G", "J", "N", "F", "L", "W", "C", "S"],
  ["W", "J", "L", "T", "P", "M", "S", "H"],
  ["B", "C", "W", "G", "F", "S"],
  ["H", "T", "P", "M", "Q", "B", "W"],
  ["F", "S", "W", "T"],
  ["N", "C", "R"],
];

const testData = [["Z", "N"], ["M", "C", "D"], ["P"]];

const instructionString = fs.readFileSync(__dirname + "/data.txt", {
  encoding: "utf8",
  flag: "r",
});

const instructionStringArray = instructionString.split(/\n/).filter((l) => !!l);

instructionStringArray.forEach((is) => {
  const regexMatch = is.match(/move (\d*) from (\d*) to (\d*)/);
  const quantityToMove = Number(regexMatch![1]);
  const origin = Number(regexMatch![2]) - 1;
  const destination = Number(regexMatch![3]) - 1;
  const takenCrates = data[origin].splice(quantityToMove * -1);
  data[destination] = [...data[destination], ...takenCrates];
});

console.log(data.map((ca) => ca.pop()).join(""));
