import { FortnitePrice } from "./price";

export class catalogEntry {

    private _devName: string;
    private _offerId: string;
    private _prices: FortnitePrice[];

    /**
     * Constructor
     * @param devName
     * @param offerId 
     * @param prices 
     */
    constructor(devName: string, offerId: string, prices: FortnitePrice[]) {
        this._devName = devName;
        this._offerId = offerId;
        this._prices = prices;
    }

    public get devName(): string {
        return this._devName;
    }

    public get offerId(): string {
        return this._offerId;
    }

    public get prices(): FortnitePrice[] {
        return this._prices;
    }
}