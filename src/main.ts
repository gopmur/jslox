import { program } from "commander";

let filePath = "";
program.argument("<input-file>").action((argument) => {
    filePath = argument;
});
program.parse(process.argv);
