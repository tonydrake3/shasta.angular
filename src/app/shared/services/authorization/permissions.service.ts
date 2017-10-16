import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

import {apiRoutes} from '../../../home/shared/configuration/api-routes.configuration';
import {BaseCacheStore} from '../base-cache-store.service';
import {Permissions} from '../../../models/domain/Permissions';

@Injectable()
export class PermissionsService extends BaseCacheStore {

    constructor(protected _httpPassthrough: Http) {

        super(_httpPassthrough);
    }

    get permissions$ () {

        return this._entity$.asObservable();
    }

    public getLatest () {

        this.init(apiRoutes.permissions, Permissions, 'Permissions');
    }
}
