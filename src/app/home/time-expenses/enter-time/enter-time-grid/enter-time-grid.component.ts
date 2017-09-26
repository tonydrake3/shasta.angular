import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import * as _ from 'lodash';
import * as uuidv4 from 'uuid/v4';

import {EnterTimeManager} from '../enter-time.manager';
import {Employee} from '../../../../models/domain/Employee';
import {Project} from '../../../../models/domain/Project';
import {CostCode} from '../../../../models/domain/CostCode';
import {EntryCard} from '../models/TimeEntry';
import {Observable} from 'rxjs/Observable';
import {Phase} from '../../../../models/domain/Phase';
import {System} from '../../../../models/domain/System';
import {LineToSubmit} from '../models/LinesToSubmit';
import {ConfirmationDialogService} from '../../../shared/services/confirmation-dialog.service';
import {TimeSettings} from '../../../../models/domain/TimeSettings';
import {EnterTimeTransformService} from '../enter-time-transform.service';
import {EnterTimeBatchService} from '../enter-time-batch.service';
import {TimeRecord} from '../../../../models/domain/TimeRecord';
import {EnterTimeGridBuilderService} from '../enter-time-grid-builder.service';
import {validateTimeBreakOverlap} from '../../../shared/validators/time-break-overlap.validator';
import {validateTime, validateTimeWithPeriod} from '../../../shared/validators/time-entry.validator';

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
    public currentCardIndex: number;
    public timeSettings: TimeSettings;
    public enterTimeGrid: FormGroup;

    public filteredProjects: Observable<Project[]>;
    public filteredSystems: Observable<System[]>;
    public filteredPhases: Observable<Phase[]>;
    public filteredCostCodes: Observable<CostCode[]>;
    public filteredEmployees: Observable<Employee[]>;

    private _cardSubscription;
    private _projectLineSubscription;
    private _indirectLineSubscription;

    constructor (private _enterTimeManager: EnterTimeManager, private _confirmationService: ConfirmationDialogService,
                 private _transforService: EnterTimeTransformService, private _batchService: EnterTimeBatchService,
                 private _builder: FormBuilder) {

        this.dateFormat = 'MMM. Do, YYYY';
        this.groupCardsBy = 'Date';
        this.currentCardIndex = 0;
        this.enterTimeGrid = this.createForm();
        console.log(this.enterTimeGrid);
    }

    ngOnInit () {

        this.employees = this._enterTimeManager.getEmployees();
        this.projects = this._enterTimeManager.getProjects();
        this.indirectCosts = this._enterTimeManager.getIndirectCodes();
        this.groupCardsBy = this._enterTimeManager.getGroupBy();
        // this.lineCount = this._enterTimeManager.getLineCount();
        this.timeSettings = this._enterTimeManager.getSettings();

        this.groupedLines = [];

        this._cardSubscription = this._enterTimeManager.cards$
            .map(c => c as EntryCard)
            .subscribe(
                (card) => {

                    console.log('EnterTimeGridComponent currentCardIndex', this.currentCardIndex);
                    // console.log('EnterTimeGridComponent card', card);
                    this.currentCardIndex++;
                    this.groupedLines.push(card);
                    this.addCard();
                    console.log('EnterTimeGridComponent Form', this.enterTimeGrid);
                    // this.buildCards(lines);
                    // this.groupedLines = line;
                });

        this._projectLineSubscription = this._enterTimeManager.projectRow$
            .subscribe(
                (row) => {

                    console.log('EnterTimeGridComponent projectRow$', row);
                });

        this._indirectLineSubscription = this._enterTimeManager.indirectRow$
            .subscribe(
                (row) => {

                    console.log('EnterTimeGridComponent indirectRow$', row);
                });

        // this._processingSubscription = this._enterTimeManager.processing$
        //     .subscribe(
        //         (processing) => {
        //
        //             if (!processing) {
        //                 console.log(this.groupedLines);
        //                 // this.currentCount++;
        //                 // this.progressConfig.value = (this.currentCount / (this.lineCount + (this.lineCount / 10))) * 100;
        //             }
        //             // this.loading = processing;
        //             // console.log('ngOnInit', processing);
        //     });

        setTimeout(() => {
            // this.lineCount = this._enterTimeManager.getNumLinesToSubmit();
            // console.log(this.lineCount);
            this._enterTimeManager.getGroupedLines();
        }, 20);
    }

    ngOnDestroy () {
        this._cardSubscription.unsubscribe();
        this._projectLineSubscription.unsubscribe();
        this._indirectLineSubscription.unsubscribe();
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
        this._confirmationService.setNeedsConfirmation(false);
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
        const cloneRecord =  _.cloneDeep(record);
        cloneRecord.Id = uuidv4();
        this.groupedLines[cardIndex].ProjectLines.splice(rowIndex + 1, 0, cloneRecord);
        this.groupedLines[cardIndex].ST += record.HoursST;
        this.groupedLines[cardIndex].OT += record.HoursOT;
        this.groupedLines[cardIndex].DT += record.HoursDT;
        this._enterTimeManager.insertProjectLine(cloneRecord);
    }

    public deleteRow (record, rowIndex: number, cardIndex: number) {

        this.groupedLines[cardIndex].ProjectLines.splice(rowIndex, 1);
        this.groupedLines[cardIndex].ST -= record.HoursST;
        this.groupedLines[cardIndex].OT -= record.HoursOT;
        this.groupedLines[cardIndex].DT -= record.HoursDT;
        this._enterTimeManager.deleteProjectLine(record);
    }

    public copyIndirectRow (record, rowIndex: number, cardIndex: number) {
        // console.log(record, rowIndex, cardIndex);
        const cloneRecord =  _.cloneDeep(record);
        cloneRecord.Id = uuidv4();
        this.groupedLines[cardIndex].IndirectLines.splice(rowIndex + 1, 0, cloneRecord);
        this.groupedLines[cardIndex].ST += record.HoursST;
        this._enterTimeManager.insertIndirectLine(cloneRecord);
    }

    public deleteIndirectRow (record, rowIndex: number, cardIndex: number) {

        this.groupedLines[cardIndex].IndirectLines.splice(rowIndex, 1);
        this.groupedLines[cardIndex].ST -= record.HoursST;
        this._enterTimeManager.deleteIndirectLine(record);
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

    public filterCollection (match, collection: Array<any>): Observable<Array<any>> {

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

    public submitTime () {

        let batchPayload: Array<TimeRecord>;
        let records: Array<TimeRecord>;

        _.forEach(this.groupedLines, (group, key) => {

            records = this._transforService.transformLinesToSubmitToTimeRecords(group.ProjectLines);

            if (key === 0) {

                batchPayload = records;
            } else {

                batchPayload = _.concat(batchPayload, records);
            }
        });

        // console.log('submitTime', batchPayload);

        this._batchService.submitBatchTime(batchPayload)
            .then((response) => {

                this._confirmationService.setNeedsConfirmation(false);
                this._enterTimeManager.clearLines();
            })
            .catch((error) => {

                console.log(error);
            });
    }

    private createForm (): FormGroup {

        return this._builder.group({
            cards: this._builder.array([])
        });
    }

    private addCard() {

        const cards = <FormArray>this.enterTimeGrid.controls['cards'];
        const newCard = this.createCardGroup();

        cards.push(newCard);
    }

    private createCardGroup (): FormGroup {

        return this._builder.group({
            cardRows: this._builder.array([]),
            cardRows: this._builder.array([])
        });
    }

    private addRow() {

        const gridCards = <FormArray>this.enterTimeGrid.controls['cardRows'];
        const newCardRow = this.initRow();

        gridCards.push(newCardRow);
    }

    private initRow() {

        return this._builder.group({
            date: ['', [Validators.required]],
            project: ['', [Validators.required]],
            system: '',
            phase: '',
            costCode: ['', [Validators.required]],
            employee: ['', [Validators.required]],
            standardHours: ['', [Validators.required]],
            overtimeHours: '',
            doubleTimeHours: '',
            timeEntry: this._builder.group(this.buildTimeEntryFormGroup(),
                {validator: validateTimeBreakOverlap('in', 'out', 'in', 'out')}),
            notes: ''
        });
    }

    private buildTimeEntryFormGroup () {

        // if (this._isNotHtml5Time) {
        //
        //     return {
        //
        //         time: this._builder.group(this.buildTimeDetailFormGroup(),
        //             {validator: validateTimeWithPeriod('in', 'out', 'startAfterEnd')}),
        //         break: this._builder.group(this.buildTimeDetailFormGroup(),
        //             {validator: validateTimeWithPeriod('in', 'out', 'breakStartAfterEnd')})
        //     };
        // }
        return {

            time: this._builder.group(this.buildTimeDetailFormGroup(),
                {validator: validateTime('in', 'out', 'startAfterEnd')}),
            break: this._builder.group(this.buildTimeDetailFormGroup(),
                {validator: validateTime('in', 'out', 'breakStartAfterEnd')})
        };
    }

    private buildTimeDetailFormGroup () {

        // if (this._isNotHtml5Time) {
        //
        //     return {
        //
        //         inValue: '',
        //         inPeriod: '',
        //         outValue: '',
        //         outPeriod: ''
        //     };
        // }
        return {

            in: '',
            out: ''
        };
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
