import {Hours} from './Hours';
import {Punch} from './Punch';

export class TimeRecordPost {
    Id: number;
    PhaseId?: number;
    ProjectId?: number;
    CostCodeId?: number;
    EmployeeId?: number;
    Hours?: Hours;
    Punch?: Punch;
    Comments?: Array<any>;
}

export class TimeRecord {
    Id: number;
    PhaseId?: number;
    ProjectId?: number;
    CostCodeId?: number;
    EmployeeId?: number;
    Hours?: Hours;
    Punch?: Punch;
    Comments?: Array<any>;
    TimeRecordStatus?: string; // 'Pending', 'Approved', 'Rejected', 'Signed', 'Exported'
    ApprovedByUserId?: number;
    ApprovedDate?: string;
    ManualHours?: boolean;
    SecondLvlApprovedByUserId?: number;
    SecondLvlApprovedDate?: string;
    Signed?: boolean;
    Breaks?: Array<any>;
    BreaksVerified?: boolean;
    RejectionComment?: string;
    SignedDate?: string;
    Units: number;
    Timestamps?: any;
}
