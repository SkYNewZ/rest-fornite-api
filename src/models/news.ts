export class FortniteNews {

    private _common: Object;
    private _br: { image: string, _type: string, title: string, body: string }[];
    private _loginmessage: Object;
    private _survivalmessage: Object;

    public get common(): Object {
        return this._common;
    }

    public get loginmessage(): Object {
        return this._loginmessage;
    }

    public get survivalmessage(): Object {
        return this._survivalmessage;
    }

    public get br(): { image: string, _type: string, title: string, body: string }[] {
        return this._br;
    }
}