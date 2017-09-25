import {Hours} from './Hours';
import {Punch} from './Punch';

export class TimeRecordPost {
    Id: number;
    PhaseId?: string;
    ProjectId?: string;
    CostCodeId?: string;
    EmployeeId?: string;
    Hours?: Hours;
    Punch?: Punch;
    Comments?: Array<any>;
}

export class TimeRecord {
    Id: number;
    PhaseId?: string;
    ProjectId?: string;
    CostCodeId?: string;
    IndirectCostId?: string;
    EmployeeId?: string;
    Hours?: Hours;
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
}
