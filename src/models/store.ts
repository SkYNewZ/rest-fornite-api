import { storeFront } from "./storefront";

export class FortniteStore {

    private _refreshIntervalHrs: number;
    private _dailyPurchaseHrs: number;
	private _expiration: string;
	private _storefronts: storeFront[];

	public set refreshIntervalHrs(value: number) {
		this._refreshIntervalHrs = value;
	}

	public set dailyPurchaseHrs(value: number) {
		this._dailyPurchaseHrs = value;
	}

	public set expiration(value: string) {
		this._expiration = value;
	}

	public set storefronts(value: storeFront[]) {
		this._storefronts = value;
	}

	public get refreshIntervalHrs(): number {
		return this._refreshIntervalHrs;
	}

	public get dailyPurchaseHrs(): number {
		return this._dailyPurchaseHrs;
	}

	public get expiration(): string {
		return this._expiration;
	}

	public get storefronts(): storeFront[] {
		return this._storefronts;
	}
}