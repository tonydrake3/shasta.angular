import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { apiRoutes } from '../../models/configuration/apiRoutes';
import { BaseStore } from '../../shared/services/base-store.service';

@Injectable()
export class CompanyService extends BaseStore {

    constructor(protected _httpPassthrough: Http) {
        super(_httpPassthrough);
        console.log('CompanyService Ctor');
    }

    getCompanies () {
        super.init(apiRoutes.companyTenants);
        return this._entity$;
    }

    hasMultipleCompanies (): Promise<any> {

        return new Promise((resolve, reject) => {

            this._entity$
                .subscribe(
                    (companies: any) => {
                        console.log('Companies', companies);
                        // resolve(companies['value'].count > 1);
                        resolve(true);
                    },
                    (error: any) => {
                        reject(false);
                        console.log(error);
                    }
                );
        });
    }

}
