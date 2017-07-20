import {Injectable} from '@angular/core';
import {BaseStore} from '../../shared/services/base-store.service';
import {Http} from '@angular/http';
import {apiRoutes} from '../shared/configuration/api-routes.configuration';

@Injectable()
export class NotificationService extends BaseStore {

    constructor(protected _httpPassthrough: Http) {

        super(_httpPassthrough);
        this.init(apiRoutes.notifications);
    }

    public getLatest (): Promise<any> {

        return this.load();
    }

    get notifications$ () {

        return this._entity$.asObservable();
    }
}
