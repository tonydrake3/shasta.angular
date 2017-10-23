import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { apiRoutes } from '../shared/configuration/api-routes.configuration';
import { BaseStore } from '../../shared/services/base-store.service';
import { environment } from '../../../environments/environment';
import 'rxjs/add/operator/map';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class TimeRecordsService extends BaseStore {
    constructor(protected _httpPassthrough: Http) {
        super(_httpPassthrough);
        this.init(apiRoutes.timeRecordsFull);
    }

    public getLatest(): Promise<any> {
        return this.load();
    }

    get timeRecords$ () {
        return this._entity$.asObservable();
    }

    public timeReject(data: any): Promise<any> {
        this.init(apiRoutes.timeReject);
          return  super.addEntity(data);
    }

    public timeAppove(data: any): Promise<any> {
        this.init(apiRoutes.timeApprove);

        return super.addEntity(data);
    }

    public timeUpdate(data: any): any {
        this.init(apiRoutes.timeUpdate);
        const result = super.updateEntity(data);
        return result;
    }


    timeApprove_Observable(entity: any): Observable<any> {
        this._route = apiRoutes.timeApprove;
        const url = environment.apiUrl + (this._route ? this._route : '');
        return super.postData(url, entity);
      }
}
