export class FortniteUser {
    private _id: number;
    private _displayName: string;
    private _platform: string;

    /**
     * Constructor
     * @param platform
     */
    constructor(platform: string) {
        this._platform = platform;
    }

    public get id(): number {
        return this._id;
    }

    public get displayName(): string {
        return this._displayName;
    }

    public get platform(): string {
        return this._platform;
    }

    public set platform(value: string) {
        this._platform = value;
    }
}