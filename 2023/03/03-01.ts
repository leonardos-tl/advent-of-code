import { fetchFile } from "../../helpers/file-import";

const rawData = fetchFile("data.txt");
const entries = rawData.split(/\n/);
entries.pop();

let partNums: string[] = [];

entries.forEach((entry, y) => {
  const matches = entry.matchAll(/\d+/g);
  for (const match of matches) {
    if (findNearbySymbols(match[0], match.index!, y, entries)) {
      partNums.push(match[0]);
    }
  }
});
console.log(partNums.reduce((p, c) => p + parseInt(c), 0));

function findNearbySymbols(
  partNum: string,
  startX: number,
  startY: number,
  map: string[]
) {
  //Check left and right first
  if (
    (map[startY][startX - 1] && map[startY][startX - 1].match(/[^.]+/g)) ||
    (map[startY][startX + partNum.length] &&
      map[startY][startX + partNum.length].match(/[^.]+/g))
  ) {
    console.log(partNum, "left-right");
    return true;
  }
  //Check top
  if (
    map[startY - 1] &&
    map[startY - 1]
      .substring(startX - 1, startX + partNum.length + 1)
      .match(/[^.]+/g)
  ) {
    console.log(partNum, "top");
    return true;
  }
  //Check bottom
  if (
    map[startY + 1] &&
    map[startY + 1]
      .substring(startX - 1, startX + partNum.length + 1)
      .match(/[^.]+/g)
  ) {
    console.log(partNum, "bottom");
    return true;
  }

  return false;
}
