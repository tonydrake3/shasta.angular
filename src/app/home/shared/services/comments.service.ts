import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { BaseHttpService } from '../../../shared/services/base-http.service';
import { Observable } from 'rxjs/Observable';
import { apiRoutes } from '../configuration/api-routes.configuration';
import { environment } from '../../../../environments/environment';
@Injectable()
export class CommentsService extends BaseHttpService {
  _route: string;
  constructor(protected _httpPassthrough: Http) {
    super(_httpPassthrough);
  }

  public addComments(entity: any): Observable<any> {
    this._route = apiRoutes.timeUpdate + '/' + entity.id;
    const url = environment.apiUrl + (this._route ? this._route : '');
    return super.putData(url, entity);
  }
}
