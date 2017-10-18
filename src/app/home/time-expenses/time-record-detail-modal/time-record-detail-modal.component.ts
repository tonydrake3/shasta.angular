import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MD_DIALOG_DATA, MdDialogRef} from '@angular/material';
import {TimeRecord} from '../../../models/domain/TimeRecord';
import {
    IndirectCostTimeModalDisplayData, TimeModal, TimeModalDisplayData, TimeModalMode, DisplayModeSpecifying,
    ProjectManualHoursDisplayData, ProjectPunchDisplayData
} from './ModalModels';
import {FormBuilder, FormControl, FormGroup, Validators, AbstractControl} from '@angular/forms';
import {EnterTimeFilterService} from '../enter-time/enter-time-filter.service';
import {Observable} from 'rxjs/Observable';
import {Project} from '../../../models/domain/Project';
import {CostCode} from '../../../models/domain/CostCode';
import {ProjectService} from '../../shared/services/project.service';
import {IndirectCostCodesService} from '../../shared/services/indirect-cost-codes.service';
import {IndirectCost} from '../../../models/domain/IndirectCost';
import {EntityDisplayFormatterService} from '../../shared/services/entity-display-formatter.service';
import {Subject} from 'rxjs/Subject';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {System} from '../../../models/domain/System';
import {Phase} from '../../../models/domain/Phase';

@Component({
    selector: 'esub-time-record-detail-modal',
    templateUrl: './time-record-detail-modal.component.html',
    styleUrls: ['./time-record-detail-modal.component.scss']
})
export class TimeRecordDetailModalComponent implements OnInit, OnDestroy, TimeModal {
    private ngUnsubscribe: Subject<void> = new Subject<void>();

    // Private
    private timeRecord: TimeRecord;

    // Subjects
    private timeRecordSubject = new BehaviorSubject<TimeRecord>(new TimeRecord());
    private systemsSubject = new BehaviorSubject<System[]>([]);
    private phasesSubject = new BehaviorSubject<Phase[]>([]);
    private costCodeSubject = new BehaviorSubject<CostCode[]>([]);
    // Selected Subjects

    // Public
    public enterTimeForm: FormGroup; // Duplicated
    public projects: Project[];   // Duplicated
    public indirectCostCodes: IndirectCost[];
    public filteredProjects: Observable<Project[]>; // Duplicated
    public filteredSystems: Observable<System[]>; // Duplicated
    public filteredPhases: Observable<Phase[]>;
    public filteredIndirectCostCodes: Observable<IndirectCost[]>; // Duplicated
    public filteredCostCodes: Observable<IndirectCost[]>; // Duplicated

    public displayData: TimeModalDisplayData;
    public displayMode: TimeModalMode;

    // Duplicated... This is here because of a weird TSlint error that comes up
    public autoProject;
    public autoSystem;
    public autoPhase;
    public autoCostCode;
    public autoIndirectCostCode;
    public autoEmployee;

    // Observable Bindings
    public showIndirectCostView: Observable<boolean>;
    public showProjectView: Observable<boolean>;
    public showSystemView: Observable<boolean>;
    public showPhaseView: Observable<boolean>;

    constructor (
        public dialogRef: MdDialogRef<TimeRecordDetailModalComponent>,
        @Inject(MD_DIALOG_DATA) public data: DisplayModeSpecifying & TimeRecord,
        private _formBuilder: FormBuilder,
        private _filterService: EnterTimeFilterService,
        private _projectService: ProjectService,
        private _indirectCostsService: IndirectCostCodesService, // reused Filter Service... yay!
        public entityFormatter: EntityDisplayFormatterService
    ) {

        // Duplicated from Enter-time-preload-manager
        this._projectService.getLatest();
        this._indirectCostsService.getLatest();
        this._projectService.projects$
            .subscribe(
                (result) => {
                    this.projects = result['Value'];
                }
            );

        // Duplicated from Enter-time-preload-manager
        this._indirectCostsService.indirectCostCodes$
            .subscribe( (result) => {
                this.indirectCostCodes = result['Value'];
            });

        this.timeRecordSubject.asObservable()
            .subscribe( (result) => {
                console.log('next timerecordsubject', result);
            })
    }

    ngOnInit () {
        console.log('Initializing modal. The data is');
        console.log(this.data);
        this.initializeTimeRecordFromInputData();
        this.initializeTimeRecordInputData();
        this.displayMode = this.data.displayMode;
        this.buildForm();
        this.indirectCostCodes = [];
        this.projects = [];

        // Bindings
        this.showIndirectCostView = this.timeRecordSubject
            .map((record) => {
                return record && record.IndirectCost != null;
            })
            .do((showindirectcostView) =>  {
                console.log('show indirect cost view', showindirectcostView);
            })
            .takeUntil(this.ngUnsubscribe);

        this.showProjectView = this.timeRecordSubject
            .map((record) => {
                return record && record.Project != null;
            })
            .do((showProjectView) =>  {
                console.log('show project view', showProjectView);
            })
            .takeUntil(this.ngUnsubscribe);

        this.showSystemView = Observable
            .combineLatest(
                this.enterTimeForm.get('selectedProject').valueChanges,
                this.systemsSubject,
                (selectedProject, systems) => {
                    return selectedProject != null && !(systems.length === 0);
                }
            )
            .do((showSystemsView) =>  {
                console.log('show system view', showSystemsView);
            })
            .takeUntil(this.ngUnsubscribe);

        this.showPhaseView = Observable
            .combineLatest(
                this.enterTimeForm.get('selectedSystem').valueChanges,
                this.phasesSubject,
                (selectedSystem, phases) => {
                    return selectedSystem != null && !(phases.length === 0);
                }
            )
            .do((showPhaseView) =>  {
                console.log('show phase view', showPhaseView);
            })
            .takeUntil(this.ngUnsubscribe);

        // DEBUGGING
        this.systemsSubject
            .do((subjects) => {
                console.log('next systems');
                console.log(subjects);
            })
            .takeUntil(this.ngUnsubscribe)
            .subscribe();

        this.phasesSubject
            .do((subjects) => {
                console.log('next phases');
                console.log(subjects);
            })
            .takeUntil(this.ngUnsubscribe)
            .subscribe();

        this.costCodeSubject
            .do((subjects) => {
                console.log('next costCodes');
                console.log(subjects);
            })
            .takeUntil(this.ngUnsubscribe)
            .subscribe();
    }

    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

    // Duplicated from Enter Form... refactor?
    private buildForm() {
        console.log('Building form. The display data is');
        console.log(this.displayData);

        let project: Project;
        let system: System;
        let phase: Phase;

        project = this.timeRecord.Project;

        if (project && project.hasOwnProperty('System')) {
            system = project.System;
        }

        if (system && system.hasOwnProperty('Phase')) {
            phase = system.Phase;
        }

        this.enterTimeForm = this._formBuilder.group( {
            project: this.timeRecord.Project,
            selectedProject: [this.timeRecord.Project, [ Validators.required ] ],
            system: system,
            selectedSystem: system,
            phase: phase,
            selectedPhase: phase,
            costCode: this.timeRecord.CostCode,
            selectedCostCode: [this.timeRecord.CostCode, [Validators.required]],
            indirectCostCode: this.timeRecord.IndirectCost,
            selectedIndirectCostCode: [this.timeRecord.IndirectCost, [Validators.required]],
            date: [this.timeRecord.Hours.Date, [Validators.required]],
            standardHours: [this.timeRecord.Hours.RegularTime, [Validators.max(24)]],
            overtimeHours: [this.timeRecord.Hours.Overtime, [Validators.max(24)]],
            doubleTimeHours: [this.timeRecord.Hours.DoubleTime, [Validators.max(24)]],
        });

        this.observeProjectChanges();
        this.observeSystemChanges();
        this.observeCostCodeChanges();
        this.observeIndirectCostCodeChanges();
        this.observeStandardTimeHoursChanges();
    }

    public close () {
        console.log('Close modal without saving');
        this.dialogRef.close();
    }

    public save () {
        console.log('Save this record');
        this.dialogRef.close();
    }

    public projectsTypeAheadHasFocus (value) {
        console.log('projectsTypeAheadHasFocus');
        this.filterProjectsBy(value);

    }

    private filterProjectsBy(value) {
        this.filteredProjects = this._filterService
            .filterCollectionByKey(this.projects, value);
    }

    public systemTypeAheadHasFocus(value) {

        this.filteredSystems = this._filterService
            .filterCollectionByKey(this.systemsSubject.getValue(), value);

    }

    public phaseTypeAheadHasFocus(value) {

        this.filteredPhases = this._filterService
            .filterCollectionByKey(this.phasesSubject.getValue(), value);

    }

    public costCodesTypeAheadHasFocus (value) {

        this.filteredCostCodes = this._filterService
            .filterCollectionByKey(this.costCodeSubject.getValue(), value, ['Code', 'Name']);

    }

    public indirectCostCodesTypeAheadHasFocus (value) {

        this.filteredIndirectCostCodes = this._filterService.filterCollectionByKey(this.indirectCostCodes, value, ['Description']);

    }

    public projectWasSelected (event) {

        this.enterTimeForm.patchValue({selectedProject: event.option.value});

    }

    public systemWasSelected (event) {

        this.enterTimeForm.patchValue({selectedSystem: event.option.value});

    }

    public phaseWasSelected (event) {

        this.enterTimeForm.patchValue({selectedPhase: event.option.value});

    }

    public costCodeWasSelected (event) {

        this.enterTimeForm.patchValue({ selectedCostCode: event.option.value });
    }

    public indirectCostCodeWasSelected (event) {

        this.enterTimeForm.patchValue({ selectedIndirectCost: event.option.value });
    }

    // Duplicated
    observeIndirectCostCodeChanges() {
        console.log('Indirect Cost Code changed');
        const indirectCostCodeField = this.enterTimeForm.get('indirectCostCode');
        const indirectCostCodeSelection = this.enterTimeForm.get('selectedIndirectCostCode');

        console.log(indirectCostCodeField);
        console.log(indirectCostCodeSelection);

        indirectCostCodeField.valueChanges.subscribe(
            (indirectCostCodeFieldText) => {
                console.log('next indirect cost code field change');
                console.log(indirectCostCodeFieldText);

                if (indirectCostCodeFieldText || indirectCostCodeFieldText === '') {

                    this.enterTimeForm.patchValue({
                        selectedIndirectCostCode: ''
                    });

                    if (this.indirectCostCodes.length > 0) {

                        this.filteredIndirectCostCodes = this._filterService
                            .filterByKeyValuePair(this.indirectCostCodes, {'Description': indirectCostCodeFieldText});

                    } else {

                        indirectCostCodeField.setErrors({'invalid' : true});

                        this.filteredIndirectCostCodes = this._filterService
                            .filterByKeyValuePair(this.indirectCostCodes, {'Description': indirectCostCodeFieldText});

                    }
                }
            }
        );

        indirectCostCodeSelection.valueChanges.subscribe(
            (selectedIndirectCostCode) => {

                if (selectedIndirectCostCode && this.indirectCostCodes.length === 0) {
                    indirectCostCodeField.setErrors(null);
                }

            }
        );
    }

    observeProjectChanges() {
        const projectField = this.enterTimeForm.get('project');
        const projectSelection = this.enterTimeForm.get('selectedProject');
        const costCodeSelection = this.enterTimeForm.get('selectedCostCode');

        projectField.valueChanges.subscribe(
            (projectText) => {

                const fieldsToClear = {
                    selectedProject: '',
                    system: '',
                    selectedSystem: '',
                    phase: '',
                    selectedPhase: '',
                    costCode: ''
                };
                this.resetField(projectText, projectField, fieldsToClear);
                this.filterProjectsBy(projectText);

            }
        );

        projectSelection.valueChanges.subscribe (
            (selectedProject) => {

                if (selectedProject) {

                    projectField.setErrors(null);
                    this.checkDefaultSystem(selectedProject.Systems);
                    this.checkDefaultCostCode(selectedProject.CostCodes);
                    // costCodeSelection.clearValidators();
                    // costCodeSelection.setErrors(null);

                }
            }
        );
    }

    observeStandardTimeHoursChanges() {
        const standardTimeField = this.enterTimeForm.get('standardHours');
        const overtimeField = this.enterTimeForm.get('overtimeHours');
        const doubleTimeField = this.enterTimeForm.get('doubleTimeHours');

        standardTimeField.valueChanges.subscribe(
            (standardTime) => {
                console.log('standard time changed');
                console.log(standardTime);
            }
        )

        overtimeField.valueChanges.subscribe(
            (overtime) => {
                console.log('overtime changed');
                console.log(overtime);
            }
        )

        doubleTimeField.valueChanges.subscribe(
            (doubleTime) => {
                console.log('doubleTime changed');
                console.log(doubleTime);
            }
        )
    }

//     if (systems && systems.length >= 1) {
//     this.systemsSubject.next(systems);
//
//     this.enterTimeForm.patchValue({
//                                       system: systems[0],
//                                       selectedSystem: systems[0]
//                                   });
//     this.checkDefaultPhase(systems[0].Phases);
// } else {
//     this.systemsSubject.next([]);
//
//     this.enterTimeForm.patchValue({
//         system: '',
//         selectedSystem: ''
//     });
//     this.phasesSubject.next([]);
// }

    private checkDefaultCostCode (costCodes: CostCode[]) {

        if (costCodes && costCodes.length >= 1) {
            this.costCodeSubject.next(costCodes);

            // this.enterTimeForm.patchValue({
            //     costCode: costCodes[0],
            //     selectedCostCode: costCodes[0]
            // });

        } else {

            this.enterTimeForm.patchValue({
                costCode: '',
                selectedCostCode: ''
            });
        }
    }

    observeSystemChanges() {
        const systemField = this.enterTimeForm.get('system');
        const systemSelection = this.enterTimeForm.get('selectedSystem');

        systemField.valueChanges.subscribe(
            (systemText) => {

                const fieldsToClear = {
                    selectedSystem: '',
                    phase: '',
                    selectedPhase: '',
                };
                this.resetField(systemText, systemField, fieldsToClear)

            }
        )

        systemSelection.valueChanges.subscribe(
            (selectedSystem) => {

                if (selectedSystem) {

                    systemField.setErrors(null);
                    this.checkDefaultPhase(selectedSystem.Phases);

                }

            }
        )
    }

    private resetField(fieldValue: string, field: AbstractControl, fieldsToClear: any) {
        if (fieldValue || fieldValue === '') {

            this.enterTimeForm.patchValue(fieldsToClear);
            this.costCodeSubject.next([]);
            field.setErrors({'invalid': true});

        }
    }

// Duplicated... convert to observables
    private checkDefaultSystem (systems: System[]) {

        if (systems && systems.length >= 1) {
            this.systemsSubject.next(systems);

            this.enterTimeForm.patchValue({
                system: systems[0],
                selectedSystem: systems[0]
            });
            this.checkDefaultPhase(systems[0].Phases);
        } else {
            this.systemsSubject.next([]);

            this.enterTimeForm.patchValue({
                system: '',
                selectedSystem: ''
            });
            this.phasesSubject.next([]);
        }
    }

    // Duplicated
    private checkDefaultPhase (phases: Array<Phase>) {
        console.log('checkDefaultPhase');
        console.log(phases);
        this.phasesSubject.next(phases);
        if (phases.length >= 1) {

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

    observeCostCodeChanges() {

        const costCodeField = this.enterTimeForm.get('costCode');
        const costCodeSelection = this.enterTimeForm.get('selectedCostCode');

        costCodeField.valueChanges.subscribe(
            (costCodeFieldText) => {
                console.log('next cost code field change');
                console.log(costCodeFieldText);

                if (costCodeFieldText || costCodeFieldText === '') {

                    this.enterTimeForm.patchValue({
                        selectedCostCode: ''
                    });

                    if (this.costCodeSubject.getValue().length > 0) {

                        this.filteredCostCodes = this._filterService
                            .filterByKeyValuePair(this.costCodeSubject.getValue(), {
                                'Code': costCodeFieldText,
                                'Name': costCodeFieldText
                            });

                    } else {

                        costCodeField.setErrors({'invalid' : true});

                        this.filteredCostCodes = this._filterService
                            .filterByKeyValuePair(this.costCodeSubject.getValue(), {
                                'Code': costCodeFieldText,
                                'Name': costCodeFieldText
                            });

                    }
                }
            }
        );

        costCodeSelection.valueChanges.subscribe(
            (selectedCostCode) => {

                if (selectedCostCode && this.costCodeSubject.getValue().length === 0) {

                    costCodeField.setErrors(null);

                }

            }
        );
    }

    public onSubmit(form: FormGroup) {
        console.log('Submitted form');
        console.log(form);
    }

    didTapCancelButton(): void {
        console.log('View Modal Tapped Cancel Button');
    }

    private initializeTimeRecordFromInputData() {
        this.timeRecord = TimeRecord.fromAPIData(this.data);
        console.log('initialized timerecord from data passed to modal');
        console.log(this.timeRecord);
        if (this.timeRecord.Project) {
            this._projectService.getById(this.timeRecord.Project.Id)
                .then((result) => {
                    console.log('got project by id');
                    console.log(result);

                    const projectArray = result['Value'];

                    if (projectArray && projectArray.length > 0) {
                        this.enterTimeForm.patchValue({
                            selectedProject: projectArray[0]
                        });
                    }
                })
        }
        this.timeRecordSubject.next(this.timeRecord);
    }

    private initializeTimeRecordInputData() {
        if (this.timeRecord.IndirectCost) { // Initialize with Indirect Cost Data
            console.log('Initializing Modal Data from Indirect Cost Record');
            this.displayData = new IndirectCostTimeModalDisplayData(this.timeRecord);
            console.log(this.displayData);
        } else if (this.timeRecord.Project) {

            if (this.timeRecord.ManualHours) { // Hours only

                this.displayData = new ProjectManualHoursDisplayData(this.timeRecord);

            } else { // Punch In Punch Out

                this.displayData = new ProjectPunchDisplayData(this.timeRecord);

            }

        }
    }
}
