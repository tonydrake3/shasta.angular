export interface Comment {
    id?: number;
    value?: string
    userId?: number;
    created?: string;
    updated?: string;
}

export class Contact {
    id: number;
    companyName: string;
    firstName: string;
    lastName: string;
    isInactive: boolean;
    notes: string;
    sourceId: number;
    tenantId: number;
    title: string;
}

export class Division {
    id: number;
    name: string;
    number: string;
}

export class System {
    id: number;
    name: string;
    number: string;
    phases?: Phase[];
    projectId: number;
    sourceId?: number;
    tenantId?: number;
}

export class ProjectManager {
    address: Address;
    contact: Contact;
    contactId: number;
    contactTypeId: number;
    id: number;
    sourceId: number;
    tenantId: number;
}

// export class MarketArea {
//     division: Division;
//     divisionId: number;
//     id: number;
//     name: string;
//     number: string;
//     projects: Project[];
//     sourceId: number;
//     tenantId: number;
// }

export class Phase {
    id: number;
    name: string;
    number: string;
    systemId: number;
    sourceId: number;
    tenantId: number;
}

export class Address {
    address1: string;
    address2: string;
    address3?: string;
    city: string;
    countryId: number;
    email: string;
    fax: string;
    homePhone: string;
    mobile: string;
    pager: string;
    phone: string;
    state: string;
    tollFree: string;
    website: string;
    zip: string;
}

// export class ExpenseCategory {
//     id?: number;
//     name?: string;
//     costCodeId?: number;
//     costCode?: CostCode;
//     tenantId?: number;
//     expenses?: Expense[];
// }

// export class Expense {
//     amount?: number;
//     description?: string;
//     id?: number;
//     timeRecord?: TimeRecord;
//     timeRecordId?: number;
//     type?: ExpenseCategory;
//     typeId?: number;
//     tenantId?: number;
//     expenseTotal?: () => number;
// }

// export class TimeRecordExpense {
//     amount: number;
//     type: ExpenseCategory;
//     description: string;
// }


export class Employee {
    address?: Address;
    addToNewProjects?: boolean;
    firstName: string;
    id: number;
    isInactive?: boolean;
    laborClassId?: number;
    lastName: string;
    number?: string;
    sourceId?: number;
    tenantId?: number;
    projectIds: number[];
}

export class PunchToSave {
    punchIn: string;
    punchOut: string;
}

// export class TimeRecordToSave {
//     id: number;
//     activity: string;
//     comments: Comment[];
//     costCodeId: number;
//     date: string;
//     timeIn: string;
//     timeOut: string;
//     employeeId: number;
//     expenses: TimeRecordExpenseToSave[];
//     hours: Hours;
//     punch: PunchToSave;
//     projectId: number;
//     phaseId: number;
//     units: number;
// }

// export class TimeTotals {
//     hours: Hours;
//     overhead: number;
//     total: number;
// }

export class TimeRecordExpenseToSave {
    id: number;
    amount: number;
    description: string;
    typeId: number;
}

export interface HOURTYPE {
    regularTime: string;
    overtime: string;
    doubleTime: string;
}

// export class Project {
//     address?: Address;
//     architectId?: number;
//     comments?: string;
//     configuration?: string; // TODO?: create interface for configuration object
//     contractNumber?: string;
//     costCodes?: CostCode[];
//     countryId?: number;
//     employees?: Employee[];
//     engineerId?: number;
//     fax?: string;
//     id?: number;
//     isComplete?: boolean;
//     isHidden?: boolean;
//     isTemplate?: boolean;
//     isTemplatesContainer?: boolean;
//     isTraining?: boolean;
//     key?: string;
//     location?: string;
//     marketAreaId?: number;
//     marketArea?: MarketArea;
//     name?: string;
//     number?: string;
//     ownerId?: number;
//     phone?: string;
//     projectEngineerId?: number;
//     projectManagerId?: number;
//     projectManager?: ProjectManager;
//     salesmanId?: number;
//     state?: string;
//     statusId?: number;
//     status?: string;
//     superintendentId?: number;
//     systems?: System[];
//     timeZoneId?: number;
//     zip?: string;
// }

// export class CostCode {
//     code?: string;
//     displayOn?: string;
//     displayOnAllProjects?: boolean;
//     id: number;
//     isInactive?: boolean;
//     isOverheadActivity?: boolean;
//     name: string;
//     projects?: Project[];
//     sourceId?: number;
//     tenantId?: number;
// }


    // export interface TimeRecordRow {
    //     id?: number;
    //     costCode?: CostCode;
    //     system?: System;
    //     phase?: Phase;
    //     punchIn?: any; // string | Date
    //     punchOut?: any; // string | Date
    //     regularTime?: string | number;
    //     doubleTime?: string | number;
    //     overtime?: string | number;
    //     // expenses?: Expense[];
    //     comments?: Comment[]
    // }

    // export interface TimeRecordGrouping {
    //     projectId?: number;
    //     employeeId?: number;
    //     costCodeId?: number;
    //     isOpen?: boolean;
    //     timeRecords: TimeRecord[];
    //     timeTotals: TimeTotals;
    //     title: string;
    //     heading: string;
    // }

    // export interface TimeRecordInputData {
    //     dates?: number[]; // dates are saved as time in multiple select date picker
    //     costCode?: CostCode;
    //     activity?: string;
    //     system?: System;
    //     phase?: Phase;
    //     project?: Project;
    //     employees?: any[];
    //     units?: number;
    //     hours?: Hours;
    //     punch?: Punch;
    //     manualHours?: boolean;
    //     expenses?: TimeRecordExpense[];
    //     comment?: string;
    // }

    // export class TimeRecordLogData {
    //     activity: string;
    //     comments: string[];
    //     costCodeId: number;
    //     costCode: CostCode;
    //     date: string;
    //     punch: Punch;
    //     employeeId: number;
    //     hours: Hours;
    //     id: number;
    //     phaseId: number;
    //     projectId: number;
    //     project: Project;
    //     timesheetId: number;
    //     units: number;
    // }
