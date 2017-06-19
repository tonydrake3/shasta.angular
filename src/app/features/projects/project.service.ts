import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { apiRoutes } from '../../models/configuration/apiRoutes';
import { BaseStore } from '../../shared/services/base-store.service';
import {AuthenticationService} from '../../shared/services/authentication/authentication.service';

@Injectable()
export class ProjectService extends BaseStore {

    constructor(protected _httpPassthrough: Http, private _authenticationService: AuthenticationService) {

        super(_httpPassthrough);
        this.init(apiRoutes.projects);
    }

    get projects$ () {

        return this._entity$.asObservable();
    }

    // hasMultipleProjects (): Promise<any> {
    //
    //     return new Promise((resolve, reject) => {
    //
    //         this._entity$
    //             .subscribe(
    //                 (projects: any) => {
    //                     console.log('Projects', projects);
    //                     // resolve(projects['value'].count > 1);
    //                     resolve(true);
    //                 },
    //                 (error: any) => {
    //                     reject(false);
    //                     console.log(error);
    //                 }
    //             );
    //     });
    // }

}
