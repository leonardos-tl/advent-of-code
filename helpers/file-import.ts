import * as fs from "fs";
import callsite from "callsite";
import path from "path";

export const fetchFile = (fileName: string) => {
  const stack = callsite(),
    requester = stack[1].getFileName();

  return fs.readFileSync(`${path.dirname(requester)}/${fileName}`, {
    encoding: "utf8",
    flag: "r",
  });
};
