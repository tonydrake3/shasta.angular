import { Injectable } from '@angular/core';
import { BaseHttpService } from "../base-http.service";
import { AuthorizationResponse } from "../../models/response/authorizationResponse";
import { Http } from '@angular/http';

@Injectable ()
export class AuthorizationService extends BaseHttpService {

    constructor(private _httpPassthrough: Http) {
        super(_httpPassthrough);
    }

    getPermissions() {

        let url = 'http://api.sandbox.shasta.esubonline.com/Identity/Authorization';
        console.log("getPermissions");
        return super.get(url)
            .subscribe(
                data => {
                    console.log("getPermissions response", <AuthorizationResponse> data);
                },
                error => {
                    console.log("Error");
                }
            );
    }
}
