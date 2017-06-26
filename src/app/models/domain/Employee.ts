import {Address} from './Address';

export class Employee {

    Address?: Address;
    addToNewProjects?: boolean;
    FirstName: string;
    Id: number;
    isInactive?: boolean;
    laborClassId?: number;
    LastName: string;
    Number?: string;
    SourceId?: number;
    TenantId?: number;
    ProjectIds: number[];
}
