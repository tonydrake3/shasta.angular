import {AfterViewInit, Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import * as moment from 'moment';
import * as _ from 'lodash';
import { IDatePickerConfig } from 'ng2-date-picker';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';

// Models
import { Project } from '../../../../models/domain/Project';
import { Employee } from '../../../../models/domain/Employee';
import { CostCode } from '../../../../models/domain/CostCode';
import { System } from '../../../../models/domain/System';
import { Phase } from '../../../../models/domain/Phase';

import {EnterTimeManager} from '../enter-time.manager';
import {BrowserMode, TimeEntry} from '../models/TimeEntry';
import {TimeEntryMode} from '../models/TimeEntry';
import {DateFlyoutService} from '../../../shared/components/date-flyout/date-flyout.service';
import {Observable} from 'rxjs/Observable';
import {ConfirmationDialogService} from '../../../shared/services/confirmation-dialog.service';
import {EnterTimePreloadManager} from '../enter-time-preload.manager';
import {validateTime, validateTimeWithPeriod} from '../../../shared/validators/time-entry.validator';
import {validateTimeBreakOverlap} from '../../../shared/validators/time-break-overlap.validator';
import {TimeSettings} from '../../../../models/domain/TimeSettings';
import {EnterTimeFormTab, enterTimeTabs} from '../models/EnterTimeMenu';
import {EnterTimeFilterService} from '../enter-time-filter.service';
import {concatStatic} from 'rxjs/operator/concat';
import {EntityDisplayFormatterService} from '../../../shared/services/entity-display-formatter.service';

@Component({
    selector: 'esub-enter-time-form',
    templateUrl: './enter-time-form.component.html'
})
export class EnterTimeFormComponent implements OnInit, AfterViewInit, OnDestroy {

    @Output() timeEntryComplete: EventEmitter<boolean> = new EventEmitter<boolean>();

    // Private
    private _tenantEmployees: Array<Employee>;
    private _indirectCodes: Array<CostCode>;

    // Public
    public enterTimeForm: FormGroup;
    public dateFormat: string;
    public projects: Array<Project>;
    public costCodes: Array<CostCode>;
    public employees: Array<Employee>;
    public systems: Array<System>;
    public phases: Array<Phase>;
    public selectedDates: Array<moment.Moment>;
    public time: TimeEntry;
    public timeEntryModeEnum;
    public isTimeIn: boolean;
    public isEmployeeSelectionVisible: boolean;
    public isProjectCostEntry: boolean;
    public enterTimeTabIndex: number;
    public isUnsupportedTime: boolean;
    public isIE: boolean;
    public progressConfig;
    public timeSettings: TimeSettings;
    public tabs: Array<EnterTimeFormTab>;

    public filteredProjects: Observable<Project[]>;
    public filteredSystems: Observable<System[]>;
    public filteredPhases: Observable<Phase[]>;
    public filteredCostCodes: Observable<CostCode[]>;
    public filteredEmployees: Observable<Employee[]>;

    public selectedEmployees: Array<Employee>;
    public costCodePlaceholder: string;

    public autoProject;
    public autoSystem;
    public autoPhase;
    public autoCostCode;
    public autoEmployee;

    // Calendar Config
    public dpDatepickerConfig: IDatePickerConfig = {
        allowMultiSelect: true,
        max: moment()
    };

    constructor (private _builder: FormBuilder,
                 private _enterTimeManager: EnterTimeManager,
                 private _dateFlyoutService: DateFlyoutService,
                 private _confirmationService: ConfirmationDialogService,
                 private _preloadService: EnterTimePreloadManager,
                 private _filterService: EnterTimeFilterService,
                 public entityFormatter: EntityDisplayFormatterService
                 ) {

        this.progressConfig = {
            color: 'primary',
            mode: 'indeterminate',
            value: 0
        };
        this.isUnsupportedTime = false;
        this.isIE = false;
        this.dateFormat = 'MMM. Do, YYYY';
        this.costCodePlaceholder = 'Cost Code';
        this.isEmployeeSelectionVisible = true;
        this.isProjectCostEntry = true;
        this.enterTimeTabIndex = 0;
        this.isTimeIn = false;
        this._enterTimeManager.setTimeEntryMode(TimeEntryMode.Hours);
        this.timeEntryModeEnum = TimeEntryMode;
        this.selectedDates = [];
        this.time = new TimeEntry();
        this.projects = [];
        this.systems = [];
        this.phases = [];
        this.employees = [];
        this._tenantEmployees = [];
        this.selectedEmployees = [];
        this.costCodes = [];
        this._indirectCodes = [];
        this.timeSettings = null;
        this.detectBrowser();
        this.createForm();
    }

    /******************************************************************************************************************
     * Lifecycle Methods
     ******************************************************************************************************************/
    ngOnInit () {

        this.projects = this._enterTimeManager.getProjects();
        this._tenantEmployees = this._enterTimeManager.getEmployees();
        this._indirectCodes = this._enterTimeManager.getIndirectCodes();
        this.timeSettings = this._enterTimeManager.getSettings();

        this._preloadService.loading$
            .subscribe(
                (loading) => {

                    if (loading === false) {
                        this.projects = this._enterTimeManager.getProjects();
                        this._tenantEmployees = this._enterTimeManager.getEmployees();
                        this._indirectCodes = this._enterTimeManager.getIndirectCodes();
                        this.timeSettings = this._enterTimeManager.getSettings();
                        this.tabs = this.getTabs();
                    }
                });

        if (this.projects.length === 0 || this._tenantEmployees.length === 0 || this._indirectCodes.length === 0 ||
            _.isNull(this.timeSettings)) {

            this._preloadService.startLoading();
            // this._preloadService.load();
        } else {

            this.tabs = this.getTabs();
        }
    }

    ngOnDestroy () {

    }

    ngAfterViewInit () {

    }

    /******************************************************************************************************************
     * Callback Handler
     ******************************************************************************************************************/


    /******************************************************************************************************************
     * Public Methods
     ******************************************************************************************************************/
    public getTabs() {

        if (this.timeSettings.Overridable.IsPunchInPunchOutEnabled) {
            return enterTimeTabs;
        }

        return _.filter(enterTimeTabs, (tab) => {
           return tab.Index !== 1;
        });
    }

    // TODO: Refactor to include settings as properties in tab object
    public selectTab(event) {

        // console.log(event);
        switch (event.tab.textLabel.toLowerCase()) {
            case 'enter hours':
                this.isProjectCostEntry = true;
                this.isTimeIn = false;
                this.costCodePlaceholder = 'Cost Code';
                this._enterTimeManager.setTimeEntryMode(TimeEntryMode.Hours);
                this.clearForm();
                break;
            case 'enter time in/time out':
                this.isProjectCostEntry = true;
                this.isTimeIn = true;
                this.costCodePlaceholder = 'Cost Code';
                this._enterTimeManager.setTimeEntryMode(TimeEntryMode.TimeInTimeOut);
                this.clearForm();
                break;
            case 'enter indirect costs':
                this.isProjectCostEntry = false;
                this.isTimeIn = false;
                this.costCodePlaceholder = 'Indirect Cost';
                this._enterTimeManager.setTimeEntryMode(TimeEntryMode.Hours);
                this.clearForm();
                break;
        }
    }

    public onDatesChanged (event) {

        if (event.length !== 0) {

            this.enterTimeForm.markAsDirty();

            let dateFieldValue: string;
            if (event.length > 1) {

                dateFieldValue = event.length + ' dates selected';
            } else {

                dateFieldValue = event[0].format(this.dateFormat);
            }
            this.enterTimeForm.patchValue({
                dates: dateFieldValue
            });
            this._enterTimeManager.setSelectedDates(event);

        } else if (this.enterTimeForm.get('dates').value && event.length === 0) {

            this.enterTimeForm.patchValue({
                dates: ''
            });
        }
    }

    public selectAllEmployees() {

        this.selectedEmployees = [];

        if (this.employees.length > 0) {

            this.employees.forEach((employee) => {
                this.selectedEmployees.push(employee);
            });
        } else {

            this._tenantEmployees.forEach((employee) => {
                this.selectedEmployees.push(employee);
            });
        }

        this.enterTimeForm.patchValue({
           employees: this.selectedEmployees
        });
    }

    public clearEmployeeSelection() {
        this.selectedEmployees = [];
        this.enterTimeForm.patchValue({
            employees: this.selectedEmployees
        });
    }

    public toggleSelectedEmployees () {

        this.isEmployeeSelectionVisible = !this.isEmployeeSelectionVisible;
    }

    public openProjects (value) {

        if (value) {

            this.filteredProjects = this._filterService.filterCollection(value, this.projects);
        } else {

            this.filteredProjects = Observable.of(this.projects);
        }
    }

    public projectSelected (event) {

        this.enterTimeForm.patchValue({
            selectedProject: event.option.value
        });
    }

    public openSystems (value) {

        if (value) {

            this.filteredSystems = this._filterService.filterCollection(value, this.systems);
        } else {

            this.filteredSystems = Observable.of(this.systems);
        }
    }

    public systemSelected (event) {

        this.enterTimeForm.patchValue({
            selectedSystem: event.option.value
        });
    }

    public openPhases (value) {

        if (value) {

            this.filteredPhases = this._filterService.filterCollection(value, this.phases);
        } else {

            this.filteredPhases = Observable.of(this.phases);
        }
    }

    public phaseSelected (event) {

        this.enterTimeForm.patchValue({
            selectedPhase: event.option.value
        });
    }

    public openCostCodes (value) {

        const selectedProject = this.enterTimeForm.get('selectedProject');

        if (this.costCodes.length > 0) {

            if (value) {

                this.filteredCostCodes = this._filterService.filterProjectCodes(value, selectedProject.value);
            } else {

                this.filteredCostCodes = Observable.of(this.costCodes);
            }
        } else {

            if (value) {

                this.filteredCostCodes = this._filterService.filterIndirectCodes(value, this._indirectCodes);
            } else {

                this.filteredCostCodes = Observable.of(this._indirectCodes);
            }
        }
    }

    public costCodeSelected (event) {

        this.enterTimeForm.patchValue({
            selectedCostCode: event.option.value
        });
    }

    public openEmployee (value) {

        if (value) {

            if (this.employees.length > 0) {

                this.filteredEmployees = this._filterService.filterEmployees(value, this.employees,
                    this.selectedEmployees);
            } else {

                this.filteredEmployees = this._filterService.filterEmployees(value, this._tenantEmployees,
                    this.selectedEmployees);
            }
        } else {

            if (this.employees.length > 0) {

                if (this.selectedEmployees.length > 0) {

                    this.filteredEmployees = this._filterService.filterEmployees('', this.employees, this.selectedEmployees);
                } else {

                    this.filteredEmployees = Observable.of(this.employees);
                }

            } else {

                // console.log('openEmployee', this._tenantEmployees);
                this.filteredEmployees = Observable.of(this._tenantEmployees);
            }
        }
    }

    public employeeSelected (event) {

        // console.log('EnterTimeFormComponent employeeSelected', event.source.value);
        const employee = event.option.value;

        this.selectedEmployees.push(employee);
        this.enterTimeForm.patchValue({
            employees: this.selectedEmployees
        });
        const employeeSelect = this.enterTimeForm.get('employee');
        employeeSelect.setValue(null);
    }

    public removeEmployee (employee) {
        // console.log(employee);

        this.removeFromCollection(employee, this.selectedEmployees);
        this.enterTimeForm.patchValue({
            employees: this.selectedEmployees
        });
    }

    public clearKeystroke (event) {

        if (event.key.toLowerCase() === 'tab' || event.keyCode === 9) {
            this._dateFlyoutService.closeDateFlyout();
            return true;
        }
        event.preventDefault();
        return false;
    }

    public onFocus () {

        this._dateFlyoutService.openDateFlyout();
    }

    public linesToAddCount(): number {
        return this._enterTimeManager.getSelectedDatesCount() * this.enterTimeForm.get('employees').value.length;
    }

    // TODO: Move to component
    public getExpandContainer (className: string) {

        const classes = [];
        classes.push(
            className
        );

        if (this.isEmployeeSelectionVisible) {

            classes.push(
                'expanded'
            );
        }
        return classes;
    }

    // TODO: Move to component
    public getExpandIcon () {

        const classes = [];
        classes.push(
            'material-icons'
        );
        classes.push(
            'pull-right'
        );

        if (!this.isEmployeeSelectionVisible) {

            classes.push(
                'rotate-icon'
            );
        }
        return classes;
    }

    public clearForm () {

        this.clearFormData();

        if (this._enterTimeManager.getLineCount() === 0) {
            this._confirmationService.setNeedsConfirmation(false);
        }
    }

    public createLines (enterTimeForm: FormControl) {

        if (this.isUnsupportedTime) {

            this.updateTime();
        }
        this.timeEntryComplete.emit(true);
        this._enterTimeManager.setLineData(enterTimeForm, this.time);
    }

    public removeFromCollection (employee, collection: Array<any>) {

        this._filterService.removeFromCollection(employee, collection);
    }

    public onTimeInChange (event) {

        this.enterTimeForm.get('timeEntry').get('time').get('inValue').setValue(event);
    }

    public onTimeInPeriodChange (event) {

        this.enterTimeForm.get('timeEntry').get('time').get('inPeriod').setValue(event);
    }

    public onTimeOutChange (event) {

        this.enterTimeForm.get('timeEntry').get('time').get('outValue').setValue(event);
    }

    public onTimeOutPeriodChange (event) {

        this.enterTimeForm.get('timeEntry').get('time').get('outPeriod').setValue(event);
    }

    public onBreakInChange (event) {

        this.enterTimeForm.get('timeEntry').get('break').get('inValue').setValue(event);
    }

    public onBreakInPeriodChange (event) {

        this.enterTimeForm.get('timeEntry').get('break').get('inPeriod').setValue(event);
    }

    public onBreakOutChange (event) {

        this.enterTimeForm.get('timeEntry').get('break').get('outValue').setValue(event);
    }

    public onBreakOutPeriodChange (event) {

        this.enterTimeForm.get('timeEntry').get('break').get('outPeriod').setValue(event);
    }

    // TODO: Implement when angular issue 11836 (CanDeactivateChild) is implemented.
    //       https://github.com/angular/angular/issues/11836

    // canDeactivate(): Observable<boolean> | boolean {
    //     console.log('EnterTimeFormComponent canDeactivate');
    //
    //     return true;
        // Allow synchronous navigation (`true`) if no crisis or the crisis is unchanged
        // if (!this.crisis || this.crisis.name === this.editName) {
        //     return true;
        // }
        // Otherwise ask the user with the dialog service and return its
        // observable which resolves to true or false when the user decides
        // return this.dialogService.confirm('Discard changes?');
    // }

    /******************************************************************************************************************
     * Private Methods
     ******************************************************************************************************************/
    private detectBrowser () {

        const navigator = window.navigator;
        const userAgent = navigator.userAgent;
        let ieIndex = -1;

        if (navigator.appName === 'Microsoft Internet Explorer') {

            ieIndex = userAgent.toLowerCase().indexOf('msie');
        } else if (navigator.appName === 'Netscape') {

            ieIndex = userAgent.toLowerCase().indexOf('trident');

            if (ieIndex > -1) {
                this.isIE = true;
            }
        }

        const firefoxIndex = userAgent.toLowerCase().indexOf('firefox');

        if (firefoxIndex > -1 || ieIndex > -1) {

            this.isUnsupportedTime = true;
        }

        this._enterTimeManager.setBrowserMode(new BrowserMode(this.isUnsupportedTime, this.isIE));
    }

    private checkDefaultSystem (systems: Array<System>) {

        this.systems = systems;
        if (systems.length === 1) {

            this.enterTimeForm.patchValue({
                system: systems[0],
                selectedSystem: systems[0]
            });
            this.checkDefaultPhase(systems[0].Phases);
        } else {
            this.enterTimeForm.patchValue({
                system: '',
                selectedSystem: ''
            });
            this.phases = [];
        }
    }

    private checkDefaultPhase (phases: Array<Phase>) {

        this.phases = phases;
        if (phases.length === 1) {

            this.enterTimeForm.patchValue({
                phase: phases[0],
                selectedPhase: phases[0]
            });
        } else {

            this.enterTimeForm.patchValue({
                phase: '',
                selectedPhase: ''
            });
        }
    }

    private checkDefaultCostCode (costCodes: Array<CostCode>) {

        this.costCodes = costCodes;
        if (costCodes.length === 1) {

            this.enterTimeForm.patchValue({
                costCode: costCodes[0],
                selectedCostCode: costCodes[0]
            });
        } else {

            this.enterTimeForm.patchValue({
                costCode: '',
                selectedCostCode: ''
            });
        }
    }

    private filterEmployeesByProject (projectId: string) {

        this.employees = _.filter(this._tenantEmployees, function (employee) {
            return employee.ProjectIds.includes(projectId);
        });
    }

    private createForm () {

        this.enterTimeForm = this._builder.group({
            project: '',
            selectedProject: ['', [Validators.required]],
            system: '',
            selectedSystem: '',
            phase: '',
            selectedPhase: '',
            costCode: '',
            selectedCostCode: ['', [Validators.required]],
            employee: '',
            employees: ['', [Validators.required]],
            dates: ['', [Validators.required]],
            standardHours: '',
            overtimeHours: '',
            doubleTimeHours: '',
            timeEntry: this._builder.group(this.buildTimeEntryFormGroup(),
                {validator: validateTimeBreakOverlap('in', 'out', 'in', 'out')}),
            notes: ''
        });

        this.formChange();
        this.projectChange();
        this.systemChange();
        this.phaseChange();
        this.costCodeChange();
        this.employeeChange();
    }

    private buildTimeEntryFormGroup () {

        if (this.isUnsupportedTime) {

            return {

                time: this._builder.group(this.buildTimeDetailFormGroup(),
                    {validator: validateTimeWithPeriod('in', 'out', 'startAfterEnd')}),
                break: this._builder.group(this.buildTimeDetailFormGroup(),
                    {validator: validateTimeWithPeriod('in', 'out', 'breakStartAfterEnd')})
            };
        }
        return {

            time: this._builder.group(this.buildTimeDetailFormGroup(),
                {validator: validateTime('in', 'out', 'startAfterEnd')}),
            break: this._builder.group(this.buildTimeDetailFormGroup(),
                {validator: validateTime('in', 'out', 'breakStartAfterEnd')})
        };
    }

    private buildTimeDetailFormGroup () {

        if (this.isUnsupportedTime) {

            return {

                inValue: '',
                inPeriod: '',
                in: '',
                outValue: '',
                outPeriod: '',
                out: ''
            };
        }
        return {

            in: '',
            out: ''
        };
    }

    private updateTime () {

        const timeCtrl = this.enterTimeForm.get('timeEntry').get('time');
        const breakCtrl = this.enterTimeForm.get('timeEntry').get('break');

        timeCtrl.get('in').setValue(moment(timeCtrl.get('inValue').value + ' ' + timeCtrl.get('inPeriod').value, ['h:mm A'])
            .format('HH:mm'));
        timeCtrl.get('out').setValue(moment(timeCtrl.get('outValue').value + ' ' + timeCtrl.get('outPeriod').value, ['h:mm A'])
            .format('HH:mm'));

        breakCtrl.get('in').setValue(moment(breakCtrl.get('inValue').value + ' ' + breakCtrl.get('inPeriod').value, ['h:mm A'])
            .format('HH:mm'));
        breakCtrl.get('out').setValue(moment(breakCtrl.get('outValue').value + ' ' + breakCtrl.get('outPeriod').value, ['h:mm A'])
            .format('HH:mm'));
    }

    private clearFormData () {

        this.enterTimeForm.reset();
        this.enterTimeForm.patchValue({
            project: null,
            system: '',
            phase: '',
            costCode: null,
            employee: null,
            employees: [],
            dates: '',
            standardHours: '',
            overtimeHours: '',
            doubleTimeHours: '',
            timeEntry: this._builder.group(this.buildTimeEntryFormGroup(),
                {validator: validateTimeBreakOverlap('in', 'out', 'in', 'out')}),
            notes: ''
        });
        this.systems = [];
        this.phases = [];
        this.employees = [];
        this.selectedEmployees = [];
        this.selectedDates = [];
        this._enterTimeManager.clearSelectedDates();
        this.costCodes = [];
    }

    /******************************************************************************************************************
     * Form Field Change Tracking
     ******************************************************************************************************************/
    formChange () {

        this.enterTimeForm.valueChanges
            .subscribe(
                (value) => {
                    if (this.enterTimeForm.dirty) {

                        this._confirmationService.setNeedsConfirmation(true);
                    }
                });
    }

    projectChange() {
        const projectField = this.enterTimeForm.get('project');
        const projectSelection = this.enterTimeForm.get('selectedProject');
        const costCodeSelection = this.enterTimeForm.get('selectedCostCode');

        projectField.valueChanges.subscribe(
            (project) => {

                // console.log('projectField.valueChanges', project, projectSelection.value);
                if (project || project === '') {

                    this.enterTimeForm.patchValue({
                        selectedProject: '',
                        system: '',
                        selectedSystem: '',
                        phase: '',
                        selectedPhase: '',
                        costCode: '',
                        employee: '',
                        employees: ''
                    });
                    this.costCodes = [];
                    this.selectedEmployees = [];
                    projectField.setErrors({'invalid' : true});

                    this.filteredProjects = this._filterService.filterCollection(project, this.projects);
                }
            }
        );

        projectSelection.valueChanges.subscribe (
            (selectedProject) => {

                // console.log('projectSelection.valueChanges', selectedProject);
                if (selectedProject) {

                    projectField.setErrors(null);
                    this.checkDefaultSystem(selectedProject.Systems);
                    this.checkDefaultCostCode(selectedProject.CostCodes);
                    this.filterEmployeesByProject(selectedProject.Id);
                    this.selectedEmployees = [];

                    costCodeSelection.clearValidators();
                    costCodeSelection.setErrors(null);
                }
            }
        );
    }

    systemChange() {
        const systemField = this.enterTimeForm.get('system');
        const systemSelection = this.enterTimeForm.get('selectedSystem');

        systemField.valueChanges.subscribe(
            (system) => {
                // console.log(system);
                if (system || system === '') {

                    this.enterTimeForm.patchValue({
                        selectedSystem: '',
                        phase: '',
                        selectedPhase: ''
                    });
                    this.phases = [];
                    this.filteredSystems = this._filterService.filterCollection(system, this.systems);
                }
            }
        );

        systemSelection.valueChanges.subscribe(
            (selectedSystem) => {

                if (selectedSystem) {

                    this.checkDefaultPhase(selectedSystem.Phases);
                }
            }
        );
    }

    phaseChange() {
        const phaseField = this.enterTimeForm.get('phase');

        phaseField.valueChanges.subscribe(
            (phase) => {
                // console.log(system);
                if (phase || phase === '') {

                    this.enterTimeForm.patchValue({
                        selectedPhase: ''
                    });
                    this.filteredPhases = this._filterService.filterCollection(phase, this.phases);
                }
            }
        );
    }

    costCodeChange() {
        const costCodeField = this.enterTimeForm.get('costCode');
        const costCodeSelection = this.enterTimeForm.get('selectedCostCode');
        const projectSelection = this.enterTimeForm.get('selectedProject');

        costCodeField.valueChanges.subscribe(
            (costCode) => {

                if (costCode || costCode === '') {

                    this.enterTimeForm.patchValue({
                        selectedCostCode: ''
                    });
                    if (this.costCodes.length > 0) {

                        this.filteredCostCodes = this._filterService.filterProjectCodes(costCode, projectSelection.value);
                    } else {

                        costCodeField.setErrors({'invalid' : true});
                        this.filteredCostCodes = this._filterService.filterIndirectCodes(costCode, this._indirectCodes);
                    }
                }
            }
        );

        costCodeSelection.valueChanges.subscribe(
            (selectedCostCode) => {

                if (selectedCostCode && this.costCodes.length === 0) {

                    costCodeField.setErrors(null);
                    projectSelection.clearValidators();
                    projectSelection.setErrors(null);
                }
            }
        );
    }

    employeeChange() {
        const employeeSelect = this.enterTimeForm.get('employee');
        employeeSelect.valueChanges.subscribe(
            (employee: Employee) => {
                // console.log(system);

                if (this.employees.length > 0) {

                    this.filteredEmployees = this._filterService.filterEmployees(employee, this.employees,
                        this.selectedEmployees);
                } else {

                    this.filteredEmployees = this._filterService.filterEmployees(employee, this._tenantEmployees,
                        this.selectedEmployees);
                }
            }
        );
    }
}
