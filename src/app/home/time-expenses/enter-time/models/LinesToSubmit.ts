import * as moment from 'moment';

export class LineToSubmit {
    Date: moment.Moment;
    Employee: any;
    Project: any;
    CostCode: any;
    System: any;
    Phase: any;
    IsPunch: boolean;
    HoursST: number;
    HoursOT: number;
    HoursDT: number;
    TimeIn: any;
    TimeOut: any;
    BreakIn: any;
    BreakOut: any;
    Note: string;
}

export class IndirectToSubmit {
    Date: moment.Moment;
    Employee: any;
    CostCode: any;
    HoursST: number;
    HoursOT: number;
    HoursDT: number;
    Note: string;
}
