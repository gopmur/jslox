import { program } from "commander";
import * as lox from "./lox";

(function main() {

    let filePath = "";
    program.argument("[input-file]").action((argument) => {
        filePath = argument;
    });
    program.parse(process.argv);

    if (process.argv.length == 0) {
        // run the repl
    }

    else {
        lox.interpret(filePath);
    }
    
})();