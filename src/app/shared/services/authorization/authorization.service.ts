import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { BaseHttpService } from '../base-http.service';
import { AuthorizationResponse } from '../../../models/response/AuthorizationResponse';
import {apiRoutes} from '../../../models/configuration/apiRoutes';
import {environment} from '../../../../environments/environment';

@Injectable ()
export class AuthorizationService extends BaseHttpService {

    constructor(private _httpPassthrough: Http) {
        super(_httpPassthrough);
    }

    getPermissions() {

        const url = environment.apiUrl + apiRoutes.authorization;

        return super.get(url)
            .subscribe(
                data => {
                    console.log('getPermissions response', <AuthorizationResponse> data);
                },
                error => {
                    console.log('Error', error);
                }
            );
    }
}
