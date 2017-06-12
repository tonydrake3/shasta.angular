import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { BaseHttpService } from "../base-http.service";
import { AuthenticationResponse } from "../../models/response/authenticationResponse";
import { AuthorizationService } from "../authorization/authorization.service";

@Injectable ()
export class AuthenticationService extends BaseHttpService {

    constructor(private _httpPassthrough: Http, private _authorizationService: AuthorizationService) {
        super(_httpPassthrough);
    }

    login (username: string, password: string) {

        //TODO: Replace with Config Service call to build URL
        let url = 'http://api.sandbox.shasta.esubonline.com/Identity/Token';
        let payload = {
          grant_type: 'password',
          username : username,
          password : password
        };

        return super.postForm(url, payload);
    }

    isLoggedIn (): boolean {

        let authenticationData = JSON.parse(sessionStorage.getItem('authentication'));

        // console.log("AuthData", authenticationData);
        if(authenticationData && authenticationData.access_token) return true;

        return false;

    }

    getToken (): string {

        let authenticationData = JSON.parse(sessionStorage.getItem('authentication'));

        // console.log("AuthData", authenticationData);
        if(authenticationData && authenticationData.access_token) return authenticationData.access_token;

        return null;

    }
}
