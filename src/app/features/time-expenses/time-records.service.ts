import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { apiRoutes } from '../../models/configuration/apiRoutes';
import { BaseStore } from '../../shared/services/base-store.service';

@Injectable()
export class TimeRecordsService extends BaseStore {

    constructor(protected _httpPassthrough: Http) {
        super(_httpPassthrough);
        this.init(apiRoutes.timeRecords);
    }

    public getLatest (): Promise<any> {
        return this.load();
    }

    get timeRecords$ () {
        return this._entity$.asObservable();
    }

}
