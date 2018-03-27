export class CustomError {
    private _code: number;
    private _message: string;

    constructor(code: number, message: string) {
        this._code = code;
        this._message = message
	}

	public get code(): number {
		return this._code;
	}

	public set code(value: number) {
		this._code = value;
	}

	public get message(): string {
		return this._message;
	}

	public set message(value: string) {
		this._message = value;
	}
}