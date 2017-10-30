import {Injectable} from '@angular/core';
import * as moment from 'moment';
import {Punch} from '../../../models/domain/Punch';
import {Break} from '../../../models/domain/Break';

@Injectable()
export class DateHelperService {

    constructor() {
    }

    public buildPunch(date: moment.Moment, timeIn: string, timeOut: string): Punch {

        const punchIn = moment(date.format('YYYY-MM-DD') + ' ' + timeIn);
        const punchOut = moment(date.format('YYYY-MM-DD') + ' ' + timeOut);

        return new Punch(punchIn.toISOString(), punchOut.toISOString());
    }

    public buildBreak(date: moment.Moment, brIn: string, brOut: string): Break {

        const breakIn = moment(date.format('YYYY-MM-DD') + ' ' + brIn);
        const breakOut = moment(date.format('YYYY-MM-DD') + ' ' + brOut);

        return new Break(breakIn.toISOString(), breakOut.toISOString());
    }
}
