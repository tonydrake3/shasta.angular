import {Address} from './Address';
import {Architect} from './Architect';
import {CostCode} from './CostCode';
import {ProjectManager} from './ProjectManager';
import {MarketArea} from './MarketArea';
import {Superintendent} from './Superintendent';
import {System} from './System';
import {Division} from './Division';
import {Employee} from './Employee';
import {NumberContainingEntity} from '../NumberContainingEntity';

export class Project implements NumberContainingEntity {
    Address?: Address;
    Architect?: Architect;
    Comments?: Comment[];
    ContractNumber?: string;
    CostCodes?: CostCode[];
    Division?: Division;
    // Engineer?: Engineer; // TODO: Add model?
    People?: Employee;
    Id?: string;
    IsHidden?: boolean;
    IsTemplate?: boolean;
    IsTraining?: boolean;
    Location?: Location;
    MarketArea?: MarketArea;
    Name: string;
    Number: string;
    // Owner?: Owner; // TODO: Add model?
    // ProjectEngineer?: ProjectEngineer; // TODO: Add model?
    ProjectManager?: ProjectManager;
    // Salesman?: Salesman; // TODO: Add model?
    SourceId?: number;
    Status?: number;
    Superintendent?: Superintendent;
    Systems?: System[];
    TenantId?: string;
    TimeZone?: number;
}
