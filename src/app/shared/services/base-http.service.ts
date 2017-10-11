import { Injectable } from '@angular/core';
import { Http , Headers, URLSearchParams, Response, RequestOptions} from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable ()
export class BaseHttpService {

    _queryParams: URLSearchParams;

    constructor (private _http: Http) {}

    /******************************************************************************************************************
     * Public Methods
     ******************************************************************************************************************/

    get (url: string): Observable<any> {

        const headers = new Headers();
        this.addHeaders(headers);
        this.addJsonHeaders(headers);

        const options = new RequestOptions({headers : headers});

        if (this._queryParams) {

            options.params = this._queryParams;
        }

        return this._http.get(url, options)
            .map(this.processSuccess)
            .catch(this.processError);
    }

    post (url: string, payload: any): Observable<any> {

        const headers = new Headers();
        this.addHeaders(headers);
        this.addJsonHeaders(headers);

        const options = new RequestOptions({headers : headers});

        return this._http.post(url, payload, options)
            .map(this.processSuccess)
            .catch(this.processError);
    }

    postForm (url: string, data: any): Observable<any> {

        const headers = new Headers();
        this.addHeaders(headers);
        this.addFormHeaders(headers);

        const options = new RequestOptions({headers : headers, withCredentials: true});

        // Convert form JSON to URL Search Params for formdata
        const params = new URLSearchParams();
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                params.set(key, data[key]);
            }
        }

        return this._http.post(url, params, options)
            .map(this.processSuccess)
            .catch(this.processError);

    }

    put (url: string, payload: any): Observable<any> {

        const headers = new Headers();
        this.addHeaders(headers);
        this.addJsonHeaders(headers);

        return this._http.put(url, payload, {headers: headers})
            .map(this.processSuccess)
            .catch(this.processError);
    }

    delete (url: string) {

        const headers = new Headers();
        this.addHeaders(headers);

        return this._http.delete(url, {headers: headers});
    }

    /******************************************************************************************************************
     * Protected Methods
     ******************************************************************************************************************/

    protected addHeaders(headers: Headers) {

        const authenticationData = JSON.parse(sessionStorage.getItem('authentication'));
        const tenant = JSON.parse(sessionStorage.getItem('tenant'));

        if (authenticationData && authenticationData.access_token) {

            headers.append('Authorization', 'Bearer ' + authenticationData.access_token);
        }

        if (tenant) {

            headers.append('X-Esub-Tenant', tenant);
        }
    }

    /******************************************************************************************************************
     * Private Methods
     ******************************************************************************************************************/

    private addFormHeaders (headers: Headers) {

        // TODO : Consider config for this?
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        headers.append('Accept', 'application/json');
    }

    private addJsonHeaders (headers: Headers) {

        // TODO : Consider config for this?
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
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
            errMsg = body.error_description ? body.error_description : err;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        return Observable.throw(errMsg);
    }
}
