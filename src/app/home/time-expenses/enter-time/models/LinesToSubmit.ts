import * as moment from 'moment';

export class LineToSubmit {
    Id: string;
    Date: moment.Moment;
    Employee: any;
    EmployeeId?: string;
    Project?: any;
    CostCode?: any;
    IndirectCostId?: string;
    System?: any;
    Phase?: any;
    IsPunch?: boolean;
    HoursST: number;
    HoursOT: number;
    HoursDT: number;
    TimeIn?: any;
    TimeOut?: any;
    BreakIn?: any;
    BreakOut?: any;
    Note?: string;
    CardIndex?: number;
}

// export class IndirectToSubmit {
//     Id: string;
//     Date: moment.Moment;
//     Employee: any;
//     EmployeeId: string;
//     CostCode: any;
//     IndirectCostId: string;
//     HoursST: number;
//     HoursOT: number;
//     HoursDT: number;
//     Note: string;
//     CardIndex?: number;
// }
