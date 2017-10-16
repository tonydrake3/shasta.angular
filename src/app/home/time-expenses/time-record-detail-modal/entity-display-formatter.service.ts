import { Injectable } from '@angular/core';
import {Project} from '../../../models/domain/Project';
import {CostCode} from '../../../models/domain/CostCode';
import {IndirectCost} from '../../../models/domain/IndirectCost';

@Injectable()
export class EntityDisplayFormatterService {

  constructor() { }

  displayProject(project: Project) {
        return project.Number + ' - ' + project.Name;
    }

    displayCostCode(costCode: CostCode) {
        return costCode.Code + '-' + costCode.Name;
    }

    displayIndirectCostCode(indirectCostCode: IndirectCost) {
        return indirectCostCode.Description;
    }
}
