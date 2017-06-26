import {Address} from './Address';
import {Architect} from './Architect';
import {CostCode} from './CostCode';
import {ProjectManager} from './ProjectManager';
import {MarketArea} from './MarketArea';
import {Superintendent} from './Superintendent';
import {System} from './System';
import {Division} from './Division';
import {Employee} from './Employee';

export class Project {
    Address?: Address;
    Architect?: Architect;
    Comments?: Comment[];
    ContractNumber?: string;
    CostCodes?: CostCode[];
    Division?: Division;
    // Engineer?: Engineer; // TODO: Add model?
    Employees?: Employee;
    Id?: string;
    IsHidden?: boolean;
    IsTemplate?: boolean;
    IsTraining?: boolean;
    Location?: Location;
    MarketArea?: MarketArea;
    Name?: string;
    Number?: string;
    // Owner?: Owner; // TODO: Add model?
    // ProjectEngineer?: ProjectEngineer; // TODO: Add model?
    ProjectManager?: ProjectManager;
    // Salesman?: Salesman; // TODO: Add model?
    SourceId?: number;
    Status?: string;
    Superintendent?: Superintendent;
    Systems?: System[];
    TenantId?: string;
    TimeZone?: number;
}
