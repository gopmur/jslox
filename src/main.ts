import { program } from "commander";
import * as lox from "./lox";

(function main() {

    let filePath = "";
    program.argument("[input-file]").action((argument) => {
        filePath = argument;
    });
    program.parse(process.argv);

    if (filePath == undefined) {
        lox.start_repl();
    }

    else {
        lox.interpret(filePath);
    }
    
})();