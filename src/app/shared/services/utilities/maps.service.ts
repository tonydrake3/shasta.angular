import { Injectable } from '@angular/core';
import {Http, RequestOptions, URLSearchParams, Response } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../../../environments/environment';
import {externalApiRoutes} from '../../../models/configuration/apiRoutes';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class MapsService {

    private _addressString: string;
    private _address = new Subject();
    private _location = new Subject();

    constructor (private _http: Http) {}

    /******************************************************************************************************************
     * Public Methods
     ******************************************************************************************************************/

    get address$ () {

        return this._address.asObservable();
    }

    get location$ () {

        return this._location.asObservable();
    }

    getLatest () {

    }

    setAddress (address: string) {

        this._address.next(address);
    }

    setLocation (location) {

        this._location.next(location);
    }

    getLocation (address: string): Observable<any> {

        if (address) {

            const params = this.getUrlParams(address);

            return this._http.get(environment.mapsUrl + externalApiRoutes.geocode, { params: params })
                .map(this.processSuccess)
                .catch(this.processError);
        }
    }

    /******************************************************************************************************************
     * Private Methods
     ******************************************************************************************************************/

    private getUrlParams (address: string) {

        const params: URLSearchParams = new URLSearchParams();
        params.set('key', environment.mapsApiKey);
        params.set('address', address);
        return params;
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
            errMsg = body.error_description ? body.error_description : `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        return Observable.throw(errMsg);
    }
}
