import { fetchFile } from "../../helpers/file-import";

const rawData = fetchFile("data.txt");
const entries = rawData.split(/\n/);
entries.pop();

const RULES = {
  red: 12,
  green: 13,
  blue: 14,
};

let answer = 0;

entries.forEach((entry) => {
  const gameArr = entry.split(":");
  const gameNum = parseInt(gameArr[0].replace("Game ", ""));
  let isGameInvalid = false;

  const matches = gameArr[1].matchAll(/(\d*) (blue|red|green)/g);
  for (const match of matches) {
    if (parseInt(match[1]) > RULES[match[2] as keyof typeof RULES]) {
      isGameInvalid = true;
      break;
    }
  }

  if (!isGameInvalid) answer += gameNum;
});

console.log(answer);
