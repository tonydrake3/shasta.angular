import { BaseHttpService } from './../../shared/services/base-http.service';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { apiRoutes } from '../shared/configuration/api-routes.configuration';

import { Subject } from 'rxjs/Rx';
import { environment } from '../../../environments/environment';
import 'rxjs/add/operator/map';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class TimeExpensesService extends BaseHttpService {
  _route: string;

  _entity$ = new Subject();

  constructor(protected _httpPassthrough: Http) {
    super(_httpPassthrough);
  }

  timeApprove(entity: any): Observable<any> {
    this._route = apiRoutes.timeApprove;
    const url = environment.apiUrl + (this._route ? this._route : '');
    return super.postData(url, entity);
  }

  timeReject(entity: any): Observable<any> {
    this._route = apiRoutes.timeReject;
    const url = environment.apiUrl + (this._route ? this._route : '');
    return super.postData(url, entity);
  }

  timeUpdate(entity: any): Observable<any> {
    this._route = apiRoutes.timeUpdate + '/' + entity.id;
    const url = environment.apiUrl + (this._route ? this._route : '');
    return super.putData(url, entity);
  }
}
