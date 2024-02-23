import { Scanner } from "./lexer";
import * as fs from "fs";

let hasError = false;

export function error(line: number, message: string): void {
    hasError = true;
    report(line, "", message);
}

function report(line: number, where: string, message: string): void {
    console.error(`[line ${line}] Error${where}: ${message}`);
}

export function interpret(sourceFilePath: string): void {
    let source = fs.readFileSync(sourceFilePath, "utf-8");
    let scanner = new Scanner(source);
    let tokens =  scanner.scanTokens();
    console.log(tokens);
    if (hasError) return;
}