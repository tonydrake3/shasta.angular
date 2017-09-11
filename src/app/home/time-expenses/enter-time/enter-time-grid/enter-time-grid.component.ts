import {ChangeDetectorRef, Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import * as _ from 'lodash';

import {EnterTimeManager} from '../enter-time.manager';
import {Employee} from '../../../../models/domain/Employee';
import {Project} from '../../../../models/domain/Project';
import {CostCode} from '../../../../models/domain/CostCode';
import {EntryCard, EntryGridLine} from '../models/TimeEntry';
import {Observable} from 'rxjs/Observable';
import {Phase} from '../../../../models/domain/Phase';
import {System} from '../../../../models/domain/System';
import {LineToSubmit} from '../models/LinesToSubmit';

@Component({
    selector: 'esub-enter-time-grid',
    templateUrl: './enter-time-grid.component.html'
})
export class EnterTimeGridComponent implements OnInit, OnDestroy {

    @Output() displayGrid: EventEmitter<boolean> = new EventEmitter<boolean>();

    public dateFormat: string;
    public groupCardsBy: string;
    public groupedLines: Array<EntryCard>;
    public employees: Array<Employee>;
    public projects: Array<Project>;
    public indirectCosts: Array<CostCode>;
    public loading: boolean;
    public progressConfig;
    public lineCount: number;
    public currentCount: number;

    public filteredProjects: Observable<Project[]>;
    public filteredSystems: Observable<System[]>;
    public filteredPhases: Observable<Phase[]>;
    public filteredCostCodes: Observable<CostCode[]>;
    public filteredEmployees: Observable<Employee[]>;

    private _cardSubscription;
    private _processingSubscription;

    constructor (private _enterTimeManager: EnterTimeManager, private _changeRef: ChangeDetectorRef) {

        this.dateFormat = 'MMM. Do, YYYY';
        this.groupCardsBy = 'Date';
        this.loading = true;
        this.progressConfig = {
            color: 'primary',
            mode: 'determinate',
            value: 0
        };
        this.currentCount = 0;
    }

    ngOnInit () {

        this.employees = this._enterTimeManager.getEmployees();
        this.projects = this._enterTimeManager.getProjects();
        this.indirectCosts = this._enterTimeManager.getIndirectCodes();
        this.groupCardsBy = this._enterTimeManager.getGroupBy();
        this.lineCount = this._enterTimeManager.getLineCount();

        this.groupedLines = [];

        this._cardSubscription = this._enterTimeManager.cards$
            .map(c => c as EntryCard)
            .subscribe(
                (card) => {

                    console.log('EnterTimeGridComponent card', card);
                    this.groupedLines.push(card);
                    // this.buildCards(lines);
                    // this.groupedLines = line;
                });

        this._processingSubscription = this._enterTimeManager.processing$
            .subscribe(
                (processing) => {

                    if (processing) {
                        this.currentCount++;
                        this.progressConfig.value = (this.currentCount / (this.lineCount + (this.lineCount / 10))) * 100;
                    }
                    this.loading = processing;
                    console.log('ngOnInit', processing);
            });

        setTimeout(() => {
            // this.lineCount = this._enterTimeManager.getNumLinesToSubmit();
            // console.log(this.lineCount);
            this._enterTimeManager.getGroupedLines();
        }, 20);
    }

    ngOnDestroy () {
        this.progressConfig.value = 0;
        this._cardSubscription.unsubscribe();
        this._processingSubscription.unsubscribe();
    }

    public displayFormatted (value) {

        if (value) {

            return value.Number + ' - ' + value.Name;
        }
        return '';
    }

    public displayCode (value) {

        if (value) {

            return value.Code + ' - ' + value.Name;
        }
        return '';
    }

    public addMoreLines () {

        this.displayGrid.emit(false);
    }

    public deleteAllLines() {

        this._enterTimeManager.clearLines();
        this.displayGrid.emit(false);
    }

    public updateGrouping (groupBy: string) {

        this.groupCardsBy = groupBy;
        this.groupedLines = [];
        this._enterTimeManager.setGroupBy(groupBy);
    }

    public deleteCard (card, cardIndex: number) {

        this.groupedLines.splice(cardIndex, 1);
        this._enterTimeManager.deleteCardGroup(card);

        if (this.groupedLines.length === 0) {

            this.displayGrid.emit(false);
        }
    }

    public copyRow (record, rowIndex: number, cardIndex: number) {
        // console.log(record, rowIndex, cardIndex);
        this.groupedLines[cardIndex].ProjectLines.splice(rowIndex + 1, 0, record);
        this._enterTimeManager.insertProjectLine(record);
    }

    public deleteRow (record, rowIndex: number, cardIndex: number) {

        this.groupedLines[cardIndex].ProjectLines.splice(rowIndex, 1);
        this._enterTimeManager.deleteProjectLine(record);
    }

    public copyIndirectRow (record, rowIndex: number, cardIndex: number) {
        // console.log(record, rowIndex, cardIndex);
        this.groupedLines[cardIndex].IndirectLines.splice(rowIndex + 1, 0, record);
        this._enterTimeManager.insertProjectLine(record);
    }

    public deleteIndirectRow (record, rowIndex: number, cardIndex: number) {

        this.groupedLines[cardIndex].IndirectLines.splice(rowIndex, 1);
        this._enterTimeManager.deleteProjectLine(record);
    }

    public onProjectSelected (record: LineToSubmit) {

        record.Phase = '';
        record.System = '';
        record.CostCode = '';
        record.Employee = '';
    }

    public onSystemSelected (record: LineToSubmit) {

        record.Phase = '';
    }

    public filterCollection (match, collection): Observable<Array<any>> {

        let filtered = [];

        if (typeof match === 'string') {

            filtered = _.filter(collection, (item) => {
                return item.Name.toLowerCase().includes(match.toLowerCase()) ||
                    item.Number.toLowerCase().includes(match.toLowerCase()) ||
                    (item.Number.toLowerCase() + ' - ' + item.Name.toLowerCase()).includes(match.toLowerCase());
            });
        }

        return Observable.of(filtered);
    }

    public filterEmployees (match, projectId: string): Observable<Array<any>> {

        let filtered = [];

        if (typeof match === 'string') {

            filtered = _.filter(this.filterEmployeesByProject(projectId), (employee) => {
                return employee.Name.toLowerCase().includes(match.toLowerCase()) ||
                    employee.Number.toLowerCase().includes(match.toLowerCase()) ||
                    (employee.Number.toLowerCase() + ' - ' + employee.Name.toLowerCase()).includes(match.toLowerCase());
            });
        }

        return Observable.of(filtered);
    }

    public filterAllEmployees (match): Observable<Array<any>> {

        let filtered = [];

        if (typeof match === 'string') {

            filtered = _.filter(this.employees, (employee) => {
                return employee.Name.toLowerCase().includes(match.toLowerCase()) ||
                    employee.Number.toLowerCase().includes(match.toLowerCase()) ||
                    (employee.Number.toLowerCase() + ' - ' + employee.Name.toLowerCase()).includes(match.toLowerCase());
            });
        }

        return Observable.of(filtered);
    }

    public filterIndirectCodes (match): Observable<CostCode[]> {

        // console.log('filterIndirectCodes', match, this._indirectCodes);
        let filtered = [];

        if (typeof match === 'string') {

            filtered = _.filter(this.indirectCosts, (code) => {
                return code.Name.toLowerCase().includes(match.toLowerCase()) ||
                    code.Code.toLowerCase().includes(match.toLowerCase()) ||
                    (code.Code.toLowerCase() + ' - ' + code.Name.toLowerCase()).includes(match.toLowerCase());
            });
        }

        return Observable.of(filtered);
    }

    public filterProjectCodes (match, project: Project): Observable<CostCode[]> {

        // console.log('filterProjectCodes', match);
        let filtered = [];

        if (typeof match === 'string') {

            filtered = _.filter(project.CostCodes, (code) => {
                return code.Name.toLowerCase().includes(match.toLowerCase()) ||
                    code.Code.toLowerCase().includes(match.toLowerCase()) ||
                    (code.Code.toLowerCase() + ' - ' + code.Name.toLowerCase()).includes(match.toLowerCase());
            });
        }

        return Observable.of(filtered);
    }

    private buildCards (lines) {

        console.log('EnterTimeGridComponent buildCards enter');
        for (let i = 0; i < lines.length; i++) {
            console.log('EnterTimeGridComponent buildCards', this.groupedLines);
            setTimeout(() => {
                this.groupedLines.push(lines[i]);
                console.log('EnterTimeGridComponent buildCards', this.groupedLines);
            }, 200 * i);
        }
    }

    private filterEmployeesByProject (projectId: string) {

        return _.filter(this.employees, function (employee) {
            return employee.ProjectIds.includes(projectId);
        });
    }

    // public employeeSelected (event, record) {
    //
    //     record.EmployeeId = event.source.value.Id;
    //     console.log(record);
    // }
}
