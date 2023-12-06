import nodemon from "nodemon";
import childProcess from "child_process";

nodemon({ watch: ["2023/**/*"], ext: "ts", exec: "echo ''" })
  .on("crash", function () {
    console.log("script crashed for some reason");
  })
  .on("restart", function (files = []) {
    files.forEach(async (file) => {
      if (file.endsWith(".ts")) {
        runScript(file, (err: any) => {
          if (err) throw err;
        });
      }
    });
  });

function runScript(scriptPath: string, callback: Function) {
  // keep track of whether callback has been invoked to prevent multiple invocations
  let invoked = false;
  const process = childProcess.fork(scriptPath);

  // listen for errors as they may prevent the exit event from firing
  process.on("error", function (err) {
    if (invoked) return;
    invoked = true;
    callback(err);
  });

  // execute the callback once the process has finished running
  process.on("exit", function (code) {
    if (invoked) return;
    invoked = true;
    const err = code === 0 ? null : new Error("exit code " + code);
    callback(err);
  });
}
