import { Http } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';

import { BaseHttpService } from './base-http.service';
import { environment } from '../../../environments/environment';

export class BaseCacheStore extends BaseHttpService {

    private _route: string;
    private dataType: any;
    private propertyKey: string;

    protected _entity$ = new BehaviorSubject(null);

    constructor(protected _httpPassthrough: Http) {

        super(_httpPassthrough);
    }

    /******************************************************************************************************************
     * Protected Methods
     ******************************************************************************************************************/

    protected init (url?: string, dataType?: any, propertyKey?: string) {

        if (url) {

            this._route = url;
        }

        if (dataType) {

            this.dataType = dataType;
        }

        if (propertyKey) {

            this.propertyKey = propertyKey;
        }

        if (!this._entity$.value) {

            this.load();
        }
    }

    protected load (): Promise<any> {

        const url = environment.apiUrl + (this._route ? this._route : '');

        return new Promise((resolve, reject) => {

            this.get(url)
                .subscribe(

                    (data) => {

                        const payload = this.processResponse(data);

                        this._entity$.next(payload);
                        resolve(payload);
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

    private processResponse (data: any) {

        if (this.dataType && this.propertyKey) {

            return new this.dataType(data[this.propertyKey]);
        } else if (this.dataType) {

            return new this.dataType(data);
        } else {

            return data;
        }
    }
}

