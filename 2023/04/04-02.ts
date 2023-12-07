import { fetchFile } from "../../helpers/file-import";

const rawData = fetchFile("data.txt");
const entries = rawData.split(/\n/);
entries.pop();

type ScratchCard = {
  card: number;
  winners: string[];
  numbers: string[];
};

type ScratchCardList = {
  [index: number]: ScratchCard;
};

let totalScratchCards = 0;
let scratchCardQueue: ScratchCard[] = [];
let originalScratchCards: ScratchCardList = {};

entries.forEach((entry) => {
  const gameArr = entry.split(":");
  const gameNum = parseInt(gameArr[0].replace("Card ", ""));
  const cardSplit = gameArr[1].split(" | ");
  const winningNumbers = cardSplit[0].match(/\d+/g)!;
  const playingNumbers = cardSplit[1].match(/\d+/g)!;

  originalScratchCards[gameNum] = {
    card: gameNum,
    winners: winningNumbers,
    numbers: playingNumbers,
  };
});

let total = 0;
const cards = Object.values(originalScratchCards);

const copies: number[] = cards.reduce((copies, card) => {
  // @ts-ignore
  copies[card.card] = 1;
  return copies;
}, []);

do {
  cards.forEach((card) => {
    let winners = 0;
    if (copies[card.card] === 0) {
      return;
    }

    card.winners.forEach((winner) => {
      if (card.numbers.includes(winner)) {
        winners++;
      }
    });

    for (let w = 1; w <= winners; w++) {
      if (copies[card.card + w]) {
        copies[card.card + w] += copies[card.card];
      }
    }

    total += copies[card.card];

    // We've managed this card, so let's forget it.
    copies[card.card] = 0;
  });
} while (copies.reduce((total, copy) => total + copy, 0) > 0);

console.log(total.toString());
