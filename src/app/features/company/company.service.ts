import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { apiRoutes } from '../../models/configuration/apiRoutes';
import { BaseStore } from '../../shared/services/base-store.service';
import {AuthenticationService} from '../../shared/services/authentication/authentication.service';



@Injectable()
export class CompanyService extends BaseStore {

    constructor(protected _httpPassthrough: Http) {
        super(_httpPassthrough);
        this.init(apiRoutes.companyTenants);

        console.log('CompanyService Ctor', apiRoutes.companyTenants);
    }

    get companies$ () {

        return this._entity$.asObservable();
    }

}
