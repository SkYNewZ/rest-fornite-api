export class FortnitePrice {
    private _currencyType: string;
    private _currencySubType: string;
    private _regularPrice: number;
    private _finalPrice: number;
    private _saleExpiration: string;
    private _basePrice: number;

    /**
     * Constructor
     * @param currencyType 
     * @param currencySubType 
     * @param regularPrice 
     * @param finalPrice 
     * @param saleExpiration 
     * @param basePrice 
     */
    constructor(
        currencyType: string,
        currencySubType: string,
        regularPrice: number,
        finalPrice: number,
        saleExpiration: string,
        basePrice: number
    ) {
        this._basePrice = basePrice;
        this._currencySubType = currencySubType;
        this._currencyType = currencyType;
        this._saleExpiration = saleExpiration;
        this._finalPrice = finalPrice;
        this._regularPrice = regularPrice;
    }

    public get currencyType(): string {
        return this._currencyType;
    }

    public set currencyType(value: string) {
        this._currencyType = value;
    }


    public get finalPrice(): number {
        return this._finalPrice;
    }

    public set finalPrice(value: number) {
        this._finalPrice = value;
    }

    public get saleExpiration(): string {
        return this._saleExpiration;
    }

    public set saleExpiration(value: string) {
        this._saleExpiration = value;
    }

    public get basePrice(): number {
        return this._basePrice;
    }

    public set basePrice(value: number) {
        this._basePrice = value;
    }
    public get currencySubType(): string {
        return this._currencySubType;
    }

    public set currencySubType(value: string) {
        this._currencySubType = value;
    }

    public get regularPrice(): number {
        return this._regularPrice;
    }

    public set regularPrice(value: number) {
        this._regularPrice = value;
    }
}