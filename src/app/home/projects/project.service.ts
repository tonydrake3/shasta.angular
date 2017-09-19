import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { apiRoutes } from '../shared/configuration/api-routes.configuration';
import { BaseStore } from '../../shared/services/base-store.service';

@Injectable()
export class ProjectService extends BaseStore {

    constructor(protected _httpPassthrough: Http) {

        super(_httpPassthrough);
        this.init(apiRoutes.projects);
    }

    public getLatest (): Promise<any> {

        return this.load();
    }

    get projects$ () {

        return this._entity$.asObservable();
    }

    public getFiltered (filter: string): Promise<any> {

        // Re-initializing the store config to use filtering.
        this.init(apiRoutes.projects + '?query=' + filter);
        return this.load();
    }

}
