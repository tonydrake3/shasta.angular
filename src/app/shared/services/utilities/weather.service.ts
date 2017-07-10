import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Http, Response, URLSearchParams} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../../../environments/environment';


@Injectable()
export class WeatherService {

    _weather = new Subject();
    _defaultWeatherDays = '5';

    constructor (private _http: Http) {}

    /******************************************************************************************************************
     * Public Methods
     ******************************************************************************************************************/

    get weather$ () {

        return this._weather.asObservable();
    }

    setWeather (weather) {

        this._weather.next(weather);
    }

    getWeather (coordinates): Observable<any> {

        console.log(coordinates);
        const params = this.getUrlParams(coordinates);
        console.log(params);

        return this._http.get(environment.weatherUrl, { params: params })
            .map(this.processSuccess)
            .catch(this.processError);
    }

    /******************************************************************************************************************
     * Private Methods
     ******************************************************************************************************************/

    // ?key=&q={lat: 26.6222007, lng: -80.1282944}&format=json&num_of_days=5
    private getUrlParams (coord, numDays?: number) {

        const params: URLSearchParams = new URLSearchParams();
        params.set('key', environment.weatherApiKey);
        params.set('q', coord.lat + ',' + coord.lng);
        params.set('format', 'json');
        params.set('num_of_days', numDays ? numDays.toString() : this._defaultWeatherDays);
        params.set('includelocation', 'yes');
        params.set('showlocaltime', 'yes');
        params.set('tp', '24');
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
