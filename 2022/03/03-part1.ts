import * as fs from "fs";

const rucksacks = fs.readFileSync(__dirname + "/data.txt", {
  encoding: "utf8",
  flag: "r",
});

const rucksackArray = rucksacks.split(/\r?\n/).filter((l) => !!l);

const prioritySum = rucksackArray.reduce((p, cr) => {
  const firstCompartment = cr.slice(0, cr.length / 2).split("");
  const secondCompartment = cr.slice(cr.length / 2).split("");

  return (
    p +
    firstCompartment
      .filter((l, i, s) => s.indexOf(l) === i)
      .reduce((ps, l) => {
        let newScore = 0;
        if (secondCompartment.some((scl) => scl === l)) {
          const asciiCode = l.charCodeAt(0);
          newScore = asciiCode > 96 ? asciiCode - 96 : asciiCode - 38;
        }
        return ps + newScore;
      }, 0)
  );
}, 0);

console.log(prioritySum);
