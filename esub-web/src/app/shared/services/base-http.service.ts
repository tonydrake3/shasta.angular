import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable ()
export class BaseHttpService {

    constructor (private _http: Http) {}

    addHeaders(headers: Headers) {

        const authenticationData = JSON.parse(sessionStorage.getItem('authentication'));

        // console.log("AuthData", authenticationData);
        if (authenticationData && authenticationData.access_token) {

            headers.append('Authorization', 'Bearer ' + authenticationData.access_token);
        }
        // TODO : Consider config for this?
        headers.append('X-Esub-Tenant', '1');
    }

    addFormHeaders (headers: Headers) {

        // TODO : Consider config for this?
        headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        headers.append('Accept', 'application/json');
    }

    get (url: string): Observable<any> {

        const headers = new Headers();
        this.addHeaders(headers);

        return this._http.get(url, {headers: headers})
                        .map(this.processSuccess)
                        .catch(this.processError);
    }

    post (url: string, payload: any): Observable<any> {

        const headers = new Headers();
        this.addHeaders(headers);

        return this._http.post(url, payload, {headers: headers})
                        .map(this.processSuccess)
                        .catch(this.processError);
    }

    postForm (url: string, data: any): Observable<any> {

        const headers = new Headers();
        this.addHeaders(headers);
        this.addFormHeaders(headers);

        // Convert form JSON to URL Search Params for formdata
        const params = new URLSearchParams();
        for (const key in data) {
           if (data.hasOwnProperty(key)) {
              params.set(key, data[key]);
            }
        }

        return this._http.post(url, params, {headers: headers})
                        .map(this.processSuccess)
                        .catch(this.processError);

    }

    put (url: string, payload: any): Observable<any> {

        const headers = new Headers();
        this.addHeaders(headers);

        return this._http.put(url, payload, {headers: headers})
                        .map(this.processSuccess)
                        .catch(this.processError);
    }

    delete (url: string) {

        const headers = new Headers();
        this.addHeaders(headers);

        return this._http.delete(url, {headers: headers});
    }


    private processSuccess (response: Response) {

        const body = response.json();
        return body.data || body;
    }

    private processError (error: Response | any) {

        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

}
