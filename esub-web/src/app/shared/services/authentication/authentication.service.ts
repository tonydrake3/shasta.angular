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

    login(username: string, password: string) {

        let url = 'http://api.sandbox.shasta.esubonline.com/Identity/Token';
        let payload = {
          grant_type: 'password',
          username : username,
          password : password
        };

        return super.postForm(url, payload)
            .subscribe(
                data => {

                    sessionStorage.setItem('authentication', JSON.stringify(data));

                    this._authorizationService.getPermissions();
                },
                error => {
                    console.log("Error");
                }
            );
    }
}
