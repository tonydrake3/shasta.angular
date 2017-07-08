import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { apiRoutes } from '../../../models/configuration/apiRoutes';
import { BaseStore } from '../../../shared/services/base-store.service';

@Injectable()
export class ProjectSummaryService extends BaseStore {

    constructor(protected _httpPassthrough: Http) {

        super(_httpPassthrough);
    }

    public config (id: string) {

        this.init(apiRoutes.projects + '/' + id);
    }

    public getLatest (): Promise<any> {

        return this.load();
    }

    get projectDetail$ () {

        return this._entity$.asObservable();
    }

}
