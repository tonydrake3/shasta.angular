import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { apiRoutes } from '../../models/configuration/apiRoutes';
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

}
