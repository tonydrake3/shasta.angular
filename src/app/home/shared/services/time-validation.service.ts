import {Injectable} from '@angular/core';
import * as moment from 'moment';

@Injectable()
export class TimeValidationService {

    public startBeforeEndTime(start: string, end: string): boolean {

        const startTime = moment(start, ['H:mm A']);
        const endTime = moment(end, ['H:mm A']);

        return (startTime.isSameOrBefore(endTime));
    }

    public endAfterStartTime(start: string, end: string): boolean {

        const startTime = moment(start, ['H:mm A']);
        const endTime = moment(end, ['H:mm A']);

        return (endTime.isSameOrAfter(startTime));
    }

    public breakInBetweenTimeInOut(timeIn: string, timeOut: string, breakIn: string): boolean {

        const startTime = moment(timeIn, ['H:mm A']);
        const endTime = moment(timeOut, ['H:mm A']);
        const breakStartTime = moment(breakIn, ['H:mm A']);

        // this.breakAfterTimeIn(startTime, breakStartTime);
        // this.breakBeforeTimeOut(endTime, breakStartTime);
        return (this.breakAfterTimeIn(startTime, breakStartTime) && this.breakBeforeTimeOut(endTime, breakStartTime));
    }

    public breakOutBetweenTimeInOut(timeIn: string, timeOut: string, breakOut: string): boolean {

        const startTime = moment(timeIn, ['H:mm A']);
        const endTime = moment(timeOut, ['H:mm A']);
        const breakEndTime = moment(breakOut, ['H:mm A']);

        // this.breakAfterTimeIn(startTime, breakEndTime);
        // this.breakBeforeTimeOut(endTime, breakEndTime);
        return (this.breakAfterTimeIn(startTime, breakEndTime) && this.breakBeforeTimeOut(endTime, breakEndTime));
    }

    private breakAfterTimeIn (start: moment.Moment, breakTime: moment.Moment) {

        return breakTime.isSameOrAfter(start);
    }

    private breakBeforeTimeOut (end: moment.Moment, breakTime: moment.Moment) {

        return breakTime.isSameOrBefore(end);
    }
}
