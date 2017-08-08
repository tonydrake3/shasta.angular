import * as moment from 'moment';

export class LinesToAdd {
    selectedDates: Array<moment.Moment>;
    project: any;
    costCode: any;
    system: any;
    phase: any;
    employees: Array<any>;
    // TODO figure out time typing
    hoursWorked: {
        st: number;
        ot: number;
        dt: number;
    };
    timeInTimeOut: {
        'in': any;
        'out': any
    };
    break: {
        'in': any;
        'out': any
    };
    comment: string
}
