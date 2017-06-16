import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { apiRoutes } from '../../models/configuration/apiRoutes';
import { BaseStore } from '../../shared/services/base-store.service';

@Injectable()
export class CompanyService extends BaseStore {

    constructor(protected _httpPassthrough: Http) {

        super(_httpPassthrough);
        super.init(apiRoutes.companyTenants);
    }

    getCompanies () {

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
