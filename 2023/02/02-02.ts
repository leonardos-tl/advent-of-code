import { fetchFile } from "../../helpers/file-import";

const rawData = fetchFile("data.txt");
const entries = rawData.split(/\n/);
entries.pop();

let answer = 0;

entries.forEach((entry) => {
  const gameArr = entry.split(":");
  const matches = gameArr[1].matchAll(/(\d*) (blue|red|green)/g);
  let minValues = { red: 0, green: 0, blue: 0 };
  for (const match of matches) {
    if (parseInt(match[1]) > minValues[match[2] as keyof typeof minValues]) {
      minValues[match[2] as keyof typeof minValues] = parseInt(match[1]);
    }
  }
  answer += minValues.red * minValues.green * minValues.blue;
});

console.log(answer);
