import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

import {BaseHttpService} from '../../shared/services/base-http.service';
import {environment} from '../../../environments/environment';
import {apiRoutes} from '../../home/shared/configuration/api-routes.configuration';

@Injectable ()
export class ResetPasswordService extends BaseHttpService {

    constructor(private _httpPassthrough: Http) {
        super(_httpPassthrough);
    }

    sendEmail (email: string) {

        // const url = environment.apiUrl + apiRoutes.resetToken;
        // const payload  = {
        //
        //     Email: email
        // };
        //
        // return super.post(url, payload);
    }
}
