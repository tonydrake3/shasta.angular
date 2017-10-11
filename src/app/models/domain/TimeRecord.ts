import {Hours} from './Hours';
import {Punch} from './Punch';
import {CostCode} from './CostCode';
import {Project} from './Project';
import {IndirectCost} from './IndirectCost';
import {Employee} from 'app/models/domain/Employee';

export class TimeRecordPost {
    Id: string;
    PhaseId?: string;
    ProjectId?: string;
    CostCodeId?: string;
    EmployeeId?: string;
    Hours?: Hours;
    Punch?: Punch;
    Comments?: Array<any>;
}

export class TimeRecord {
    Id: string;
    PhaseId?: string;
    ProjectId?: string;
    Project?: Project;
    CostCodeId?: string;
    CostCode?: CostCode;
    IndirectCostId?: string;
    IndirectCost?: IndirectCost;
    EmployeeId?: string;
    Employee?: Employee;
    Hours?: Hours;
    HoursOverriden?: boolean;
    Punch?: Punch;
    Comments?: Array<any>;
    TimeRecordStatus?: string; // 'Pending', 'Approved', 'Rejected', 'Signed', 'Exported'
    ApprovedByUserId?: string;
    ApprovedDate?: string;
    ManualHours?: boolean;
    SecondLvlApprovedByUserId?: string;
    SecondLvlApprovedDate?: string;
    Signed?: boolean;
    Breaks?: Array<any>;
    BreaksVerified?: boolean;
    RejectionComment?: string;
    SignedDate?: string;
    Units: number;
    Timestamps?: any;

    static fromAPIData(data: any): TimeRecord {
        const timeRecord = new this();
        timeRecord.CostCodeId = data['CostCodeId'];
        timeRecord.Breaks = data['Breaks'];
        timeRecord.Comments = data['Comments'];
        timeRecord.CostCode = data['CostCode'];
        timeRecord.IndirectCost = data['IndirectCost'];
        timeRecord.Project = data['Project'];
        timeRecord.CostCodeId = data['CostCodeId'];
        timeRecord.IndirectCostId = data['IndirectCostId'];
        timeRecord.ProjectId = data['ProjectId'];
        timeRecord.EmployeeId = data['EmployeeId'];
        timeRecord.Employee = data['Employee'];
        timeRecord.HoursOverriden = data['HoursOverriden'];
        timeRecord.Id = data['Id'];
        timeRecord.ManualHours = data['ManualHours'];
        timeRecord.Punch = data['Punch'];
        timeRecord.Signed = data['Signed'];
        timeRecord.TimeRecordStatus = data['TimeRecordStatus'];
        timeRecord.Timestamps = data['Timestamps'];

        return timeRecord;
    }
}
