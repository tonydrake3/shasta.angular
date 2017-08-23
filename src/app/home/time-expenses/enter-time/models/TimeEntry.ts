import * as moment from 'moment';

export class TimeEntry {
    public In: moment.Moment = moment();
    public Out: moment.Moment = moment();
    public BreakIn: moment.Moment = moment();
    public BreakOut: moment.Moment = moment();
}

export enum TimeEntryMode {
    TimeInTimeOut = 1,
    Hours
}

export class TimeEntryState {
    SelectedDates: Array<moment.Moment> = [];
    TimeEntryMode: TimeEntryMode;
    Times: TimeEntry = new TimeEntry();
}
