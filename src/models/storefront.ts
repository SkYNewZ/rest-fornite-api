import { catalogEntry } from "./catalogEntry";

export class storeFront {

    private _name: string;
    private _catalogEntries: catalogEntry[];

    /**
     * Constructor
     * @param catalogEntries 
     * @param name 
     */
	constructor(catalogEntries: catalogEntry[], name: string) {
        this.name = name;
        this._catalogEntries = catalogEntries;
	}

    public set name(value: string) {
        this._name = value;
    }

    public set catalogEntries(value: catalogEntry[]) {
        this._catalogEntries = value;
    }

    public get name(): string {
        return this._name;
    }

    public get catalogEntries(): catalogEntry[] {
        return this._catalogEntries;
    }
}