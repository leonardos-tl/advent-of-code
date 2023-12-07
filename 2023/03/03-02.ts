import { fetchFile } from "../../helpers/file-import";

const rawData = fetchFile("data.txt");
const entries = rawData.split(/\n/);
entries.pop();

function range(start: number, stop: number, step: number = 1): number[] {
  const result: number[] = [];
  for (
    let index = start;
    step > 0 ? index < stop : index > stop;
    index += step
  ) {
    result.push(index);
  }
  return result;
}

const height = entries.length;
const width = entries[0].length;

const gears: number[][][] = [];
for (let index = 0; index < height; index++) {
  const row: number[][] = [];
  for (let index = 0; index < width; index++) {
    row.push([]);
  }
  gears.push(row);
}

function neighborIsSymbol(row: number, column: number, number_: number) {
  if (!(0 <= row && row < height && 0 <= column && column < width)) {
    return false;
  }

  if (entries[row][column] === "*") {
    gears[row][column].push(number_);
  }

  // is not a number and is not a `.`
  return !/[\d.]/.test(entries[row][column]);
}

let sum = 0;

entries.forEach((line, lineNumber) => {
  let start = 0;
  let column = 0;

  while (column < width) {
    let numberAsString = "";
    start = column;

    while (column < width && !isNaN(parseInt(line[column]))) {
      numberAsString += line[column];
      column++;
    }

    if (numberAsString === "") {
      column++;
      continue;
    }

    const number_ = Number(numberAsString);

    if (
      neighborIsSymbol(lineNumber, start - 1, number_) ||
      neighborIsSymbol(lineNumber, column, number_)
    ) {
      // SideEffect: fill the gears
    }

    for (const position of range(start - 1, column + 1)) {
      if (
        neighborIsSymbol(lineNumber - 1, position, number_) ||
        neighborIsSymbol(lineNumber + 1, position, number_)
      ) {
        // SideEffect: fill the gears
      }
    }
  }
});

for (let lineNumber = 0; lineNumber < height; lineNumber++) {
  for (let columnNumber = 0; columnNumber < height; columnNumber++) {
    const numbers = gears[lineNumber][columnNumber];
    if (entries[lineNumber][columnNumber] === "*" && numbers.length === 2) {
      sum += numbers[0] * numbers[1];
    }
  }
}

console.log(sum);
