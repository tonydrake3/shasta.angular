import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { BaseHttpService } from "../base-http.service";
import { UserProfile } from "../../models/domain/user-profile";

@Injectable()
export class UserService extends BaseHttpService {

    userProfile: UserProfile;

    constructor(private _httpPassthrough: Http){
        super(_httpPassthrough);
    }

    getCurrentUserInfo () {

        //TODO: Replace with Config Service call to build URL
        let url = 'http://api.sandbox.shasta.esubonline.com/Identity/Users/Current';
        // console.log("getCurrentUser");
        return super.get(url)
            .subscribe(
                data => {
                    console.log("getCurrentUser response", data);
                },
                error => {
                    console.log("getCurrentUser Error");
                }
            );
    }

}
