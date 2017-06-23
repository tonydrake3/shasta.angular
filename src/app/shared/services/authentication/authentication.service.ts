import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { BaseHttpService } from '../base-http.service';
import { AuthorizationService } from '../authorization/authorization.service';
import { environment } from '../../../../environments/environment';
import { apiRoutes } from '../../../models/configuration/apiRoutes';

@Injectable ()
export class AuthenticationService extends BaseHttpService {

    constructor(private _httpPassthrough: Http, private _authorizationService: AuthorizationService) {
        super(_httpPassthrough);
    }

    login (username: string, password: string) {

        const url = environment.apiUrl + apiRoutes.authentication;
        const payload = {
          grant_type: 'password',
          username : username,
          password : password
        };

        return super.postForm(url, payload);

    }

    isLoggedIn (): boolean {

        const authenticationData = JSON.parse(sessionStorage.getItem('authentication'));

        // console.log("AuthData", authenticationData);
        if (authenticationData && authenticationData.access_token) return true;

        return false;

    }

    logout () {

        if (sessionStorage.getItem('authentication')) {

            sessionStorage.clear();
        }

    }

    getToken (): string {

        const authenticationData = JSON.parse(sessionStorage.getItem('authentication'));

        // console.log("AuthData", authenticationData);
        if (authenticationData && authenticationData.access_token) return authenticationData.access_token;

        return null;

    }
}
