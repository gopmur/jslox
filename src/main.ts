import { program } from "commander";

(function main() {

    let filePath = "";
    program.argument("[input-file]").action((argument) => {
        filePath = argument;
    });
    program.parse(process.argv);
    
})();