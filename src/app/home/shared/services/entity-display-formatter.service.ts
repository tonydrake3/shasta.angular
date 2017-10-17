import { Injectable } from '@angular/core';
import {Project} from '../../../models/domain/Project';
import {CostCode} from '../../../models/domain/CostCode';
import {IndirectCost} from '../../../models/domain/IndirectCost';
import {NumberContainingEntity} from '../../../models/NumberContainingEntity';

@Injectable()
export class EntityDisplayFormatterService {

    constructor() { }

    displayFormatted(entity?: NumberContainingEntity) {
        if (!entity) { return '' };

        return entity.Number + ' - ' + entity.Name;
    }

    displayCostCode(costCode?: CostCode) {
        if (!costCode) { return '' };

        return costCode.Code + '-' + costCode.Name;
    }

    displayIndirectCostCode(indirectCostCode?: IndirectCost) {
        if (!indirectCostCode) { return '' };

        return indirectCostCode.Description;
    }
}
