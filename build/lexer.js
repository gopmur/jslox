"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Scanner = void 0;
const token_1 = require("./token");
const lox_1 = require("./lox");
class Scanner {
    constructor(source) {
        this.source = source;
        this.tokens = [];
        this.start = 0;
        this.current = 0;
        this.line = 1;
    }
    isAtEnd() {
        return this.current >= this.source.length;
    }
    scanTokens() {
        while (!this.isAtEnd()) {
            this.start = this.current;
            this.scanToken();
        }
        this.tokens.push(new token_1.Token(token_1.TokenType.EOF, "", this.line, null));
        return this.tokens;
    }
    scanToken() {
        const char = this.advance();
        switch (char) {
            case "/":
                if (this.match("/")) {
                    while (!this.isAtEnd() && this.peek() != "\n") {
                        this.advance();
                    }
                }
                else
                    this.addToken(token_1.TokenType.SLASH);
                break;
            case "(":
                this.addToken(token_1.TokenType.LEFT_PAREN);
                break;
            case ")":
                this.addToken(token_1.TokenType.RIGHT_PAREN);
                break;
            case "{":
                this.addToken(token_1.TokenType.LEFT_BRACE);
                break;
            case "}":
                this.addToken(token_1.TokenType.RIGHT_BRACE);
                break;
            case ",":
                this.addToken(token_1.TokenType.COMMA);
                break;
            case ".":
                this.addToken(token_1.TokenType.DOT);
                break;
            case "-":
                this.addToken(token_1.TokenType.MINUS);
                break;
            case "+":
                this.addToken(token_1.TokenType.PLUS);
                break;
            case ";":
                this.addToken(token_1.TokenType.SEMICOLON);
                break;
            case "*":
                this.addToken(token_1.TokenType.STAR);
                break;
            case "!":
                this.addToken(this.match("=") ? token_1.TokenType.BANG_EQUAL : token_1.TokenType.BANG);
                break;
            case "=":
                this.addToken(this.match("=") ? token_1.TokenType.EQUAL_EQUAL : token_1.TokenType.EQUAL);
                break;
            case "<":
                this.addToken(this.match("=") ? token_1.TokenType.LESS_EQUAL : token_1.TokenType.LESS);
                break;
            case ">":
                this.addToken(this.match("=")
                    ? token_1.TokenType.GREATER_EQUAL
                    : token_1.TokenType.GREATER);
                break;
            case " ":
            case "\r":
            case "\t":
                break;
            case "\n":
                this.line++;
                break;
            case '"':
                this.scanString();
                break;
            default:
                if (Scanner.isDigit(char)) {
                    this.scanNumber();
                }
                else if (Scanner.isAlphabet(char)) {
                    this.scanIdentifier();
                }
                else {
                    (0, lox_1.error)(this.line, "Unexpected character.");
                }
                break;
        }
    }
    scanIdentifier() {
        var _a;
        while (Scanner.isAlphanumerical(this.peek()))
            this.advance();
        // @ts-ignore
        this.addToken((_a = token_1.keywordsMap[this.source.substring(this.start, this.current)]) !== null && _a !== void 0 ? _a : token_1.TokenType.IDENTIFIER);
    }
    advance() {
        return this.source[this.current++];
    }
    peek() {
        return this.isAtEnd() ? "\0" : this.source.charAt(this.current);
    }
    match(char) {
        if (this.isAtEnd() || this.source.charAt(this.current) != char)
            return false;
        this.current++;
        return true;
    }
    addToken(tokenType, literal) {
        if (literal == undefined)
            literal = null;
        this.tokens.push(new token_1.Token(tokenType, this.source.substring(this.start, this.current), this.line, literal));
    }
    scanString() {
        let stringValue = "";
        let char = this.advance();
        while (char != '"') {
            stringValue += char;
            if (this.peek() == "\n" || this.isAtEnd()) {
                (0, lox_1.error)(this.line, 'Missing "');
                break;
            }
            char = this.advance();
        }
        this.addToken(token_1.TokenType.STRING, stringValue);
    }
    static isDigit(char) {
        return (char.length == 1 &&
            "9".charCodeAt(0) >= char.charCodeAt(0) &&
            char.charCodeAt(0) >= "0".charCodeAt(0));
    }
    peekNext() {
        if (this.current + 1 >= this.source.length)
            return "\0";
        return this.source[this.current + 1];
    }
    scanNumber() {
        while (Scanner.isDigit(this.peek()))
            this.advance();
        if (this.peek() == "." && Scanner.isDigit(this.peekNext()))
            this.advance();
        while (Scanner.isDigit(this.peek()))
            this.advance();
        this.addToken(token_1.TokenType.NUMBER, Number(this.source.substring(this.start, this.current)));
    }
    static isAlphabet(char) {
        let charCode = char.charCodeAt(0);
        return ((charCode >= "a".charCodeAt(0) && charCode <= "z".charCodeAt(0)) ||
            (charCode >= "A".charCodeAt(0) && charCode <= "Z".charCodeAt(0)) ||
            charCode == "_".charCodeAt(0));
    }
    static isAlphanumerical(char) {
        return Scanner.isAlphabet(char) || Scanner.isDigit(char);
    }
}
exports.Scanner = Scanner;
//# sourceMappingURL=lexer.js.map