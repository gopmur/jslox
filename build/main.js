"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
let filePath = "";
commander_1.program.argument("<input-file>").action((argument) => {
    filePath = argument;
});
commander_1.program.parse(process.argv);
console.log(filePath);
