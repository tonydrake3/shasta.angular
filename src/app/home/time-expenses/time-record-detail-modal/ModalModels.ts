import {TimeRecord} from '../../../models/domain/TimeRecord';
import {Punch} from '../../../models/domain/Punch';
import {Hours} from '../../../models/domain/Hours';
import {Employee} from '../../../models/time/TimeRecord';

export const enum TimeModalMode {
    view,
    edit
}

export interface TimeModalDisplayData {
    employeeText: string;
    projectTitle?: string;
    projectText?: string;
    costCodeTitle: string;
    costCodeText: string;
    statusText: string;
    totalHoursText: string;
}

export class IndirectCostTimeModalDisplayData implements TimeModalDisplayData {
    employeeText: string;
    projectTitle: string;
    projectText: string;
    costCodeTitle: string;
    costCodeText: string;
    statusText: string;
    totalHoursText: string;

    constructor(timeRecord: TimeRecord) {
        this.employeeText = timeRecord.Employee.FirstName + ' ' + timeRecord.Employee.LastName;
        this.projectTitle = null;
        this.projectText = null;
        this.costCodeTitle = 'Indirect Cost';
        this.costCodeText = timeRecord.IndirectCost.Description;
        this.statusText = timeRecord.TimeRecordStatus;
        console.log('The timeRecord Hours object is');
        console.log(timeRecord.Hours);
        const hours = timeRecord.Hours.total;
        console.log('The total is');
        console.log(hours);
        this.totalHoursText = String(hours);
    }
}

export class ProjectPunchDisplayData implements TimeModalDisplayData {
    employeeText: string;
    projectTitle: string;
    projectText: string;
    costCodeTitle: string;
    costCodeText: string;
    statusText: string;
    totalHoursText: string;

    constructor(timeRecord: TimeRecord) {
        this.employeeText = timeRecord.Employee.FirstName + ' ' + timeRecord.Employee.LastName;
        this.projectTitle = 'Project';
        this.projectText = timeRecord.Project.Number + ' - ' + timeRecord.Project.Name;
        this.costCodeTitle = 'Cost Code';
        this.costCodeText = timeRecord.CostCode.Code + ' - ' + timeRecord.CostCode.Name;
        this.statusText = timeRecord.TimeRecordStatus;
        console.log('The timeRecord Hours object is');
        console.log(timeRecord.Hours);
        const hours = timeRecord.Hours.total;
        console.log('The total is');
        console.log(hours);
        this.totalHoursText = String(hours);
    }
}

export class ProjectManualHoursDisplayData implements TimeModalDisplayData {
    employeeText: string;
    projectTitle: string;
    projectText: string;
    costCodeTitle: string;
    costCodeText: string;
    statusText: string;
    totalHoursText: string;

    constructor(timeRecord: TimeRecord) {
        this.employeeText = timeRecord.Employee.FirstName + ' ' + timeRecord.Employee.LastName;
        this.projectTitle = 'Project';
        this.projectText = timeRecord.Project.Number + ' - ' + timeRecord.Project.Name;
        this.costCodeTitle = 'Cost Code';
        this.costCodeText = timeRecord.CostCode.Code + ' - ' + timeRecord.CostCode.Name;
        this.statusText = timeRecord.TimeRecordStatus;
        console.log('The timeRecord Hours object is');
        console.log(timeRecord.Hours);
        const hours = timeRecord.Hours.total;
        console.log('The total is');
        console.log(hours);
        this.totalHoursText = String(hours);
    }
}

export class BannerItem {
    title: string;
    value: string;
}

export interface TimeModal {
    displayMode: TimeModalMode;
    didTapCancelButton(): void;
}

// export class EditTimeModal implements TimeModal {
//     displayData: TimeModalDisplayData;
//
//     didTapCancelButton(): void {
//         console.log('Edit Modal Tapped Cancel Button');
//     }
// }
export interface DisplayModeSpecifying {
    displayMode: TimeModalMode;
}

export interface TimeRecordConvertible {
    asTimeRecord(): TimeRecord
}

export class HoursApproval {

    status: string;
    day: string;
    job: string;
    hourlyValues: string;
    Regulartime: number;
    Overtime: number;
    Doubletime: number;
    isSelected: boolean;
    punch: Punch;
    costCode: string;
    $id: string;
    isRejected: boolean;
    note: string;
    comments: Array<Comment>;
    TimeRecordId: string;
    projectId: string;
    employee: Employee;
    punchIn?: Date;
    punchOut?: Date;
}

