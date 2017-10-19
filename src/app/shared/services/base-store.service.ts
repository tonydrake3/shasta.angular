import { Http } from '@angular/http';
import { Subject} from 'rxjs/Rx';
import { BaseHttpService } from './base-http.service';
import { environment } from '../../../environments/environment';
import 'rxjs/add/operator/map';
import {Identifiable} from '../../models/Identifiable';

export class BaseStore extends BaseHttpService {

    private _route: string;
    private _isLoadDisabled: boolean;

    protected _entity$ = new Subject();

    constructor(protected _httpPassthrough: Http) {

        super(_httpPassthrough);
    }

    /******************************************************************************************************************
     * Protected Methods
     ******************************************************************************************************************/

    protected init (url?: string, disableLoad?: boolean) {

        this._route = url;
        this._isLoadDisabled = disableLoad;
    }

    protected load (id?: string): Promise<any> {

        // var loading = this.loadingCtrl.create();
        // loading.present();
        let url = environment.apiUrl + (this._route ? this._route : '');

        if (id) { url += '/' + id }

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

    protected addEntity(entity: any): Promise<any> {

        const url = environment.apiUrl + (this._route ? this._route : '');

        return new Promise((resolve, reject) => {

            this.post(url, entity)

                .subscribe(

                    data => {
                        if (!this._isLoadDisabled) {

                            this.load();
                        }
                        resolve(data);
                    },
                    err => {
                        reject(err);
                    });
        });
    }

    protected updateEntity(entity: Identifiable): Promise<any> {

        const url = environment.apiUrl + (this._route ? this._route : '');

        return new Promise((resolve, reject) => {

            this.put(url + '/' + entity.Id, entity)

                .subscribe(
                    data => {
                        if (!this._isLoadDisabled) {

                            this.load();
                        }
                        resolve(data);
                    },
                    err => {
                        reject(err);
                    });
        });
    }

    protected deleteEntity(entity: any): Promise<any> {

        const url = environment.apiUrl + (this._route ? this._route : '');

        return new Promise((resolve, reject) => {

            this.delete(url + '/' + entity.id)

                .subscribe(

                    data => {
                        if (!this._isLoadDisabled) {

                            this.load();
                        }
                        resolve(data);
                    },
                    err => {
                        reject(err);
                    });
        });
    }

}
