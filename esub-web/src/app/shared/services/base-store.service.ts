import { Http } from '@angular/http';
import { Subject} from 'rxjs/Rx';
import {BaseHttpService} from './base-http.service';
import {AuthenticationService} from './authentication/authentication.service';
import {environment} from '../../../environments/environment';

export class BaseStore extends BaseHttpService {

    protected options: {
        collection: string,
        model: string,
        route: string
    };

    protected _subject$: Subject<Array<any>>;
    protected dataStore: {};

    constructor(protected _httpPassthrough: Http, public authService: AuthenticationService) {

        super(_httpPassthrough);

    }

    init(options) {

        this.options = options;
        this.dataStore = {};
        this.dataStore[options.collection] = [];
        this._subject$ = <Subject<Array<any>>>new Subject();

    }

    load() {

        // var loading = this.loadingCtrl.create();
        // loading.present();
        const url = environment.apiUrl + this.options.route;

        super.get(url)
            .map(response => response.json()).subscribe(

                data => {
                    // loading.dismiss();
                    this.dataStore[this.options.collection] = data;
                    this._subject$.next(this.dataStore[this.options.collection]);
                },

                error => {
                    // loading.dismiss();
                    if (error.status === 401) {

                        this.authService.logout();

                    }
                    console.log('Could not load', this.options.collection, error);
                })
    }

    protected addEntity(entity: any): Promise<any> {

        const url = environment.apiUrl + this.options.route;

        return new Promise((resolve, reject) => {

            super.post(url, entity).map(response => response.json()).subscribe(
                data => {
                    this.load();
                    resolve(data);
                },
                err => {
                    reject(err);
                });
        });
    }

    protected updateEntity(entity: any): Promise<any> {

        const url = environment.apiUrl + this.options.route + '/' + entity._id;

        return new Promise((resolve, reject) => {

            super.put(url, entity).map(response => response.json()).subscribe(
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

        const url = environment.apiUrl + this.options.route + '/' + entity._id;

        return new Promise((resolve, reject) => {

            super.delete(url).subscribe(

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
