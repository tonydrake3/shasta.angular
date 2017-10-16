import {TimeRecord} from '../../../models/domain/TimeRecord';
import {Employee} from '../../../models/domain/Employee';
import {Punch} from '../../../models/domain/Punch';
import {Hours} from '../../../models/domain/Hours';

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
    displayData: TimeModalDisplayData;
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

export class HoursApproval implements TimeRecordConvertible {

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

    asTimeRecord(): TimeRecord {
        const timeRecord = new TimeRecord();
        timeRecord.TimeRecordStatus = this.status;
        // timeRecord.ManualHours = //???//We need a good way to figure out if we should set Manual Hours.
        // timeRecord.Hours = new Hours(this.Regulartime, this.Overtime, this.Doubletime, ????) // what is the date?
        timeRecord.Employee = this.employee;
        timeRecord.Comments = this.comments;
        timeRecord.Id = this.TimeRecordId;
        // timeRecord.Breaks = ???? Breaks?
        // timeRecord.IndirectCost = ???
        timeRecord.CostCode = this.costCode;
        // timeRecord.Project = ???this.projectId?
        // timeRecord.PhaseId = ????

        return timeRecord
    }
}

