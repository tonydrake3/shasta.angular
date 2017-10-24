import { Injectable } from '@angular/core';
import {BaseStore} from '../../../shared/services/base-store.service';
import {apiRoutes} from '../../shared/configuration/api-routes.configuration';
import {Http} from '@angular/http';
import {TimeRecord} from '../../../models/domain/TimeRecord';

@Injectable()
export class TimeRecordUpdaterService extends BaseStore {

    constructor(protected _httpPassthrough: Http) {
        super(_httpPassthrough);
        this.init(apiRoutes.timeRecords, true);
    }

    public updateTimeRecord(record: TimeRecord): Promise<TimeRecord> {

        return super.updateEntity(record);

    }

}
