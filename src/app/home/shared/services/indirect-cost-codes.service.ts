import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { apiRoutes } from '../configuration/api-routes.configuration';
import { BaseStore } from '../../../shared/services/base-store.service';

@Injectable()
export class IndirectCostCodesService extends BaseStore {

    constructor(protected _httpPassthrough: Http) {

        super(_httpPassthrough);
        this.init(apiRoutes.projects);
    }

    public getLatest (): Promise<any> {

        return this.load();
    }

    get indirectCostCodes$ () {

        return this._entity$.asObservable();
    }
}
