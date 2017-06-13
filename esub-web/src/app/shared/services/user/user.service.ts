import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { BaseHttpService } from '../base-http.service';
import { UserProfile } from '../../../models/domain/UserProfile';
import {apiRoutes} from '../../../models/configuration/apiRoutes';
import {environment} from '../../../../environments/environment';

@Injectable()
export class UserService extends BaseHttpService {

    userProfile: UserProfile;

    constructor(private _httpPassthrough: Http){
        super(_httpPassthrough);
    }

    getCurrentUserInfo () {

        // TODO: Replace with Config Service call to build URL
        const url = environment.apiUrl + apiRoutes.currentUser;
        // console.log("getCurrentUser");
        return super.get(url)
            .subscribe(
                data => {
                    console.log('getCurrentUser response', data);
                },
                error => {
                    console.log('getCurrentUser Error');
                }
            );
    }

}
