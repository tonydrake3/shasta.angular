import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {EnterTimeManager} from '../enter-time.manager';
import {Employee} from '../../../../models/domain/Employee';
import {Project} from '../../../../models/domain/Project';
import {CostCode} from '../../../../models/domain/CostCode';

@Component({
    selector: 'esub-enter-time-grid',
    templateUrl: './enter-time-grid.component.html'
})
export class EnterTimeGridComponent implements OnInit {

    @Output() displayGrid: EventEmitter<boolean> = new EventEmitter<boolean>();

    public groupedLines;
    public employees: Array<Employee>;
    public projects: Array<Project>;
    public indirectCosts: Array<CostCode>;


    constructor (private _enterTimeManager: EnterTimeManager) {}

    ngOnInit () {

        this.employees = this._enterTimeManager.getEmployees();
        this.projects = this._enterTimeManager.getProjects();
        this.indirectCosts = this._enterTimeManager.getIndirectCodes();
        this.groupedLines = this._enterTimeManager.getGroupedLines();
        console.log('EnterTimeGridComponent OnInit', this.groupedLines);
    }

    public addMoreLines () {

        this.displayGrid.emit(false);
    }

    public getFilteredEmployees (projectId: string) {

        console.log('EnterTimeGridComponent getFilteredEmployees', projectId);
        return this._enterTimeManager.filterEmployees(projectId);
    }
}
