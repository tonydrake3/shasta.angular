import {Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import * as _ from 'lodash';
import * as moment from 'moment';
import * as uuidv4 from 'uuid/v4';

import {EnterTimeManager} from '../enter-time.manager';
import {Employee} from '../../../../models/domain/Employee';
import {Project} from '../../../../models/domain/Project';
import {CostCode} from '../../../../models/domain/CostCode';
import {BrowserMode, EntryCard} from '../models/TimeEntry';
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
import {Hours} from '../../../../models/domain/Hours';
import {DatePickerComponent, IDatePickerConfig} from 'ng2-date-picker';
import {DateFlyoutService} from '../../../shared/components/date-flyout/date-flyout.service';
import {routeName} from '../../../shared/configuration/web-route-names.configuration';
import {Router} from '@angular/router';

@Component({
    selector: 'esub-enter-time-grid',
    templateUrl: './enter-time-grid.component.html'
})
export class EnterTimeGridComponent implements OnInit, OnDestroy {

    @Output() displayGrid: EventEmitter<boolean> = new EventEmitter<boolean>();

    private _cardSubscription;
    private _projectLineSubscription;
    private _indirectLineSubscription;
    private _lineCount: number;
    private _currentLine: number;

    public dateFormat: string;
    public groupCardsBy: string;
    public groupedLines: Array<EntryCard>;
    public employees: Array<Employee>;
    public projects: Array<Project>;
    public indirectCosts: Array<CostCode>;
    public currentCardIndex: number;
    public timeSettings: TimeSettings;
    public enterTimeGrid: FormGroup;
    public browserMode: BrowserMode;
    public maxDate;

    public filteredProjects: Observable<Project[]>;
    public filteredSystems: Observable<System[]>;
    public filteredPhases: Observable<Phase[]>;
    public filteredCostCodes: Observable<CostCode[]>;
    public filteredEmployees: Observable<Employee[]>;

    public autoProject;
    public autoSystem;
    public autoPhase;
    public autoCostCode;
    public autoCostCodes;
    public autoEmployee;
    public autoIndirectEmployee;
    public autoIndirectCost;

    // Calendar Config
    public dpDatepickerConfig: IDatePickerConfig = {
        allowMultiSelect: false,
        max: moment()
    };

    constructor (private _enterTimeManager: EnterTimeManager, private _confirmationService: ConfirmationDialogService,
                 private _transformService: EnterTimeTransformService, private _batchService: EnterTimeBatchService,
                 private _builder: FormBuilder, private _filterService: EnterTimeFilterService,
                 private _router: Router) {

        this.dateFormat = 'MMM. Do, YYYY';
        this.maxDate = moment().toISOString();
        this.groupCardsBy = 'Date';
        this.currentCardIndex = 0;
        this._lineCount = 0;
        this._currentLine = 0;
        this.browserMode = this._enterTimeManager.getBrowserMode();
        this.createForm();
        // console.log(this.enterTimeGrid);
    }

    ngOnInit () {

        this.employees = this._enterTimeManager.getEmployees();
        this.projects = this._enterTimeManager.getProjects();
        this.indirectCosts = this._enterTimeManager.getIndirectCodes();
        this.groupCardsBy = this._enterTimeManager.getGroupBy();
        this.timeSettings = this._enterTimeManager.getSettings();

        this.groupedLines = [];

        this._cardSubscription = this._enterTimeManager.cards$
            .map(c => c as EntryCard)
            .subscribe(
                (card) => {

                    // console.log('EnterTimeGridComponent currentCardIndex', this.currentCardIndex);
                    // console.log('EnterTimeGridComponent card', card);
                    this._lineCount = this._enterTimeManager.getTotalLines();
                    // console.log('ngOnInit cards$', this._lineCount);
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

                    // console.log('EnterTimeGridComponent indirectRow$', row);
                    this.addRow('indirectRows', row.CardIndex, row);
                });

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
        this._currentLine = 0;
    }

    public deleteAllLines() {

        this._currentLine = 0;
        this._enterTimeManager.clearLines();
        this._confirmationService.setNeedsConfirmation(false);
        this.displayGrid.emit(false);
    }

    public updateGrouping (groupBy: string) {

        this.groupCardsBy = groupBy;
        this._currentLine = 0;
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

    public dateChange (event, record) {

        this._enterTimeManager.updateProjectLine(record.get('id').value, 'Date', moment(event));
    }

    public indirectDateChange (event, record) {

        this._enterTimeManager.updateIndirectLine(record.get('id').value, 'Date', moment(event));
    }

    public copyRow (record, card) {

        const projectRows: FormArray = card.get('projectRows')['controls'];
        const cloneRecord = _.cloneDeep(record);
        cloneRecord.get('id').setValue(uuidv4());

        const ST = card.get('ST');
        const OT = card.get('OT');
        const DT = card.get('DT');

        const stVal = Number(ST.value) + Number(cloneRecord.get('standardHours').value);
        const otVal = Number(OT.value) + Number(cloneRecord.get('overtimeHours').value);
        const dtVal = Number(DT.value) + Number(cloneRecord.get('doubleTimeHours').value);

        ST.setValue(stVal);
        OT.setValue(otVal);
        DT.setValue(dtVal);

        projectRows.push(cloneRecord);

        this._enterTimeManager.insertProjectLine(this._transformService.transformFormGroupToLineToSubmit(cloneRecord));
    }

    public deleteRow (record, rowIndex: number, card, cardIndex: number) {

        const projectRows: Array<FormGroup> = card.get('projectRows')['controls'];
        const indirectRows: Array<FormGroup> = card.get('indirectRows')['controls'];

        projectRows.splice(rowIndex, 1);

        card.get('ST').setValue(card.get('ST').value - record.get('standardHours').value);
        card.get('OT').setValue(card.get('OT').value - record.get('overtimeHours').value);
        card.get('DT').setValue(card.get('DT').value - record.get('doubleTimeHours').value);

        this._enterTimeManager.deleteProjectById(record.get('id').value);

        if (projectRows.length === 0 && indirectRows.length === 0) {

            const cards = this.enterTimeGrid.controls['cards']['controls'];
            cards.splice(cardIndex, 1);

            if (cards.length === 0) {

                this._confirmationService.setNeedsConfirmation(false);
                this.displayGrid.emit(false);
            }
        }
    }

    public copyIndirectRow (record, card) {

        const indirectRows: FormArray = card.get('indirectRows')['controls'];
        const cloneRecord =  _.cloneDeep(record);
        cloneRecord.get('id').setValue(uuidv4());

        const ST = card.get('ST');

        const stVal = Number(ST.value) + Number(cloneRecord.get('standardHours').value);

        ST.setValue(stVal);

        indirectRows.push(cloneRecord);

        this._enterTimeManager.insertIndirectLine(this._transformService.transformIndirectFormGroupToLineToSubmit(cloneRecord));
    }

    public deleteIndirectRow (record, rowIndex: number, card, cardIndex: number) {

        const projectRows: Array<FormGroup> = card.get('projectRows')['controls'];
        const indirectRows: Array<FormGroup> = card.get('indirectRows')['controls'];

        indirectRows.splice(rowIndex, 1);

        card.get('ST').setValue(card.get('ST').value - record.get('standardHours').value);

        this._enterTimeManager.deleteIndirectById(record.get('id').value);

        if (projectRows.length === 0 && indirectRows.length === 0) {

            const cards = this.enterTimeGrid.controls['cards']['controls'];
            cards.splice(cardIndex, 1);

            if (cards.length === 0) {

                this._confirmationService.setNeedsConfirmation(false);
                this.displayGrid.emit(false);
            }
        }
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

        this._enterTimeManager.updateProjectLine(record.get('id').value, 'Project', project);
        this.checkDefaultSystem(project.Systems, record);
        this.checkDefaultCostCode(project.CostCodes, record);
        record.patchValue({
           employee: ''
        });
    }

    public openSystems (record) {

        this.filteredSystems = Observable.of((<Project>record.get('project').value).Systems);
    }

    public changeSystem (value, record) {

        if (value) {

            this.filteredSystems = this._filterService.filterCollection(value, (<Project>record.get('project').value).Systems);
        } else {

            this.filteredSystems = Observable.of((<Project>record.get('project').value).Systems);
        }
    }

    public systemSelected (event, record) {

        const system = event.option.value;
        this._enterTimeManager.updateProjectLine(record.get('id').value, 'System', system);
        // console.log('EnterTimeFormComponent systemSelected', system.Phases);
        this.checkDefaultPhase(system.Phases, record);
    }

    public openPhases (record) {

        this.filteredPhases = Observable.of((<System>record.get('system').value).Phases);
    }

    public changePhase (value, record) {

        if (value) {

            this.filteredSystems = this._filterService.filterCollection(value, (<System>record.get('system').value).Phases);
        } else {

            this.filteredSystems = Observable.of((<System>record.get('system').value).Phases);
        }
    }

    public phaseSelected (event, record) {

        const phase = event.option.value;
        this._enterTimeManager.updateProjectLine(record.get('id').value, 'Phase', phase);
    }

    public openEmployees (record) {

        const project = record.get('project').value as Project;

        this.filteredEmployees = Observable.of(this.filterEmployeesByProject(project.Id, this.employees));
    }

    public changeEmployee (value, record) {

        const project = record.get('project').value as Project;

        if (value) {

            this.filteredEmployees = this._filterService.filterCollection(value, this.filterEmployeesByProject(project.Id, this.employees));
        } else {

            this.filteredEmployees = Observable.of(this.filterEmployeesByProject(project.Id, this.employees));
        }
    }

    public employeeSelected (event, record) {

        const employee = event.option.value;
        this._enterTimeManager.updateProjectLine(record.get('id').value, 'Employee', employee);
    }

    public openIndirectEmployees () {

        this.filteredEmployees = Observable.of(this.employees);
    }

    public changeIndirectEmployee (value) {

        if (value) {

            this.filteredEmployees = this._filterService.filterCollection(value, this.employees);
        } else {

            this.filteredEmployees = Observable.of(this.employees);
        }
    }

    public indirectEmployeeSelected (event, record) {

        const employee = event.option.value;
        this._enterTimeManager.updateIndirectLine(record.get('id').value, 'Employee', employee);
    }

    public openCostCodes (record) {

        this.filteredCostCodes = Observable.of((<Project>record.get('project').value).CostCodes);
    }

    public changeCostCodes (value, record) {

        if (value) {

            this.filteredCostCodes = this._filterService.filterCollection(value, (<Project>record.get('project').value).CostCodes);
        } else {

            this.filteredCostCodes = Observable.of((<Project>record.get('project').value).CostCodes);
        }
    }

    public costCodeSelected (event, record) {

        const costCode = event.option.value;
        this._enterTimeManager.updateProjectLine(record.get('id').value, 'CostCode', costCode);
    }

    public openIndirectCostCodes () {

        this.filteredCostCodes = Observable.of(this.indirectCosts);
    }

    public changeIndirectCostCodes (value) {

        if (value) {

            this.filteredCostCodes = this._filterService.filterIndirectCodes(value, this.indirectCosts);
        } else {

            this.filteredCostCodes = Observable.of(this.indirectCosts);
        }
    }

    public indirectCostSelected (event, record) {

        const indirectCost = event.option.value;
        this._enterTimeManager.updateIndirectLine(record.get('id').value, 'CostCode', indirectCost);
        this._enterTimeManager.updateIndirectLine(record.get('id').value, 'IndirectCostId', indirectCost.Id);
    }

    public onTimeChange (event, record, type: string, prefix: string) {

        record.controls.timeEntry['controls'][type].get(prefix + 'Value').setValue(event);
    }

    public onTimePeriodChange (event, record, type: string, prefix: string) {

        record.controls.timeEntry['controls'][type].get(prefix + 'Period').setValue(event);
    }

    public submitTime () {

        console.log('Submit');
        const projectLines = this._enterTimeManager.getProjectLines();
        const indirectLines = this._enterTimeManager.getIndirectLines();

        let batchPayload: Array<TimeRecord> = [];
        // let records: Array<TimeRecord>;

        if (projectLines.length > 0) {

            batchPayload = _.concat(batchPayload, this._transformService.transformLinesToSubmitToTimeRecords(projectLines));
        }

        if (indirectLines.length > 0) {

            batchPayload = _.concat(batchPayload, this._transformService.transformIndirectLinesToSubmitToTimeRecords(indirectLines))
        }

        this._batchService.submitBatchTime(batchPayload)
            .then((response) => {

                // console.log('submitBatchTime', response);
                this._confirmationService.setNeedsConfirmation(false);
                this._enterTimeManager.clearLines();
                this._router.navigate([routeName.time]);
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

        // console.log('addRow', cardIndex);
        setTimeout(() => {
            const cards = <FormArray>this.enterTimeGrid.controls['cards'];
            const ST = <FormArray>cards.controls[cardIndex]['controls']['ST'];
            const OT = <FormArray>cards.controls[cardIndex]['controls']['OT'];
            const DT = <FormArray>cards.controls[cardIndex]['controls']['DT'];

            const gridCards = <FormArray>cards.controls[cardIndex]['controls'][rowGroup];

            ST.setValue(ST.value + rowData.HoursST);
            OT.setValue(OT.value + rowData.HoursOT);
            DT.setValue(DT.value + rowData.HoursDT);

            let newCardRow;

            if (rowGroup === 'projectRows') {

                newCardRow = this.initProjectRow(rowData);

                if (this.browserMode.IsUnsupportedBrowser) {

                    this.unsupportedTimeChanges(newCardRow);
                } else {

                    this.timeChanges(newCardRow);
                }

                this.standardHourChanges(newCardRow, ST);
                this.overtimeHourChanges(newCardRow, OT);
                this.doubleTimeHourChanges(newCardRow, DT);
            } else {

                newCardRow = this.initIndirectRow(rowData);
                this.indirectStandardHourChanges(newCardRow, ST);
            }

            gridCards.push(newCardRow);
            this.trackProcessing();
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
            standardHours: [rowData.HoursST.toFixed(2), [Validators.required]],
            previousStandardHours: rowData.HoursST.toFixed(2),
            overtimeHours: rowData.HoursOT.toFixed(2),
            previousOvertimeHours: rowData.HoursOT.toFixed(2),
            doubleTimeHours: rowData.HoursDT.toFixed(2),
            previousDoubleTimeHours: rowData.HoursDT.toFixed(2),
            isPunch: rowData.IsPunch,
            timeEntry: this._builder.group(this.buildTimeEntryFormGroup(rowData),
                {validator: validateTimeBreakOverlap('in', 'out', 'in', 'out')}),
            notes: ''
        });
    }

    private initIndirectRow(rowData: LineToSubmit) {

        return this._builder.group({
            id: rowData.Id,
            date: [rowData.Date, [Validators.required]],
            costCode: [rowData.CostCode, [Validators.required]],
            employee: [rowData.Employee, [Validators.required]],
            standardHours: [rowData.HoursST.toFixed(2), [Validators.required]],
            previousStandardHours: rowData.HoursST.toFixed(2),
            notes: ''
        });
    }

    private buildTimeEntryFormGroup (rowData: LineToSubmit) {

        if (this.browserMode.IsUnsupportedBrowser) {

            // console.log('buildTimeEntryFormGroup', rowData);

            return {

                time: this._builder.group(this.buildTimeDetailFormGroup(rowData.TimeIn, rowData.TimeOut),
                    {validator: validateTimeWithPeriod('in', 'out', 'startAfterEnd')}),
                break: this._builder.group(this.buildTimeDetailFormGroup(rowData.BreakIn, rowData.BreakOut),
                    {validator: validateTimeWithPeriod('in', 'out', 'breakStartAfterEnd')})
            };
        }
        return {

            time: this._builder.group(this.buildTimeDetailFormGroup(rowData.TimeIn, rowData.TimeOut),
                {validator: validateTime('in', 'out', 'startAfterEnd')}),
            break: this._builder.group(this.buildTimeDetailFormGroup(rowData.BreakIn, rowData.BreakOut),
                {validator: validateTime('in', 'out', 'breakStartAfterEnd')})
        };
    }

    private buildTimeDetailFormGroup (inData: string, outData: string) {

        if (this.browserMode.IsUnsupportedBrowser) {

            const inMoment = moment(inData, ['hh:mm']);
            const outMoment = moment(outData, ['hh:mm']);

            return {

                inValue: inMoment.format('h:mm'),
                inPeriod: inMoment.format('A'),
                outValue: outMoment.format('h:mm'),
                outPeriod: outMoment.format('A')
            };
        }
        return {

            in: inData,
            out: outData
        };
    }

    private checkDefaultSystem (systems: Array<System>, record) {

        // console.log('checkDefaultSystem', systems.length);
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

        // console.log('checkDefaultPhase', phases.length);
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

        // console.log('checkDefaultCostCode', costCodes.length);
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

    private calculateHours (timeIn: string, breakInTime: string, breakOutTime: string, timeOut: string): Hours {

        let timeDuration, breakDuration;
        const hours = new Hours();

        timeDuration = this.calculateDuration(timeIn, timeOut);

        breakDuration = this.calculateDuration(breakInTime, breakOutTime);

        if (breakDuration.asMilliseconds() > 0) {

            timeDuration = timeDuration.subtract(breakDuration);
        }

        // console.log('calculateHours', timeDuration.hours(), this.timeSettings.Overridable.OvertimeThresholdDaily);
        if (timeDuration.asMilliseconds() > 0 &&
            ((timeDuration.hours() + (timeDuration.minutes() / 60)) > this.timeSettings.Overridable.OvertimeThresholdDaily)) {

            hours.RegularTime = this.timeSettings.Overridable.OvertimeThresholdDaily;
            hours.Overtime = (timeDuration.hours() + (timeDuration.minutes() / 60)) -
                this.timeSettings.Overridable.OvertimeThresholdDaily;
        } else if (timeDuration) {

            hours.RegularTime = timeDuration.hours() + (timeDuration.minutes() / 60);
            hours.Overtime = 0;
        }

        return hours;
    }

    private calculateDuration (inValue: string, outValue: string): moment.Duration {

        if (inValue && outValue) {

            const momentIn = moment(inValue, ['HH:mm']);
            const momentOut = moment(outValue, ['HH:mm']);

            if (momentIn.isValid() && momentOut.isValid() && momentIn.isBefore(momentOut)) {

                return moment.duration(momentOut.diff(momentIn));
            }
        }
        return moment.duration(0);
    }

    private processTimeChanges (fieldValue, previousValue, fieldControl, cardControl, id, isProject: boolean) {

        // console.log('Number(fieldValue)', Number(fieldValue));
        // console.log('fieldControl.value', fieldControl.value);
        // console.log('cardControl.value', Number(cardControl.value));
        // console.log('previousValue.value', previousValue.value);

        const numberValue = Number(fieldValue);
        if (numberValue === 0) {

            fieldControl.setErrors({ 'invalid': true });
        } else if (fieldValue) {

            // console.log('Number(cardControl.value) - this.currentHours', Number(cardControl.value) - this.currentHours);
            // console.log('Number(cardControl.value) + numberValue', Number(cardControl.value) + numberValue);
            cardControl.setValue(Number(cardControl.value) - Number(previousValue.value));
            cardControl.setValue(Number(cardControl.value) + numberValue);
            previousValue.setValue(fieldValue);

            if (isProject) {

                this._enterTimeManager.updateProjectLine(id, 'HoursST', numberValue);
            } else {

                this._enterTimeManager.updateIndirectLine(id, 'HoursST', numberValue);
            }

            fieldControl.setErrors(null);
        }
    }

    private processExtraTimeChanges (fieldValue, previousValue, fieldControl, cardControl, id, fieldName) {

        const numberValue = Number(fieldValue);
        if (fieldValue || fieldValue === 0) {

            cardControl.setValue(Number(cardControl.value) - Number(previousValue.value));
            cardControl.setValue(Number(cardControl.value) + numberValue);
            previousValue.setValue(fieldValue);
            this._enterTimeManager.updateProjectLine(id, fieldName, numberValue);
            fieldControl.setErrors(null);
        }
    }

    private convertToTime (valuePart: string, periodPart: string): string {

        return moment(valuePart + ' ' + periodPart, ['h:mm A']).format('HH:mm');
    }

    private trackProcessing () {

        this._currentLine++;
        // console.log('trackProcessing', this._currentLine);
        if (this._currentLine === this._lineCount) {
            // console.log('trackProcessing', this._currentLine);
            this._enterTimeManager.setProcessing(false);
        }
    }

    /******************************************************************************************************************
     * Form Field Change Tracking
     ******************************************************************************************************************/
    private timeChanges (row: FormGroup) {
        //
        // console.log('timeChanges', row);

        const timeEntry = row.controls.timeEntry;
        const stdHrs = row.get('standardHours');
        const otHrs = row.get('overtimeHours');
        const id = row.get('id').value;

        const timeGroup = timeEntry['controls']['time'];
        const breakGroup = timeEntry['controls']['break'];

        const timeIn = timeGroup.get('in');
        const timeOut = timeGroup.get('out');
        const breakIn = breakGroup.get('in');
        const breakOut = breakGroup.get('out');

        timeIn.valueChanges.subscribe(

            (value) => {

                const hours = this.calculateHours(value, breakIn.value, breakOut.value, timeOut.value);
                if (moment(value, ['hh:mm']).isValid()) {

                    this._enterTimeManager.updateProjectLine(id, 'TimeIn', value);
                }
                stdHrs.setValue(hours.RegularTime.toFixed(2));
                otHrs.setValue(hours.Overtime.toFixed(2));
            }
        );

        timeOut.valueChanges.subscribe(

            (value) => {

                const hours = this.calculateHours(timeIn.value, breakIn.value, breakOut.value, value);
                if (moment(value, ['hh:mm']).isValid()) {

                    this._enterTimeManager.updateProjectLine(id, 'TimeOut', value);
                }
                stdHrs.setValue(hours.RegularTime.toFixed(2));
                otHrs.setValue(hours.Overtime.toFixed(2));
            }
        );

        breakIn.valueChanges.subscribe(

            (value) => {

                const hours = this.calculateHours(timeIn.value, value, breakOut.value, timeOut.value);
                if (moment(value, ['hh:mm']).isValid()) {

                    this._enterTimeManager.updateProjectLine(id, 'BreakIn', value);
                }
                stdHrs.setValue(hours.RegularTime.toFixed(2));
                otHrs.setValue(hours.Overtime.toFixed(2));
            }
        );

        breakOut.valueChanges.subscribe(

            (value) => {

                const hours = this.calculateHours(timeIn.value, breakIn.value, value, timeOut.value);
                if (moment(value, ['hh:mm']).isValid()) {

                    this._enterTimeManager.updateProjectLine(id, 'BreakOut', value);
                }
                stdHrs.setValue(hours.RegularTime.toFixed(2));
                otHrs.setValue(hours.Overtime.toFixed(2));
            }
        );
    }

    private unsupportedTimeChanges (row: FormGroup) {

        // console.log('unsupportedTimeChanges', row);
        const timeEntry = row.controls.timeEntry;
        const stdHrs = row.get('standardHours');
        const otHrs = row.get('overtimeHours');
        const id = row.get('id').value;

        const timeGroup = timeEntry['controls']['time'];
        const breakGroup = timeEntry['controls']['break'];

        const timeInValue = timeGroup.get('inValue');
        const timeInPeriod = timeGroup.get('inPeriod');
        const timeOutValue = timeGroup.get('outValue');
        const timeOutPeriod = timeGroup.get('outPeriod');
        const breakInValue = breakGroup.get('inValue');
        const breakInPeriod = breakGroup.get('inPeriod');
        const breakOutValue = breakGroup.get('outValue');
        const breakOutPeriod = breakGroup.get('outPeriod');

        timeInValue.valueChanges.subscribe(

            (value) => {

                // console.log('timeInValue.valueChanges', value);
                if (moment(this.convertToTime(value, timeInPeriod.value), ['HH:mm']).isValid()) {
                    const hours = this.calculateHours(this.convertToTime(value, timeInPeriod.value),
                        this.convertToTime(breakInValue.value, breakInPeriod.value),
                        this.convertToTime(breakOutValue.value, breakOutPeriod.value),
                        this.convertToTime(timeOutValue.value, timeOutPeriod.value));
                    this._enterTimeManager.updateProjectLine(id, 'TimeIn', this.convertToTime(value, timeInPeriod.value));
                    stdHrs.setValue(hours.RegularTime.toFixed(2));
                    otHrs.setValue(hours.Overtime.toFixed(2));
                }
            }
        );

        timeInPeriod.valueChanges.subscribe(

            (value) => {

                // console.log('timeInPeriod.valueChanges', value);
                if (moment(this.convertToTime(timeInValue.value, value), ['HH:mm']).isValid()) {
                    const hours = this.calculateHours(this.convertToTime(timeInValue.value, value),
                        this.convertToTime(breakInValue.value, breakInPeriod.value),
                        this.convertToTime(breakOutValue.value, breakOutPeriod.value),
                        this.convertToTime(timeOutValue.value, timeOutPeriod.value));
                    this._enterTimeManager.updateProjectLine(id, 'TimeIn', this.convertToTime(timeInValue.value, value));
                    stdHrs.setValue(hours.RegularTime.toFixed(2));
                    otHrs.setValue(hours.Overtime.toFixed(2));
                }
            }
        );

        timeOutValue.valueChanges.subscribe(

            (value) => {

                // console.log('timeInValue.valueChanges', value);
                if (moment(this.convertToTime(value, timeOutPeriod.value), ['HH:mm']).isValid()) {
                    const hours = this.calculateHours(this.convertToTime(timeInValue.value, timeInPeriod.value),
                        this.convertToTime(breakInValue.value, breakInPeriod.value),
                        this.convertToTime(breakOutValue.value, breakOutPeriod.value),
                        this.convertToTime(value, timeOutPeriod.value));
                    this._enterTimeManager.updateProjectLine(id, 'TimeOut', this.convertToTime(value, timeOutPeriod.value));
                    stdHrs.setValue(hours.RegularTime.toFixed(2));
                    otHrs.setValue(hours.Overtime.toFixed(2));
                }
            }
        );

        timeOutPeriod.valueChanges.subscribe(

            (value) => {

                // console.log('timeInPeriod.valueChanges', value);
                if (moment(this.convertToTime(timeOutValue.value, value), ['HH:mm']).isValid()) {
                    const hours = this.calculateHours(this.convertToTime(timeInValue.value, timeInPeriod.value),
                        this.convertToTime(breakInValue.value, breakInPeriod.value),
                        this.convertToTime(breakOutValue.value, breakOutPeriod.value),
                        this.convertToTime(timeOutValue.value, value));
                    this._enterTimeManager.updateProjectLine(id, 'TimeOut', this.convertToTime(timeOutValue.value, value));
                    stdHrs.setValue(hours.RegularTime.toFixed(2));
                    otHrs.setValue(hours.Overtime.toFixed(2));
                }
            }
        );

        breakInValue.valueChanges.subscribe(

            (value) => {

                // console.log('timeInValue.valueChanges', value);
                if (moment(this.convertToTime(value, breakInPeriod.value), ['HH:mm']).isValid()) {
                    const hours = this.calculateHours(this.convertToTime(timeInValue.value, timeInPeriod.value),
                        this.convertToTime(value, breakInPeriod.value),
                        this.convertToTime(breakOutValue.value, breakOutPeriod.value),
                        this.convertToTime(timeOutValue.value, timeOutPeriod.value));
                    this._enterTimeManager.updateProjectLine(id, 'BreakIn', this.convertToTime(value, breakInPeriod.value));
                    stdHrs.setValue(hours.RegularTime.toFixed(2));
                    otHrs.setValue(hours.Overtime.toFixed(2));
                }
            }
        );

        breakInPeriod.valueChanges.subscribe(

            (value) => {

                // console.log('timeInPeriod.valueChanges', value);
                if (moment(this.convertToTime(breakInValue.value, value), ['HH:mm']).isValid()) {
                    const hours = this.calculateHours(this.convertToTime(timeInValue.value, timeInPeriod.value),
                        this.convertToTime(breakInValue.value, value),
                        this.convertToTime(breakOutValue.value, breakOutPeriod.value),
                        this.convertToTime(timeOutValue.value, timeOutPeriod.value));
                    this._enterTimeManager.updateProjectLine(id, 'BreakIn', this.convertToTime(breakInValue.value, value));
                    stdHrs.setValue(hours.RegularTime.toFixed(2));
                    otHrs.setValue(hours.Overtime.toFixed(2));
                }
            }
        );

        breakOutValue.valueChanges.subscribe(

            (value) => {

                // console.log('timeInValue.valueChanges', value);
                if (moment(this.convertToTime(value, breakOutPeriod.value), ['HH:mm']).isValid()) {
                    const hours = this.calculateHours(this.convertToTime(timeInValue.value, timeInPeriod.value),
                        this.convertToTime(breakInValue.value, breakInPeriod.value),
                        this.convertToTime(value, breakOutPeriod.value),
                        this.convertToTime(timeOutValue.value, timeOutPeriod.value));
                    this._enterTimeManager.updateProjectLine(id, 'BreakOut', this.convertToTime(value, breakOutPeriod.value));
                    stdHrs.setValue(hours.RegularTime.toFixed(2));
                    otHrs.setValue(hours.Overtime.toFixed(2));
                }
            }
        );

        breakOutPeriod.valueChanges.subscribe(

            (value) => {

                // console.log('timeInPeriod.valueChanges', value);
                if (moment(this.convertToTime(breakOutValue.value, value), ['HH:mm']).isValid()) {
                    const hours = this.calculateHours(this.convertToTime(timeInValue.value, timeInPeriod.value),
                        this.convertToTime(breakInValue.value, breakInPeriod.value),
                        this.convertToTime(breakOutValue.value, value),
                        this.convertToTime(timeOutValue.value, timeOutPeriod.value));
                    this._enterTimeManager.updateProjectLine(id, 'BreakOut', this.convertToTime(breakOutValue.value, value));
                    stdHrs.setValue(hours.RegularTime.toFixed(2));
                    otHrs.setValue(hours.Overtime.toFixed(2));
                }
            }
        );
    }

    private standardHourChanges (row: FormGroup, stdCardHrs) {

        const stdHrs = row.get('standardHours');
        const prevStdHrs = row.get('previousStandardHours');
        const id = row.get('id').value;

        stdHrs.valueChanges.subscribe(

            (stValue) => {

                this.processTimeChanges(stValue, prevStdHrs, stdHrs, stdCardHrs, id, true);
            }
        );
    }

    private indirectStandardHourChanges (row: FormGroup, stdCardHrs) {

        const stdHrs = row.get('standardHours');
        const prevStdHrs = row.get('previousStandardHours');
        const id = row.get('id').value;

        stdHrs.valueChanges.subscribe(

            (stValue) => {

                this.processTimeChanges(stValue, prevStdHrs, stdHrs, stdCardHrs, id, false);
            }
        );
    }

    private overtimeHourChanges (row: FormGroup, otCardHrs) {

        const otHrs = row.get('overtimeHours');
        const prevOtHrs = row.get('previousOvertimeHours');
        const id = row.get('id').value;

        otHrs.valueChanges.subscribe(

            (otValue) => {

                this.processExtraTimeChanges(otValue, prevOtHrs, otHrs, otCardHrs, id, 'HoursOT');
            }
        );
    }

    private doubleTimeHourChanges (row: FormGroup, dtCardHrs) {

        const dtHrs = row.get('doubleTimeHours');
        const prevDtHrs = row.get('previousDoubleTimeHours');
        const id = row.get('id').value;

        dtHrs.valueChanges.subscribe(

            (dtValue) => {

                this.processExtraTimeChanges(dtValue, prevDtHrs, dtHrs, dtCardHrs, id, 'HoursDT');
            }
        );
    }
}
