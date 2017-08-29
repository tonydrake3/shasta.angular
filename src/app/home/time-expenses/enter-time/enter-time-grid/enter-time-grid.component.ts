import {
    AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, EventEmitter, OnInit,
    Output
} from '@angular/core';
import {EnterTimeManager} from '../enter-time.manager';
import {Employee} from '../../../../models/domain/Employee';
import {Project} from '../../../../models/domain/Project';
import {CostCode} from '../../../../models/domain/CostCode';

@Component({
    selector: 'esub-enter-time-grid',
    templateUrl: './enter-time-grid.component.html'
})
export class EnterTimeGridComponent implements OnInit, AfterViewChecked {

    @Output() displayGrid: EventEmitter<boolean> = new EventEmitter<boolean>();

    public groupCardsBy: string;
    public groupedLines;
    public employees: Array<Employee>;
    public projects: Array<Project>;
    public indirectCosts: Array<CostCode>;
    public loading: boolean;


    constructor (private _enterTimeManager: EnterTimeManager, private _changeRef: ChangeDetectorRef) {

        this.groupCardsBy = 'Date';
        this.loading = false;
    }

    ngOnInit () {

        this.employees = this._enterTimeManager.getEmployees();
        this.projects = this._enterTimeManager.getProjects();
        this.indirectCosts = this._enterTimeManager.getIndirectCodes();

        this._enterTimeManager.gridLines$
            .subscribe(
                (lines) => {

                    console.log('EnterTimeGridComponent gridlines', lines);
                    this.groupedLines = lines;
                });

        this._enterTimeManager.getGroupedLines();
    }

    ngAfterViewChecked () {

        console.log('EnterTimeGridComponent AfterViewInit');
    }

    public addMoreLines () {

        this.displayGrid.emit(false);
    }

    public updateGrouping (groupBy: string) {

        this.groupCardsBy = groupBy;
        this._enterTimeManager.updateGrouping(groupBy);
    }

    public getFilteredEmployees (projectId: string) {

        // console.log('EnterTimeGridComponent getFilteredEmployees', projectId);
        return this._enterTimeManager.filterEmployees(projectId);
    }
}
