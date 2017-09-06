import * as moment from 'moment';
import {IndirectToSubmit, LineToSubmit} from './LinesToSubmit';

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

export class EntryCard {
    Key: string;
    ST = 0;
    OT = 0;
    DT = 0;
    ProjectLines?: Array<LineToSubmit> = [];
    IndirectLines?: Array<IndirectToSubmit> = [];
}

export class EntryGridLine {
    Key: string;
    ProjectLine?: LineToSubmit;
    IndirectLine?: IndirectToSubmit;
}
