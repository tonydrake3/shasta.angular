import { Http } from '@angular/http';
import { Subject} from 'rxjs/Rx';
import { BaseHttpService } from './base-http.service';
import { AuthenticationService } from './authentication/authentication.service';
import { environment } from '../../../environments/environment';

export class BaseStore extends BaseHttpService {

    _url: string;

    _entity$ = new Subject();

    constructor(protected _httpPassthrough: Http) {

        super(_httpPassthrough);

    }

    init(url: string) {

        this._url = url;
    }

    load() {

        // var loading = this.loadingCtrl.create();
        // loading.present();
        const url = environment.apiUrl + this._url;

        super.get(url)

            .map(response => response.json())
            .subscribe(

                data => {
                    // loading.dismiss();
                    this._entity$.next(data);
                },

                error => {
                    // loading.dismiss();
                    if (error.status === 401) {

                        // this.authService.logout();

                    }
                    console.log('Could not load', this._url, error);
                })
    }


    getEntity() {

        return this._entity$;
    }

    addEntity(entity: any): Promise<any> {

        return new Promise((resolve, reject) => {

            super.post(this._url, entity)

                .map(response => response.json())
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

            super.put(this._url + '/' + entity.id, entity)

                .map(response => response.json())
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

            super.delete(this._url + '/' + entity.id)

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
