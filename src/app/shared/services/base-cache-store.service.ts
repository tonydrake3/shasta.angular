import { Http } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';

import { BaseHttpService } from './base-http.service';
import { environment } from '../../../environments/environment';

export class BaseCacheStore extends BaseHttpService {

    private _route: string;

    _entity$ = new BehaviorSubject(null);

    constructor(protected _httpPassthrough: Http) {

        super(_httpPassthrough);
    }

    /******************************************************************************************************************
     * Protected Methods
     ******************************************************************************************************************/

    protected init (url?: string) {

        this._route = url;

        if (!this._entity$.value) {

            this.load();
        }
    }

    protected load (): Promise<any> {

        // var loading = this.loadingCtrl.create();
        // loading.present();
        const url = environment.apiUrl + (this._route ? this._route : '');

        return new Promise((resolve, reject) => {

            this.get(url)

                .subscribe(

                    // TODO: Look into function handlers here
                    data => {
                        // loading.dismiss();
                        this._entity$.next(data);
                        resolve(data);
                    },

                    error => {
                        // TODO: Refactor for error handling.
                        // loading.dismiss();
                        reject(error);
                        if (error.status === 401) {

                            // this.authService.logout();

                        }
                        console.log('Could not load', this._route, error);
                    })

        });
    }
}

