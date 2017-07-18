import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { apiRoutes } from '../../../models/configuration/apiRoutes';
import { BaseStore } from '../../../shared/services/base-store.service';

@Injectable()
export class ProjectSummaryService extends BaseStore {

    private _id;

    constructor(protected _httpPassthrough: Http) {

        super(_httpPassthrough);
    }

    public config (id: string) {

        this._id = id;
        this.init(apiRoutes.projects + '/' + this._id);
    }

    public getLatest (): Promise<any> {

        if (this._id) {

            return this.load();
        }
    }

    get projectDetail$ () {

        return this._entity$.asObservable();
    }

}
