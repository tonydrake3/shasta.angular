import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { apiRoutes } from '../../configuration/api-routes.configuration';
import { BaseStore } from '../../../../shared/services/base-store.service';

@Injectable()
export class UserService extends BaseStore {

    constructor(protected _httpPassthrough: Http) {

        super(_httpPassthrough);
        this.init(apiRoutes.currentUser);

    }

    get currentUserInfo$ () {

        return this._entity$.asObservable();
    }

    getLatest() {
      this.load();
    }
}
