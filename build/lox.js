"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interpret = exports.start_repl = exports.error = void 0;
const readline_sync_1 = require("readline-sync");
const lexer_1 = require("./lexer");
const fs = __importStar(require("fs"));
let hasError = false;
function error(line, message) {
    hasError = true;
    report(line, "", message);
}
exports.error = error;
function report(line, where, message) {
    console.error(`[line ${line}] Error${where}: ${message}`);
}
function start_repl() {
    while (true) {
        let line = (0, readline_sync_1.question)("> ");
        let scanner = new lexer_1.Scanner(line);
        console.log(scanner.scanTokens());
    }
}
exports.start_repl = start_repl;
function interpret(sourceFilePath) {
    let source = fs.readFileSync(sourceFilePath, "utf-8");
    let scanner = new lexer_1.Scanner(source);
    let tokens = scanner.scanTokens();
    console.log(tokens);
    if (hasError)
        return;
}
exports.interpret = interpret;
//# sourceMappingURL=lox.js.map