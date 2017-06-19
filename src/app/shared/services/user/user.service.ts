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

        // TODO: Change how service is provided so the init call can be moved to the constructor.
        // Currently provided in App, but the Token isn't set so the init fould fail and produce an empty entity$
        super.init(apiRoutes.currentUser);
        return this._entity$;

    }



}
