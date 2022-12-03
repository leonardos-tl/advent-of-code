import * as fs from "fs";

const rucksacks = fs.readFileSync(__dirname + "/data.txt", {
  encoding: "utf8",
  flag: "r",
});

const rucksackArray = rucksacks.split(/\r?\n/).filter((l) => !!l);

let total = 0;

for (let i = 0; i < rucksackArray.length; i += 3) {
  const chunk = rucksackArray.slice(i, i + 3);

  chunk[0]
    .split("")
    .filter((l, i, s) => s.indexOf(l) === i)
    .forEach((l) => {
      if (chunk.every((cs) => cs.indexOf(l) > -1)) {
        const asciiCode = l.charCodeAt(0);
        total += asciiCode > 96 ? asciiCode - 96 : asciiCode - 38;
      }
    });
}

console.log(total);
