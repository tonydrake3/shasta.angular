import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { apiRoutes } from '../../../models/configuration/apiRoutes';
import { BaseStore } from '../base-store.service';

@Injectable()
export class UserService extends BaseStore {

    constructor(protected _httpPassthrough: Http) {

        super(_httpPassthrough);
    }

    getCurrentUserInfo () {

        super.init(apiRoutes.currentUser);

        this._entity$
            .subscribe(

                data => {
                    // loading.dismiss();
                    console.log(data);
                },

                error => {
                    //
                    console.log(error);
                })

    }

}
