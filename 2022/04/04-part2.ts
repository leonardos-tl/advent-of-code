import * as fs from "fs";

const choreList = fs.readFileSync(__dirname + "/data.txt", {
  encoding: "utf8",
  flag: "r",
});

const numListOverlapsSubList = (fl: string[], sl: string[]) =>
  (Number(fl[0]) >= Number(sl[0]) && Number(fl[0]) <= Number(sl[1])) ||
  (Number(fl[1]) >= Number(sl[0]) && Number(fl[1]) <= Number(sl[1]));

const sumOfOverlappingChores = choreList
  .split(/\r?\n/)
  .filter((l) => !!l)
  .map((cl) => cl.split(","))
  .reduce((p, clp) => {
    const fe = clp[0].split("-");
    const se = clp[1].split("-");
    return numListOverlapsSubList(fe, se) || numListOverlapsSubList(se, fe)
      ? p + 1
      : p;
  }, 0);

console.log(sumOfOverlappingChores);
