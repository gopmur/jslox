export class Lox {
    static hasError = false;

    static error(line: number, message: string) {
        this.hasError = true;
        this.report(line, "", message);
    }
    
    static report(line: number, where: string, message: string) {
        console.error(`[line ${line}] Error${where}: ${message}`);
    }
}