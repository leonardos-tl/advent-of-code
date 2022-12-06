import * as fs from "fs";

const message = fs.readFileSync(__dirname + "/data.txt", {
  encoding: "utf8",
  flag: "r",
});

const findMarker = (uniqueChars = 4) => {
  let searchArr = [];
  const letterArray = message.split("");

  for (let i = 0; i < letterArray.length; i++) {
    const l = letterArray[i];

    if (searchArr.length < uniqueChars) {
      searchArr.push(l);
      continue;
    }

    searchArr.shift();
    searchArr.push(l);

    if (
      searchArr.filter((sav, sai, sas) => sas.indexOf(sav) === sai).length ===
      uniqueChars
    ) {
      console.log("start of packet marker index:", i + 1);
      break;
    }
  }
};

findMarker(4);
findMarker(14);
