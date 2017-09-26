import * as moment from 'moment';

export class LineToSubmit {
    Id: string;
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
    Id: string;
    Date: moment.Moment;
    Employee: any;
    EmployeeId: string;
    CostCode: any;
    IndirectCostId: string;
    HoursST: number;
    HoursOT: number;
    HoursDT: number;
    Note: string;
}
