import { FortniteStats } from './stats'
import { FortniteUser } from './user'

export class UserStats {

    private _group: FortniteStats;
    private _duo: FortniteStats;
    private _squad: FortniteStats;
    private _info: FortniteUser;
    private _lifetimeStats: FortniteStats;

    public get group(): FortniteStats {
        return this._group;
    }

    public get duo(): FortniteStats {
        return this._duo;
    }

    public get squad(): FortniteStats {
        return this._squad;
    }

    public get info(): FortniteUser {
        return this._info;
    }

    public get lifetimeStats(): FortniteStats {
        return this._lifetimeStats;
    }
}