import * as moment from 'moment';

export class TimeEntry {
    public In: moment.Moment = moment();
    public Out: moment.Moment = moment();
    public BreakIn: moment.Moment = moment();
    public BreakOut: moment.Moment = moment();
}
