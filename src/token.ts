class Identifier {}

export enum TokenType {
	// Single-character tokens.
	LEFT_PAREN,
	RIGHT_PAREN,
	LEFT_BRACE,
	RIGHT_BRACE,
	COMMA,
	DOT,
	MINUS,
	PLUS,
	SEMICOLON,
	SLASH,
	STAR,

	// One or two character tokens.
	BANG,
	BANG_EQUAL,
	EQUAL,
	EQUAL_EQUAL,
	GREATER,
	GREATER_EQUAL,
	LESS,
	LESS_EQUAL,

	// Literals.
	IDENTIFIER,
	STRING,
	NUMBER,

	// Keywords.
	AND,
	CLASS,
	ELSE,
	FALSE,
	FUN,
	FOR,
	IF,
	NIL,
	OR,
	PRINT,
	RETURN,
	SUPER,
	THIS,
	TRUE,
	VAR,
	WHILE,

	EOF,
}

export type Literal = string | number | Identifier | null;

export class Token {
	// TODO remove tokenTypeString for release
	readonly tokenTypeString: string;
	readonly tokenType: TokenType;
	readonly lexeme: string;
	readonly line: number;
	readonly literal: Literal;

	constructor(
		tokenType: TokenType,
		lexeme: string,
		line: number,
		literal: Literal,
	) {
		this.tokenType = tokenType;
		this.lexeme = lexeme;
		this.line = line;
		this.literal = literal;
		this.tokenTypeString = TokenType[tokenType];
	}

	public toString(): string {
		return `{type: ${TokenType[this.tokenType]}, lexeme: ${
			this.lexeme
		}, line: ${this.line}, literal ${this.literal}}`;
	}
}

export let keywordsMap = {
	and: TokenType.AND,
	class: TokenType.CLASS,
	else: TokenType.ELSE,
	false: TokenType.FALSE,
	for: TokenType.FOR,
	fun: TokenType.FUN,
	if: TokenType.IF,
	nil: TokenType.NIL,
	or: TokenType.OR,
	print: TokenType.PRINT,
	return: TokenType.RETURN,
	super: TokenType.SUPER,
	this: TokenType.THIS,
	true: TokenType.TRUE,
	var: TokenType.VAR,
	while: TokenType.WHILE,
};
