export class AppError extends Error {
    code: number;
    error: string;

    constructor(code: number, error: string, message: string) {
        super(message);
        this.code = code;
        this.error = error;

        Object.setPrototypeOf(this, AppError.prototype)
    }


}