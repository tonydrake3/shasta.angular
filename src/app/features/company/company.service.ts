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
    }

    // TODO: Cast to Company object
    public getLatest (): Promise<any> {

        return this.load();
    }

    get companies$ () {

        return this._entity$.asObservable();
    }

}
