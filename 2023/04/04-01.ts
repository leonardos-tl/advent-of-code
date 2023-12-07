import { fetchFile } from "../../helpers/file-import";

const rawData = fetchFile("data.txt");
const entries = rawData.split(/\n/);
entries.pop();

let totalScore = 0;

entries.forEach((entry) => {
  const gameArr = entry.split(":");
  const gameNum = parseInt(gameArr[0].replace("Card ", ""));
  const gameData = gameArr[1];
  const cardSplit = gameData.split(" | ");
  const winningNumbers = cardSplit[0].match(/\d+/g)!;
  const playingNumbers = cardSplit[1].match(/\d+/g);

  let score = 0;

  playingNumbers?.forEach((num) => {
    if (winningNumbers.find((wn) => wn === num)) {
      score = score === 0 ? 1 : score * 2;
    }
  });

  totalScore += score;
});

console.log(totalScore);
