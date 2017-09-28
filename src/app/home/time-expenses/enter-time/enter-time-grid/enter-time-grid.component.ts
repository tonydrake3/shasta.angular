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
import {validateTimeBreakOverlap} from '../../../shared/validators/time-break-overlap.validator';
import {validateTime, validateTimeWithPeriod} from '../../../shared/validators/time-entry.validator';
import {EnterTimeFilterService} from '../enter-time-filter.service';

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
                 private _transformService: EnterTimeTransformService, private _batchService: EnterTimeBatchService,
                 private _builder: FormBuilder, private _filterService: EnterTimeFilterService) {

        this.dateFormat = 'MMM. Do, YYYY';
        this.groupCardsBy = 'Date';
        this.currentCardIndex = 0;
        this.createForm();
        // console.log(this.enterTimeGrid);
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

                    // console.log('EnterTimeGridComponent currentCardIndex', this.currentCardIndex);
                    // console.log('EnterTimeGridComponent card', card);
                    this.currentCardIndex++;
                    // this.groupedLines.push(card);
                    this.addCard(card);
                    // console.log('EnterTimeGridComponent Form', this.enterTimeGrid);
                    // this.buildCards(lines);
                    // this.groupedLines = line;
                });

        this._projectLineSubscription = this._enterTimeManager.projectRow$
            .map(r => r as LineToSubmit)
            .subscribe(
                (row) => {

                    this.addRow('projectRows', row.CardIndex, row);
                    // console.log('EnterTimeGridComponent projectRow$', row);
                    // console.log('EnterTimeGridComponent Form', this.enterTimeGrid);
                });

        this._indirectLineSubscription = this._enterTimeManager.indirectRow$
            .map(r => r as LineToSubmit)
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
        this.createForm();
        this._enterTimeManager.setGroupBy(groupBy);
    }

    public deleteCard (card, cardIndex: number) {

        const cards = this.enterTimeGrid.controls['cards']['controls'];
        cards.splice(cardIndex, 1);

        this._enterTimeManager.deleteCardGroup(<Array<FormGroup>> card.get('projectRows')['controls'],
            <Array<FormGroup>> card.get('indirectRows')['controls']);

        if (cards.length === 0) {

            this._confirmationService.setNeedsConfirmation(false);
            this.displayGrid.emit(false);
        }
    }

    public copyRow (record, card) {

        const projectRows: FormArray = card.get('projectRows')['controls'];
        const cloneRecord =  _.cloneDeep(record);
        cloneRecord.get('id').setValue(uuidv4());

        projectRows.push(cloneRecord);

        card.get('ST').setValue(card.get('ST').value + cloneRecord.get('standardHours').value);
        card.get('OT').setValue(card.get('OT').value + cloneRecord.get('overtimeHours').value);
        card.get('DT').setValue(card.get('DT').value + cloneRecord.get('doubleTimeHours').value);

        this._enterTimeManager.insertProjectLine(this._transformService.transformFormGroupToLineToSubmit(cloneRecord));
    }

    public deleteRow (record, rowIndex: number, card, cardIndex: number) {

        const projectRows: Array<FormGroup> = card.get('projectRows')['controls'];

        projectRows.splice(rowIndex, 1);

        card.get('ST').setValue(card.get('ST').value - record.get('standardHours').value);
        card.get('OT').setValue(card.get('OT').value - record.get('overtimeHours').value);
        card.get('DT').setValue(card.get('DT').value - record.get('doubleTimeHours').value);

        this._enterTimeManager.deleteProjectById(record.get('id').value);

        if (projectRows.length === 0) {

            const cards = this.enterTimeGrid.controls['cards']['controls'];
            cards.splice(cardIndex, 1);

            if (cards.length === 0) {

                this._confirmationService.setNeedsConfirmation(false);
                this.displayGrid.emit(false);
            }
        }
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

    public openProjects () {

        this.filteredProjects = Observable.of(this.projects);
    }

    public changeProject (value) {

        if (value) {

            this.filteredProjects = this._filterService.filterCollection(value, this.projects);
        } else {

            this.filteredProjects = Observable.of(this.projects);
        }
        // console.log('changeProject', value);
    }

    public projectSelected (event, record) {

        // console.log('EnterTimeFormComponent projectSelected', event, record.get('project').value);
        const project = event.option.value;

        this.checkDefaultSystem(project.Systems, record);
        this.checkDefaultCostCode(project.CostCodes, record);
        record.patchValue({
           employee: ''
        });
    }

    public openSystems (record) {

        this.filteredSystems = Observable.of((<Project>record.get('project').value).Systems);
    }

    public systemSelected (event, record) {

        const system = event.option.value;
        // console.log('EnterTimeFormComponent systemSelected', system.Phases);
        this.checkDefaultPhase(system.Phases, record);
    }

    public openPhases (record) {

        this.filteredPhases = Observable.of((<System>record.get('system').value).Phases);
    }

    // public phaseSelected (event, record) {
    //
    //     // console.log('EnterTimeFormComponent phaseSelected', event.source.value);
    //     const phase = event.source.value;
    // }

    public openEmployees(record) {

        const project = record.get('project').value as Project;

        this.filteredEmployees = Observable.of(this.filterEmployeesByProject(project.Id, this.employees));
    }

    // public employeeSelected (event, record) {
    //
    //     // console.log('EnterTimeFormComponent employeeSelected', event.source.value);
    //     const employee = event.source.value;
    //
    //     // this.enterTimeForm.patchValue({
    //     //     employees: this.selectedEmployees
    //     // });
    // }

    public openCostCodes(record) {

        this.filteredCostCodes = Observable.of((<Project>record.get('project').value).CostCodes);
    }

    // public costCodeSelected (event) {
    //
    //     const costCode = event.source.value;
    //
    // }

    public submitTime () {

        let batchPayload: Array<TimeRecord>;
        let records: Array<TimeRecord>;

        _.forEach(this.groupedLines, (group, key) => {

            records = this._transformService.transformLinesToSubmitToTimeRecords(group.ProjectLines);

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

    private createForm () {

        this.enterTimeGrid = this._builder.group({
            cards: this._builder.array([])
        });
    }

    private addCard(card: EntryCard) {

        const cards = <FormArray>this.enterTimeGrid.controls['cards'];
        const newCard = this.createCardGroup(card);

        cards.push(newCard);
    }

    private createCardGroup (card: EntryCard): FormGroup {

        return this._builder.group({
            key: card.Key,
            ST: 0,
            OT: 0,
            DT: 0,
            projectRows: this._builder.array([]),
            indirectRows: this._builder.array([])
        });
    }

    private addRow(rowGroup: string, cardIndex: number, rowData: LineToSubmit) {

        setTimeout(() => {
            const cards = <FormArray>this.enterTimeGrid.controls['cards'];
            const ST = <FormArray>cards.controls[cardIndex]['controls']['ST'];
            const OT = <FormArray>cards.controls[cardIndex]['controls']['OT'];
            const DT = <FormArray>cards.controls[cardIndex]['controls']['DT'];

            const gridCards = <FormArray>cards.controls[cardIndex]['controls'][rowGroup];

            ST.setValue(ST.value + rowData.HoursST);
            OT.setValue(OT.value + rowData.HoursOT);
            DT.setValue(DT.value + rowData.HoursDT);

            const newCardRow = this.initProjectRow(rowData);
            // console.log('addRow', cards.controls[cardIndex]);

            gridCards.push(newCardRow);
        }, 20 * cardIndex);
    }

    private initProjectRow(rowData: LineToSubmit) {

        return this._builder.group({
            id: rowData.Id,
            date: [rowData.Date, [Validators.required]],
            project: [rowData.Project, [Validators.required]],
            system: rowData.System,
            phase: rowData.Phase,
            costCode: [rowData.CostCode, [Validators.required]],
            employee: [rowData.Employee, [Validators.required]],
            standardHours: [rowData.HoursST, [Validators.required]],
            overtimeHours: rowData.HoursOT,
            doubleTimeHours: rowData.HoursDT,
            isPunch: rowData.IsPunch,
            timeEntry: this._builder.group(this.buildTimeEntryFormGroup(rowData),
                {validator: validateTimeBreakOverlap('in', 'out', 'in', 'out')}),
            notes: ''
        });
    }

    private initIndirectRow(rowData: LineToSubmit) {

        return this._builder.group({
            date: ['', [Validators.required]],
            project: ['', [Validators.required]],
            system: '',
            phase: '',
            costCode: ['', [Validators.required]],
            employee: ['', [Validators.required]],
            standardHours: ['', [Validators.required]],
            notes: ''
        });
    }

    private buildTimeEntryFormGroup (rowData: LineToSubmit) {

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

            time: this._builder.group(this.buildTimeDetailFormGroup(rowData.TimeIn, rowData.TimeOut),
                {validator: validateTime('in', 'out', 'startAfterEnd')}),
            break: this._builder.group(this.buildTimeDetailFormGroup(rowData.BreakIn, rowData.BreakOut),
                {validator: validateTime('in', 'out', 'breakStartAfterEnd')})
        };
    }

    private buildTimeDetailFormGroup (inData: string, outData: string) {

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

            in: inData,
            out: outData
        };
    }

    private checkDefaultSystem (systems: Array<System>, record) {

        console.log('checkDefaultSystem', systems.length);
        if (systems.length === 1) {

            record.patchValue({
                system: systems[0]
            });
            this.checkDefaultPhase(systems[0].Phases, record);
        } else {
            record.patchValue({
                system: '',
                phase: ''
            });
        }
    }

    private checkDefaultPhase (phases: Array<Phase>, record) {

        console.log('checkDefaultPhase', phases.length);
        if (phases.length === 1) {

            record.patchValue({
                phase: phases[0]
            });
        } else {

            record.patchValue({
                phase: ''
            });
        }
    }

    private checkDefaultCostCode (costCodes: Array<CostCode>, record) {

        console.log('checkDefaultCostCode', costCodes.length);
        if (costCodes.length === 1) {

            record.patchValue({
                costCode: costCodes[0]
            });
        } else {

            record.patchValue({
                costCode: ''
            });
        }
    }

    private filterEmployeesByProject (projectId: string, employees: Array<Employee>) {

        return _.filter(employees, function (employee) {
            return employee.ProjectIds.includes(projectId);
        });
    }

    // public employeeSelected (event, record) {
    //
    //     record.EmployeeId = event.source.value.Id;
    //     console.log(record);
    // }
}
