import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import * as _ from 'lodash';

import {apiRoutes} from '../shared/configuration/api-routes.configuration';
import {BaseHttpService} from '../../shared/services/base-http.service';
import {environment} from '../../../environments/environment';
import {EsubNotification} from '../../models/domain/EsubNotification';

@Injectable()
export class NotificationService extends BaseHttpService {

    // Private
    private readonly pollingPeriod = 15000;
    private _notifications$ = new BehaviorSubject<Array<EsubNotification>>(null);
    private interval;

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
     * Public Methods
     ******************************************************************************************************************/
    public stopPolling () {

        if (this.interval) {
            clearInterval(this.interval);
        }
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
                        this._notifications$.next(this.castNotifications(data));
                        resolve(this.castNotifications(data));
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

        this.interval = setInterval(() => {

            if (JSON.parse(sessionStorage.getItem('tenant'))) {
                this.load();
            }
        }, this.pollingPeriod)
    }

    private castNotifications (jsonArray): Array<EsubNotification> {

        const esubNotificationArray = [];

        _.forEach(jsonArray, (item) => {

            esubNotificationArray.push(new EsubNotification(item));
        });

        return esubNotificationArray;
    }
}
