import * as fs from "fs";

const commandLog = fs.readFileSync(__dirname + "/test.txt", {
  encoding: "utf8",
  flag: "r",
});

type FileTree = {
  [key: string]: Number | FileTree;
};

let fileTree: FileTree = {};
let route: string[] = [];

const logArray = commandLog.split(/\n/).filter((c) => !!c);

logArray.forEach((log) => {
  const isCommand = log.match(/\$*/);
  if (isCommand) {
    const isCD = log.match(/\$ cd (.*)/);

    if (isCD) {
      if (isCD[1] !== "..") {
        let ref = fileTree;
        route.forEach((r) => {
          ref = ref[r] as FileTree;
        });
        ref[isCD[1]] = {};
        route.push(isCD[1]);
      } else if (isCD[1] === "..") {
        route.pop();
      }
    } else {
      const isDir = log.match(/dir*/);
      const isLs = log.match(/ls*/);
      if (isDir) {
      } else if (!isLs) {
        const fileName = log.split(" ");
        let ref = fileTree;
        route.forEach((r) => {
          ref = ref[r] as FileTree;
        });
        ref[fileName[1]] = Number(fileName[0]);
      }
    }
  }
});

const findDirUnderSize = () => {};

console.log(fileTree);
