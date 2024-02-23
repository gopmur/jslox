import { Literal, Token, TokenType } from "./token";
import { Lox } from "./lox";

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

		this.tokens.push({
			tokenType: TokenType.EOF,
			lexeme: "",
			line: this.line,
			literal: null,
		});

		return this.tokens;
	}

	private advance(): string {
		return this.source[this.current++];
	}

	private scanToken(): void {
		const char = this.advance();

		switch (char) {
			case "/":
				if (this.match("/")) {
                    while(!this.isAtEnd() && this.peek() != "\n") {
                        this.advance();
                    }
				}
                else this.addToken(TokenType.SLASH);
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

			default:
				Lox.error(this.line, "Unexpected character.");
				break;
		}
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
		this.tokens.push({
			tokenType: tokenType,
			lexeme: this.source.substring(this.start, this.current),
			line: this.line,
			literal: literal,
		});
	}
}
