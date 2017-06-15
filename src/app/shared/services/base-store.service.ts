import { Http } from '@angular/http';
import { Subject} from 'rxjs/Rx';
import { BaseHttpService } from './base-http.service';
import { environment } from '../../../environments/environment';
import 'rxjs/add/operator/map';

export class BaseStore extends BaseHttpService {

    _route: string;

    _entity$ = new Subject();

    constructor(protected _httpPassthrough: Http) {

        super(_httpPassthrough);

    }

    init(url: string) {

        this._route = url;
        this.load();
    }

    load() {

        // var loading = this.loadingCtrl.create();
        // loading.present();
        const url = environment.apiUrl + this._route;

        super.get(url)

            .subscribe(

                // TODO: Look into function handlers here
                data => {
                    // loading.dismiss();
                    this._entity$.next(data);
                },

                error => {
                    // TODO: Refactor for error handling.
                    // loading.dismiss();
                    if (error.status === 401) {

                        // this.authService.logout();

                    }
                    console.log('Could not load', this._route, error);
                })
    }

    addEntity(entity: any): Promise<any> {

        return new Promise((resolve, reject) => {

            super.post(this._route, entity)

                .subscribe(

                    data => {
                        this.load();
                        resolve(data);
                    },
                    err => {
                        reject(err);
                    });
        });
    }

    updateEntity(entity: any): Promise<any> {

        return new Promise((resolve, reject) => {

            super.put(this._route + '/' + entity.id, entity)

                .subscribe(
                    data => {
                        this.load();
                        resolve(data);
                    },
                    err => {
                        reject(err);
                    });
        });
    }

    deleteEntity(entity: any): Promise<any> {

        return new Promise((resolve, reject) => {

            super.delete(this._route + '/' + entity.id)

                .subscribe(

                    data => {
                        this.load();
                        resolve(data);
                    },
                    err => {
                        reject(err);
                    });
        });
    }

}
