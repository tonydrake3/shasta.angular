import { TestBed, inject } from '@angular/core/testing';

import { EntityDisplayFormatterService } from './entity-display-formatter.service';
import {mockProjects} from '../../../mocks/data/mockProject.data';
import {Project} from '../../../models/domain/Project';
import {CostCode} from '../../../models/domain/CostCode';
import {Observable} from 'rxjs/Observable';
import {IndirectCost} from '../../../models/domain/IndirectCost';

describe('EntityDisplayFormatterService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [EntityDisplayFormatterService]
        });
    });

    let service: EntityDisplayFormatterService;
    let project: Project;
    let costCode: CostCode;
    let indirectCostCode: IndirectCost;

    beforeEach(() => {

        service = TestBed.get(EntityDisplayFormatterService);

        // Initialize Data
        project = new Project();
        project.Name = 'Hopskotch';
        project.Number = '123';

        costCode = new CostCode();
        costCode.Name = 'Super Cool';
        costCode.Code = '567';

        indirectCostCode = new IndirectCost();
        indirectCostCode.Description = 'Sick Time';
    });

    describe('displaying when an entity is passed in', () => {

        it('should display Project in format Number - Name', () => {

            expect(service.displayFormatted(project)).toEqual('123 - Hopskotch');

        });

        it('should display Cost Code in format Code - Name', () => {

            expect(service.displayCostCode(costCode)).toEqual('567 - Super Cool');

        });

        it('should display Cost Code in format Code - Name', () => {

            expect(service.displayIndirectCostCode(indirectCostCode)).toEqual('Sick Time');

        });

    });

    describe('displaying when no entity is passed in', () => {

        it('should be an empty string', () => {

            expect(service.displayCostCode()).toEqual('');
            expect(service.displayFormatted()).toEqual('');
            expect(service.displayIndirectCostCode()).toEqual('');

        })

    });

});
