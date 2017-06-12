import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { BaseHttpService } from '../base-http.service';
import { AuthorizationResponse } from '../../models/response/authorizationResponse';
import { UserService } from '../user/user.service';

@Injectable ()
export class AuthorizationService extends BaseHttpService {

    constructor(private _httpPassthrough: Http, private _userService: UserService) {
        super(_httpPassthrough);
    }

    getPermissions() {

        // TODO: Replace with Config Service call to build URL
        const url = 'http://api.sandbox.shasta.esubonline.com/Identity/Authorization';
        // console.log("getPermissions");
        return super.get(url)
            .subscribe(
                data => {
                    console.log('getPermissions response', <AuthorizationResponse> data);
                    // this._userService.getCurrentUserInfo();
                },
                error => {
                    console.log('Error');
                }
            );
    }
}
