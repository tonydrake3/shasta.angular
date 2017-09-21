import {Injectable} from '@angular/core';
import {BaseStore} from '../../../shared/services/base-store.service';
import {Http} from '@angular/http';
import {apiRoutes} from '../configuration/api-routes.configuration';

@Injectable()
export class TimeSettingsService extends BaseStore {

    constructor(protected _httpPassthrough: Http) {

        super(_httpPassthrough);
        this.init(apiRoutes.timeSettings);
    }

    public getLatest (): Promise<any> {

        return this.load();
    }

    get timeSettings$ () {

        return this._entity$.asObservable();
    }
}
