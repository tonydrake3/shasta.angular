import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Http, Response, URLSearchParams} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../../../environments/environment';
import {weatherConfiguration} from '../../../models/configuration/weatherConfiguration';
import {BaseStore} from '../base-store.service';
import * as _ from 'lodash';

@Injectable()
export class WeatherService {

    _defaultWeatherDays = '5';
    _weather = new Subject();

    constructor(protected _http: Http) {}

    /******************************************************************************************************************
     * Public Methods
     ******************************************************************************************************************/

    get weather$ () {

        return this._weather.asObservable();
        // return this._entity$.asObservable();
    }

    getLatest () {

    }

    getWeather (coordinates): Promise<any> {

        const params = this.getUrlParams(coordinates);
        return new Promise((resolve, reject) => {

            this.getData(params)

                .subscribe(
                    // TODO: Look into function handlers here
                    data => {
                        // loading.dismiss();
                        this._weather.next(data);
                        resolve(data);
                    },

                    error => {
                        // TODO: Refactor for error handling.
                        // loading.dismiss();
                        reject(error);
                        if (error.status === 401) {

                            // this.authService.logout();

                        }
                        console.log('Could not load', error);
                    })
        });
    }

    /******************************************************************************************************************
     * Private Methods
     ******************************************************************************************************************/

    // ?key=&q={lat: 26.6222007, lng: -80.1282944}&format=json&num_of_days=5
    private getUrlParams (coord, numDays?: number): URLSearchParams {

        const params: URLSearchParams = new URLSearchParams();

        _.forOwn(weatherConfiguration, function(value, key) {

            params.set(key, value);
        });

        params.set('q', coord.lat + ',' + coord.lng);
        params.set('num_of_days', numDays ? numDays.toString() : this._defaultWeatherDays);

        return params;
    }

    private getData (params: URLSearchParams): Observable<any> {

        return this._http.get(environment.weatherUrl, { params: params })

            .map(this.processSuccess)
            .catch(this.processError);
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
