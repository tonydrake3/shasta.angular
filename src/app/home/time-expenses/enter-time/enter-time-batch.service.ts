import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {BaseStore} from '../../../shared/services/base-store.service';
import {apiRoutes} from '../../shared/configuration/api-routes.configuration';
import {TimeRecord} from '../../../models/domain/TimeRecord';

@Injectable()
export class EnterTimeBatchService extends BaseStore {

    constructor(protected _httpPassthrough: Http) {
        super(_httpPassthrough);
        this.init(apiRoutes.enterTimeBatch, true);
    }

    public submitBatchTime (records: Array<TimeRecord>) {

        return super.addEntity({'TimeRecords': records});
    }
}
