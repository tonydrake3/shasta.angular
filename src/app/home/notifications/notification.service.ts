import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

import {apiRoutes} from '../shared/configuration/api-routes.configuration';
import {BaseHttpService} from '../../shared/services/base-http.service';

import {environment} from '../../../environments/environment';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class NotificationService extends BaseHttpService {

    // Private
    private static readonly pollingPeriod = 60000;
    private _notifications$ = new BehaviorSubject(null);

    constructor(protected _httpPassthrough: Http) {

        super(_httpPassthrough);
    }

    public getLatest () {

        this.pollEndpoint();
    }

    get notifications$ () {

        return this._notifications$.asObservable();
    }

    /******************************************************************************************************************
     * Private Methods
     ******************************************************************************************************************/

    private load (): Promise<any> {

        const url = environment.apiUrl + apiRoutes.notifications;

        return new Promise((resolve, reject) => {

            this.get(url)

                .subscribe(

                    // TODO: Look into function handlers here
                    (data) => {

                        // console.log('NotificationService load', data);
                        this._notifications$.next(data);
                        resolve(data);
                    },

                    error => {
                        // TODO: Refactor for error handling.

                        reject(error);
                        if (error.status === 401) {

                            // this.authService.logout();

                        }
                    })

        });
    }

    private pollEndpoint () {

        setInterval(() => {
            this.load();
        }, this.pollingPeriod)
    }

}
