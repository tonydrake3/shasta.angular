import {AfterViewInit, Component, EventEmitter, Injector, Output, ViewChild} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import * as _ from 'lodash';
import { ITimeSelectConfig } from 'ng2-date-picker/time-select/time-select-config.model';
import { IDatePickerConfig } from 'ng2-date-picker';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';

// Components
import {BaseComponent} from '../../../shared/components/base.component';

// Models
import { Project } from '../../../../models/domain/Project';
import { Employee } from '../../../../models/domain/Employee';
import { CostCode } from '../../../../models/domain/CostCode';
import { System } from '../../../../models/domain/System';
import { Phase } from '../../../../models/domain/Phase';
// import { dependentFieldValidator } from '../../../shared/validators/dependent-field.validator';
// import {DateFlyoutService} from '../../../shared/components/date-flyout/date-flyout.service';
import {EnterTimeManager} from '../enter-time.manager';
import {TimeEntry} from '../models/TimeEntry';
import {TimeEntryMode} from '../models/TimeEntry';
import {DateFlyoutService} from '../../../shared/components/date-flyout/date-flyout.service';
import {Observable} from 'rxjs/Observable';
import {MdAutocomplete, MdAutocompleteTrigger} from '@angular/material';
import {Subscription} from 'rxjs/Subscription';

@Component({
    selector: 'esub-enter-time-form',
    templateUrl: './enter-time-form.component.html'
})
export class EnterTimeFormComponent extends BaseComponent implements AfterViewInit {

    @ViewChild(MdAutocompleteTrigger) trigger: MdAutocompleteTrigger;

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
    public timeEntryMode: TimeEntryMode;
    public selectedDates: Array<moment.Moment>;
    public time: TimeEntry;
    public timeEntryModeEnum;
    public isTimeIn: boolean;
    public isProjectTimeEntry: boolean;

    public filteredProjects: Observable<Project[]>;
    public filteredSystems: Observable<System[]>;
    public filteredPhases: Observable<Phase[]>;
    public filteredCostCodes: Observable<CostCode[]>;
    public filteredEmployees: Observable<Employee[]>;

    public selectedEmployees: Array<Employee>;

    // Calendar Config
    public dpDatepickerConfig: IDatePickerConfig = {
        allowMultiSelect: true,
        max: moment()
    };
    public dpTimeConfig: ITimeSelectConfig = {
        minutesInterval: 5,
        showTwentyFourHours: false,
        showSeconds: false
    };

    constructor (private _builder: FormBuilder, private _injector: Injector, private _enterTimeManager: EnterTimeManager,
                 private _dateFlyoutService: DateFlyoutService) {

        super(_injector, [
            {
                service: 'ProjectService',
                callback: 'projectServiceCallback'
            },
            {
                service: 'IndirectCostCodesService',
                callback: 'indirectCostCodeServiceCallback'
            },
            {
                service: 'EmployeeService',
                callback: 'employeeServiceCallback'
            }
        ]);

        this.dateFormat = 'MMM. Do, YYYY';
        this.isProjectTimeEntry = true;
        this.isTimeIn = true;
        this._enterTimeManager.setTimeEntryMode(TimeEntryMode.TimeInTimeOut);
        this.timeEntryModeEnum = TimeEntryMode;
        this.selectedDates = [];
        this.time = new TimeEntry();
        this.projects = [];
        this.systems = [];
        this.phases = [];
        this.employees = [];
        this.selectedEmployees = [];
        this.costCodes = [];
        this.createForm();
    }

    /******************************************************************************************************************
     * Lifecycle Methods
     ******************************************************************************************************************/

    ngAfterViewInit () {
        console.log(this.trigger);
        // this.trigger.panelClosingActions
        //     .subscribe(
        //         (result) => {
        //
        //             console.log(result);
        //         }
        //     );
    }

    /******************************************************************************************************************
     * Callback Handler
     ******************************************************************************************************************/
    projectServiceCallback (projects) {

        this.projects = projects['Value'] as Array<Project>;
        this._enterTimeManager.setProjects(this.projects);

        // this.projectChange();
        // console.log(projects['Value']);
    }

    employeeServiceCallback (employees) {

        this._tenantEmployees = this.concatName(employees['Value'] as Array<Employee>);
        this._enterTimeManager.setEmployees(this._tenantEmployees);
    }

    indirectCostCodeServiceCallback (costCodes) {

        // console.log(costCodes);
        this._indirectCodes = this.mapCostCodes(costCodes['Value']) as Array<CostCode>;
        this._enterTimeManager.setIndirectCodes(this._indirectCodes);
    }

    /******************************************************************************************************************
     * Public Methods
     ******************************************************************************************************************/
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

    public openProjects () {

        const projectSelect = this.enterTimeForm.get('project');

        if (projectSelect.value) {

            this.filteredProjects = this.filterCollection(projectSelect.value, this.projects);
        } else {

            this.filteredProjects = Observable.of(this.projects);
        }
    }

    public openSystems () {

        const systemSelect = this.enterTimeForm.get('system');

        if (this.systems) {

            this.filteredSystems = this.filterCollection(systemSelect.value, this.systems);
        } else {

            this.filteredSystems = Observable.of(this.systems);
        }
    }

    public openPhases () {

        // const systemSelect = this.enterTimeForm.get('system');
        const phaseSelect = this.enterTimeForm.get('phase');

        if (phaseSelect.value) {

            this.filteredPhases = this.filterCollection(phaseSelect.value, this.phases);
        } else {

            this.filteredPhases = Observable.of(this.phases);
        }
    }

    public openCostCodes () {

        const costCodeSelect = this.enterTimeForm.get('costCode');

        if (this.costCodes.length > 0) {

            if (costCodeSelect.value) {

                this.filteredCostCodes = this.filterProjectCodes(costCodeSelect.value);
            } else {

                this.filteredCostCodes = Observable.of(this.costCodes);
            }
        } else {

            if (costCodeSelect.value) {

                this.filteredCostCodes = this.filterIndirectCodes(costCodeSelect.value);
            } else {

                this.filteredCostCodes = Observable.of(this._indirectCodes);
            }
        }
    }

    public openEmployee () {

        const employeeSelect = this.enterTimeForm.get('employee');

        if (employeeSelect.value) {

            if (this.employees.length > 0) {

                this.filteredEmployees = this.filterEmployees(employeeSelect.value, this.employees);
            } else {

                this.filteredEmployees = this.filterEmployees(employeeSelect.value, this._tenantEmployees);
            }
        } else {

            if (this.employees.length > 0) {

                if (this.selectedEmployees.length > 0) {

                    this.filteredEmployees = this.filterEmployees('', this.employees);
                } else {

                    this.filteredEmployees = Observable.of(this.employees);
                }

            } else {

                this.filteredEmployees = Observable.of(this._tenantEmployees);
            }
        }
    }

    public displayFormatted (value) {

        if (value) {

            return value.Number + ' - ' + value.Name;
        }
        return '';
    }

    public displayCostCode (value) {

        if (value) {

            return value.Code + ' - ' + value.Name;
        }
        return '';
    }

    public projectSelected (event) {

        // console.log('EnterTimeFormComponent projectSelected', event.source.value);
        const project = event.source.value;

        if (project['timeEntryMethod'] === 'timeInTimeOut') {

            this.timeEntryMode = TimeEntryMode.TimeInTimeOut;
        } else {

            // Need this condition if project is changed to one with TimeInTimeOut
            this.timeEntryMode = TimeEntryMode.Hours;
        }
        this._enterTimeManager.setTimeEntryMode(this.timeEntryMode);

        this.checkDefaultSystem(project.Systems);
        this.checkDefaultCostCode(project.CostCodes);
        this.filterEmployeesByProject(project.Id);

        const costCodeSelect = this.enterTimeForm.get('costCode');
        costCodeSelect.clearValidators();
        costCodeSelect.setErrors(null);
    }

    public systemSelected (event) {

        const system = event.source.value;
        // console.log('EnterTimeFormComponent systemSelected', system.Phases);
        this.checkDefaultPhase(system.Phases);
    }

    public phaseSelected (event) {

        // console.log('EnterTimeFormComponent phaseSelected', event.source.value);
        const phase = event.source.value;
    }

    public employeeSelected (event) {

        // console.log('EnterTimeFormComponent employeeSelected', event.source.value);
        const employee = event.source.value;

        this.selectedEmployees.push(employee);
        this.enterTimeForm.patchValue({
            employees: this.selectedEmployees
        });
        const employeeSelect = this.enterTimeForm.get('employee');
        employeeSelect.setValue(null);
    }

    public costCodeSelected (event) {

        const costCode = event.source.value;

        if (this.costCodes.length === 0) {

            const projectSelect = this.enterTimeForm.get('project');
            projectSelect.clearValidators();
            projectSelect.setErrors(null);
        }
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

    // TODO: Remove when setting is implemented
    public changeTimeInTimeOut () {

        this.isTimeIn = !this.isTimeIn;
        if (this.isTimeIn) {

            this._enterTimeManager.setTimeEntryMode(TimeEntryMode.TimeInTimeOut);
        } else {

            this._enterTimeManager.setTimeEntryMode(TimeEntryMode.Hours);
        }
    }

    public clearForm () {

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
            timeIn: moment().format('HH:mm'),
            timeOut: moment().format('HH:mm'),
            breakIn: moment().format('HH:mm'),
            breakOut: moment().format('HH:mm'),
            notes: ''
        });
        this.systems = [];
        this.phases = [];
        this.employees = [];
        this.selectedEmployees = [];
        this.costCodes = [];
    }

    public createLines (enterTimeForm: FormControl) {

        this.timeEntryComplete.emit(true);
        this._enterTimeManager.setLineData(enterTimeForm, this.time);
    }

    /******************************************************************************************************************
     * Private Methods
     ******************************************************************************************************************/

    private mapCostCodes (costCodes: Array<any>) {

        return _.map(costCodes, function(code) {
            return {
                Id: code.Id,
                Name: code.Description,
                Code: code.Description
            };
        });
    }

    private checkDefaultSystem (systems: Array<System>) {

        this.systems = systems;
        if (systems.length === 1) {

            this.enterTimeForm.patchValue({
                system: systems[0]
            });
            this.checkDefaultPhase(systems[0].Phases);
        } else {
            this.enterTimeForm.patchValue({
                system: ''
            });
            this.phases = [];
        }
    }

    private checkDefaultPhase (phases: Array<Phase>) {

        this.phases = phases;
        if (phases.length === 1) {

            this.enterTimeForm.patchValue({
                phase: phases[0]
            });
        } else {

            this.enterTimeForm.patchValue({
                phase: ''
            });
        }
    }

    private checkDefaultCostCode (costCodes: Array<CostCode>) {

        this.costCodes = costCodes;
        if (costCodes.length === 1) {

            this.enterTimeForm.patchValue({
                costCode: costCodes[0]
            });
        } else {

            this.enterTimeForm.patchValue({
                costCode: ''
            });
        }
    }

    private concatName (employees: Array<Employee>) {

        return _.map(employees, function(employee) {
            return _.extend({}, employee, {Name: employee.FirstName + ' ' + employee.LastName});
        });
    }

    private filterEmployeesByProject (projectId: string) {

        this.employees = _.filter(this._tenantEmployees, function (employee) {
            return employee.ProjectIds.includes(projectId);
        });
    }

    private filterCollection (match, collection): Observable<Array<any>> {

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

    private filterEmployees (match, employeeList: Array<Employee>): Observable<Array<any>> {

        let filtered = [];

        if (typeof match === 'string') {

            filtered = _.filter(employeeList, (employee) => {
                return employee.Name.toLowerCase().includes(match.toLowerCase()) ||
                    employee.Number.toLowerCase().includes(match.toLowerCase()) ||
                    (employee.Number.toLowerCase() + ' - ' + employee.Name.toLowerCase()).includes(match.toLowerCase());
            });

            if (this.selectedEmployees.length > 0) {

                _.forEach(this.selectedEmployees, (employee) => {
                    this.removeFromCollection(employee, filtered);
                });
            }
        }

        return Observable.of(filtered);
    }

    private filterIndirectCodes (match): Observable<CostCode[]> {

        // console.log('filterIndirectCodes', match, this._indirectCodes);
        let filtered = [];

        if (typeof match === 'string') {

            filtered = _.filter(this._indirectCodes, (code) => {
                return code.Name.toLowerCase().includes(match.toLowerCase()) ||
                    code.Code.toLowerCase().includes(match.toLowerCase()) ||
                    (code.Code.toLowerCase() + ' - ' + code.Name.toLowerCase()).includes(match.toLowerCase());
            });
        }

        return Observable.of(filtered);
    }

    private filterProjectCodes (match): Observable<CostCode[]> {

        // console.log('filterProjectCodes', match);
        let filtered = [];
        const projectSelect = this.enterTimeForm.get('project');

        if (typeof match === 'string') {

            filtered = _.filter(projectSelect.value.CostCodes, (code) => {
                return code.Name.toLowerCase().includes(match.toLowerCase()) ||
                    code.Code.toLowerCase().includes(match.toLowerCase()) ||
                    (code.Code.toLowerCase() + ' - ' + code.Name.toLowerCase()).includes(match.toLowerCase());
            });
        }

        return Observable.of(filtered);
    }

    private createForm () {

        this.enterTimeForm = this._builder.group({
            project: ['', [Validators.required]],
            system: '',
            phase: '',
            costCode: ['', [Validators.required]],
            employee: '',
            employees: ['', [Validators.required]],
            dates: ['', [Validators.required]],
            standardHours: '',
            overtimeHours: '',
            doubleTimeHours: '',
            timeIn: '',
            timeOut: '',
            breakIn: '',
            breakOut: '',
            notes: ''
        });

        this.enterTimeForm.patchValue({
            timeIn: moment().format('HH:mm'),
            timeOut: moment().format('HH:mm'),
            breakIn: moment().format('HH:mm'),
            breakOut: moment().format('HH:mm')
        });

        this.projectChange();
        this.systemChange();
        this.phaseChange();
        this.costCodeChange();
        this.employeeChange();
        this.timeInChange();
    }

    public removeFromCollection (employee, collection: Array<any>) {

        let keyToDelete: number;

        collection.forEach((emp, idx) => {
            if (emp === employee) {
                keyToDelete = idx;
            }
        });

        if (keyToDelete != null) {
            collection.splice(keyToDelete--, 1);
        }
    }

    /******************************************************************************************************************
     * Form Field Change Tracking
     ******************************************************************************************************************/
    projectChange() {
        const projectSelect = this.enterTimeForm.get('project');
        projectSelect.valueChanges.subscribe(
            (project) => {
                // console.log(project);
                this.filteredProjects = this.filterCollection(project, this.projects);
            }
        );
    }

    systemChange() {
        const systemSelect = this.enterTimeForm.get('system');
        systemSelect.valueChanges.subscribe(
            (system: System) => {
                // console.log(system);
                this.filteredSystems = this.filterCollection(system, this.systems);
            }
        );
    }

    phaseChange() {
        const phaseSelect = this.enterTimeForm.get('phase');
        phaseSelect.valueChanges.subscribe(
            (phase: Phase) => {
                // console.log(system);
                this.filteredPhases = this.filterCollection(phase, this.phases);
            }
        );
    }

    costCodeChange() {
        const costCodeSelect = this.enterTimeForm.get('costCode');
        costCodeSelect.valueChanges.subscribe(
            (costCode: CostCode) => {

                if (this.costCodes.length > 0) {

                    this.filteredCostCodes = this.filterProjectCodes(costCode);
                } else {

                    this.filteredCostCodes = this.filterIndirectCodes(costCode);
                }
                // const projectSelect = this.enterTimeForm.get('project');
                // projectSelect.clearValidators();
                // projectSelect.setErrors(null);
            }
        );
    }

    employeeChange() {
        const employeeSelect = this.enterTimeForm.get('employee');
        employeeSelect.valueChanges.subscribe(
            (employee: Employee) => {
                // console.log(system);

                if (this.employees.length > 0) {

                    this.filteredEmployees = this.filterEmployees(employee, this.employees);
                } else {

                    this.filteredEmployees = this.filterEmployees(employee, this._tenantEmployees);
                }
            }
        );
    }

    timeInChange () {

        const timeIn = this.enterTimeForm.get('timeIn');
        timeIn.valueChanges.subscribe(
            (time) => {
                console.log(timeIn);
            });
    }
}
