import { Literal, Token, TokenType, keywordsMap } from "./token";
import { error } from "./lox";

export class Scanner {
	private readonly tokens: Token[];
	private readonly source: string;

	private start: number;
	private current: number;
	private line: number;

	constructor(source: string) {
		this.source = source;
		this.tokens = [];
		this.start = 0;
		this.current = 0;
		this.line = 1;
	}

	private isAtEnd(): boolean {
		return this.current >= this.source.length;
	}

	scanTokens(): Token[] {
		while (!this.isAtEnd()) {
			this.start = this.current;
			this.scanToken();
		}

		this.tokens.push(new Token(TokenType.EOF, "", this.line, null));

		return this.tokens;
	}

	private scanToken(): void {
		const char = this.advance();

		switch (char) {
			case "/":
				if (this.match("/")) {
					while (!this.isAtEnd() && this.peek() != "\n") {
						this.advance();
					}
				} else this.addToken(TokenType.SLASH);
				break;
			case "(":
				this.addToken(TokenType.LEFT_PAREN);
				break;
			case ")":
				this.addToken(TokenType.RIGHT_PAREN);
				break;
			case "{":
				this.addToken(TokenType.LEFT_BRACE);
				break;
			case "}":
				this.addToken(TokenType.RIGHT_BRACE);
				break;
			case ",":
				this.addToken(TokenType.COMMA);
				break;
			case ".":
				this.addToken(TokenType.DOT);
				break;
			case "-":
				this.addToken(TokenType.MINUS);
				break;
			case "+":
				this.addToken(TokenType.PLUS);
				break;
			case ";":
				this.addToken(TokenType.SEMICOLON);
				break;
			case "*":
				this.addToken(TokenType.STAR);
				break;
			case "!":
				this.addToken(
					this.match("=") ? TokenType.BANG_EQUAL : TokenType.BANG,
				);
				break;
			case "=":
				this.addToken(
					this.match("=") ? TokenType.EQUAL_EQUAL : TokenType.EQUAL,
				);
				break;
			case "<":
				this.addToken(
					this.match("=") ? TokenType.LESS_EQUAL : TokenType.LESS,
				);
				break;
			case ">":
				this.addToken(
					this.match("=")
						? TokenType.GREATER_EQUAL
						: TokenType.GREATER,
				);
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
				} else if (Scanner.isAlphabet(char)) {
					this.scanIdentifier();
				} else {
					error(this.line, "Unexpected character.");
				}
				break;
		}
	}

	private scanIdentifier() {
		while (Scanner.isAlphanumerical(this.peek())) this.advance();
		// @ts-ignore
		this.addToken(keywordsMap[this.source.substring(this.start, this.current)] ?? TokenType.IDENTIFIER);
	}

	private advance(): string {
		return this.source[this.current++];
	}

	private peek(): string {
		return this.isAtEnd() ? "\0" : this.source.charAt(this.current);
	}

	private match(char: string): boolean {
		if (this.isAtEnd() || this.source.charAt(this.current) != char)
			return false;
		this.current++;
		return true;
	}

	private addToken(tokenType: TokenType, literal?: Literal) {
		if (literal == undefined) literal = null;
		this.tokens.push(
			new Token(
				tokenType,
				this.source.substring(this.start, this.current),
				this.line,
				literal,
			),
		);
	}

	private scanString(): void {
		let stringValue = "";
		let char = this.advance();

		while (char != '"') {
			stringValue += char;
			if (this.peek() == "\n" || this.isAtEnd()) {
				error(this.line, 'Missing "');
				break;
			}
			char = this.advance();
		}
		this.addToken(TokenType.STRING, stringValue);
	}

	private static isDigit(char: string): boolean {
		return (
			char.length == 1 &&
			"9".charCodeAt(0) >= char.charCodeAt(0) &&
			char.charCodeAt(0) >= "0".charCodeAt(0)
		);
	}

	private peekNext() {
		if (this.current + 1 >= this.source.length) return "\0";
		return this.source[this.current + 1];
	}

	private scanNumber(): void {
		while (Scanner.isDigit(this.peek())) this.advance();
		if (this.peek() == "." && Scanner.isDigit(this.peekNext()))
			this.advance();
		while (Scanner.isDigit(this.peek())) this.advance();

		this.addToken(
			TokenType.NUMBER,
			Number(this.source.substring(this.start, this.current)),
		);
	}

	private static isAlphabet(char: string): boolean {
		let charCode = char.charCodeAt(0);
		return (
			(charCode >= "a".charCodeAt(0) && charCode <= "z".charCodeAt(0)) ||
			(charCode >= "A".charCodeAt(0) && charCode <= "Z".charCodeAt(0)) ||
			charCode == "_".charCodeAt(0)
		);
	}

	private static isAlphanumerical(char: string): boolean {
		return Scanner.isAlphabet(char) || Scanner.isDigit(char);
	}
}
