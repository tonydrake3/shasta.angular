import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { apiRoutes } from '../../configuration/api-routes.configuration';
import { BaseStore } from '../../../../shared/services/base-store.service';
import {User} from '../../../../models/domain/User';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class UserService extends BaseStore {

    constructor(protected _httpPassthrough: Http) {

        super(_httpPassthrough);
        this.init(apiRoutes.currentUser);

    }

    get currentUserInfo$ (): Observable<User> {

        // TODO: Change how service is provided so the init call can be moved to the constructor.
        // Currently provided in App, but the Token isn't set so the init fould fail and produce an empty entity$

        return this._entity$.asObservable() as Observable<User>;

    }

    getLatest() {
      this.load();
    }
}
