import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { BaseHttpService } from '../base-http.service';

@Injectable()
export class UserStore extends BaseHttpService {

    constructor (private _httpPassthrough: Http) {

        super(_httpPassthrough);

    }

}
