import {Component, EventEmitter, Inject, OnDestroy, OnInit, Output} from '@angular/core';
import {MD_DIALOG_DATA, MdDialogRef} from '@angular/material';
import {TimeRecord} from '../../../models/domain/TimeRecord';
import {
    IndirectCostTimeModalDisplayData, TimeModal, TimeModalDisplayData, TimeModalMode, DisplayModeSpecifying,
    ProjectManualHoursDisplayData, ProjectPunchDisplayData
} from './ModalModels';
import {FormBuilder, FormControl, FormGroup, Validators, AbstractControl, FormArray} from '@angular/forms';
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
import * as _ from 'lodash';
import {Hours} from '../../../models/domain/Hours';
import {Punch} from '../../../models/domain/Punch';
import {TimeRecordUpdaterService} from './time-record-updater.service';
import {Comment} from '../../../models/domain/Comment';
import {UserService} from '../../shared/services/user/user.service';
import {User} from '../../../models/domain/User';
import * as moment from 'moment';
import {DateHelperService} from 'app/home/shared/services/date-helper.service';
import {ReloadType} from '../../../models/ReloadType';
import {MessageService} from '../timesheet-card/message.service';

@Component({
    selector: 'esub-time-record-detail-modal',
    templateUrl: './time-record-detail-modal.component.html',
    styleUrls: ['./time-record-detail-modal.component.scss']
})

export class TimeRecordDetailModalComponent implements OnInit, OnDestroy, TimeModal {

    /* Form Keys for use instead of */
    private formKeys: TimeModalFormKeys = {
        project: 'project',
        selectedProject: 'selectedProject',
        system: 'system',
        selectedSystem: 'selectedSystem',
        phase: 'phase',
        selectedPhase: 'selectedPhase',
        costCode: 'costCode',
        selectedCostCode: 'selectedCostCode',
        indirectCostCode: 'indirectCostCode',
        selectedIndirectCostCode: 'selectedIndirectCostCode',
        date: 'date',
        timeEntry: {
            timeIn: 'timeEntry.time.in',
            timeOut: 'timeEntry.time.out'
        },
        standardHours: 'standardHours',
        overtimeHours: 'overtimeHours',
        doubleTimeHours: 'doubleTimeHours',
        comment: 'comment'
    };

    private ngUnsubscribe: Subject<void> = new Subject<void>();
    private timeRecord: TimeRecord;

    // Private Subjects
    private timeRecordSubject = new BehaviorSubject<TimeRecord>(new TimeRecord());
    private projectsSubject = new BehaviorSubject<Project[]>([]);
    private systemsSubject = new BehaviorSubject<System[]>([]);
    private phasesSubject = new BehaviorSubject<Phase[]>([]);
    private costCodeSubject = new BehaviorSubject<CostCode[]>([]);
    private indirectCostsSubject = new BehaviorSubject<IndirectCost[]>([]);
    private commentsSubject = new BehaviorSubject<Comment[]>([]);
    private currentUserSubject = new BehaviorSubject<User>(new User());

    // Public
    public enterTimeForm: FormGroup;
    public filteredProjects: Observable<Project[]>;
    public filteredSystems: Observable<System[]>;
    public filteredPhases: Observable<Phase[]>;
    public filteredIndirectCostCodes: Observable<IndirectCost[]>;
    public filteredCostCodes: Observable<CostCode[]>;
    public comments: Observable<Comment[]>;

    public displayMode: TimeModalMode;
    public loading;

    /* This is here because of a weird TSlint error that comes up :shrug: */
    public autoProject;
    public autoSystem;
    public autoPhase;
    public autoCostCode;
    public autoIndirectCostCode;
    public autoEmployee;
    public datePicker;

    // Observable Bindings
    public showIndirectCostView: Observable<boolean>;
    public showProjectView: Observable<boolean>;
    public showSystemView: Observable<boolean>;
    public showPhaseView: Observable<boolean>;
    public showCostCodeView: Observable<boolean>;
    public showTimeEntryView: Observable<boolean>;
    public showLocationButton: Observable<boolean>;

    constructor(private _dialogRef: MdDialogRef<TimeRecordDetailModalComponent>,
                @Inject(MD_DIALOG_DATA) public data: DisplayModeSpecifying & TimeRecord,
                private _formBuilder: FormBuilder,
                private _filterService: EnterTimeFilterService,
                private _projectService: ProjectService,
                private _timeRecordUpdater: TimeRecordUpdaterService,
                private _userService: UserService,
                private _dateHelper: DateHelperService,
                public entityFormatter: EntityDisplayFormatterService,
                private _messageService: MessageService<ReloadType>) {
    }

    ngOnInit() {
        this.initializeTimeRecordFromInputData();
        this.displayMode = this.data.displayMode;
        this.buildForm();

        // For now we are just getting all of the projects but we will want to probably use the
        // Lookup functionality from the server
        this._projectService.getLatest();
        this.loading = true;
        this._projectService.projects$
            .do(
                (result) => {
                    console.log('got projects');
                    this.projectsSubject.next(result['Value']);
                    this.loading = false;
                }
            )
            .takeUntil(this.ngUnsubscribe)
            .subscribe();

        this._userService.getLatest();
        this._userService.currentUserInfo$
            .do(
                (result) => {
                    console.log('got current user');
                    this.currentUserSubject.next(result);
                    this.loading = false;
                }
            )
            .takeUntil(this.ngUnsubscribe)
            .subscribe();

        /* Visibility Bindings */
        this.showIndirectCostView = this.timeRecordSubject
            .map((record) => {
                return record && record.IndirectCost != null;
            })
            .do((showIndirectCostView) => {
                console.log('show indirect cost view', showIndirectCostView);
            })
            .takeUntil(this.ngUnsubscribe);

        this.showProjectView = this.timeRecordSubject
            .map((record) => {
                return record && record.Project != null;
            })
            .do((showProjectView) => {
                console.log('show project view', showProjectView);
            })
            .takeUntil(this.ngUnsubscribe);

        this.showCostCodeView = this.timeRecordSubject
            .map((record) => {
                return record && record.CostCode != null;
            })
            .do((showProjectView) => {
                console.log('show cost code view', showProjectView);
            })
            .takeUntil(this.ngUnsubscribe);

        this.showSystemView = Observable
            .combineLatest(
                this.enterTimeForm.get(this.formKeys.selectedProject).valueChanges,
                this.systemsSubject,
                (selectedProject, systems) => {
                    return selectedProject != null && !(systems.length === 0);
                }
            )
            .do((showSystemsView) => {
                console.log('show system view', showSystemsView);
            })
            .takeUntil(this.ngUnsubscribe);

        this.showPhaseView = Observable
            .combineLatest(
                this.enterTimeForm.get(this.formKeys.selectedSystem).valueChanges,
                this.phasesSubject,
                (selectedSystem, phases) => {
                    return selectedSystem != null && !(phases.length === 0);
                }
            )
            .do((showPhaseView) => {
                console.log('show phase view', showPhaseView);
            })
            .takeUntil(this.ngUnsubscribe);

        this.showTimeEntryView = Observable
            .combineLatest(
                this.timeRecordSubject,
                (timeRecord) => {
                    return timeRecord.Punch != null;
                })
            .do((showTimeEntryView) => {
                console.log('show Time Entry View: ', showTimeEntryView);
            })
            .takeUntil(this.ngUnsubscribe);

        this.showLocationButton = Observable
            .combineLatest(
                this.timeRecordSubject,
                (timeRecord) => {
                    if (timeRecord.Punch == null) { return false }

                    return timeRecord.Punch.PunchInLocation != null || timeRecord.Punch.PunchOutLocation != null
                })
            .do((showLocationButton) => {
                console.log('show Location Button: ', showLocationButton);
            })
            .takeUntil(this.ngUnsubscribe);

        /* Collections */
        this.filteredProjects = Observable.combineLatest(
            this.enterTimeForm.get(this.formKeys.project).valueChanges,
            this.projectsSubject,
            (filterText, projects) => {
                console.log('filtering projects with text', filterText);
                console.log('currently have ' + projects.length + ' projects total');
                return this._filterService
                    .filterCollectionByKey(projects, filterText)
            }
        )
            .do((projects) => {
                console.log('filtering projects');
                console.log(projects);
            })
            .takeUntil(this.ngUnsubscribe);

        this.filteredCostCodes = Observable.combineLatest(
            this.enterTimeForm.get(this.formKeys.costCode).valueChanges,
            this.costCodeSubject,
            (filterText, costCodes) => {
                console.log('filtering cost codes with text', filterText);
                console.log('currently have ' + costCodes.length + ' cost codes total');
                return this._filterService
                    .filterCollectionByKey(costCodes, filterText)
            }
        )
            .do((costCodes) => {
                console.log('filtering costCodes');
                console.log(costCodes);
            })
            .takeUntil(this.ngUnsubscribe);

        this.filteredIndirectCostCodes = Observable.combineLatest(
            this.enterTimeForm.get(this.formKeys.indirectCostCode).valueChanges,
            this.indirectCostsSubject,
            (filterText, indirectCostCodes) => {
                console.log('filtering cost codes with text', filterText);
                console.log('currently have ' + indirectCostCodes.length + ' indirect costcodes total');
                return this._filterService
                    .filterCollectionByKey(indirectCostCodes, filterText)
            }
        )
            .do((indirectCostCodes) => {
                console.log('filtering indirect costcodes');
                console.log(indirectCostCodes);
            })
            .takeUntil(this.ngUnsubscribe);

        this.filteredSystems = Observable.combineLatest(
            this.enterTimeForm.get(this.formKeys.system).valueChanges,
            this.systemsSubject,
            (filterText, systems) => {

                return this._filterService.filterCollectionByKey(systems, filterText)

            }
        )
            .do((systems) => {
                console.log('filtering systems');
                console.log(systems);
            })
            .takeUntil(this.ngUnsubscribe);

        this.filteredPhases = Observable.combineLatest(
            this.enterTimeForm.get(this.formKeys.phase).valueChanges,
            this.phasesSubject,
            (filterText, phases) => {

                return this._filterService.filterCollectionByKey(phases, filterText)

            }
        )
            .do((phases) => {
                console.log('filtering phases');
                console.log(phases);
            })
            .takeUntil(this.ngUnsubscribe);

        /* When the collection of systems changes, we automatically select the first one and pass on the phases */
        this.systemsSubject
            .do((systems) => {

                const autoSelectedSystem = systems[0];
                this.enterTimeForm.patchValue({
                    system: autoSelectedSystem || '',
                    selectedSystem: autoSelectedSystem || ''
                });

                const phases = autoSelectedSystem ? autoSelectedSystem.Phases : [];

                this.phasesSubject.next(phases);

            })
            .takeUntil(this.ngUnsubscribe)
            .subscribe();

        /* When the collection of phases changes, we will automatically the first one if it is there. */
        this.phasesSubject
            .do((phases) => {

                const autoSelectedPhase = phases[0];
                this.enterTimeForm.patchValue({
                    phase: autoSelectedPhase || '',
                    selectedPhase: autoSelectedPhase || ''
                });

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

        this.commentsSubject
            .do((subjects) => {
                console.log('next comments');
                console.log(subjects);
            })
            .takeUntil(this.ngUnsubscribe)
            .subscribe();

        this.timeRecordSubject
            .do((record) => {
                console.log('lets update the comments from the timerecord');
                console.log(record.Comments);
                this.commentsSubject.next(record.Comments);
            })
            .takeUntil(this.ngUnsubscribe)
            .subscribe();
    }

    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

    private buildForm() {

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

        this.enterTimeForm = this._formBuilder.group({
            project: this.timeRecord.Project,
            selectedProject: [this.timeRecord.Project, [Validators.required]],
            system: system,
            selectedSystem: system,
            phase: phase,
            selectedPhase: phase,
            costCode: this.timeRecord.CostCode,
            selectedCostCode: [this.timeRecord.CostCode, [Validators.required]],
            indirectCostCode: this.timeRecord.IndirectCost,
            selectedIndirectCostCode: [this.timeRecord.IndirectCost, [Validators.required]],
            date: [this.timeRecord.Hours.Date, [Validators.required]],
            timeEntry: this._formBuilder.group(this.buildTimeEntryFormGroup()),
            standardHours: [this.timeRecord.Hours.RegularTime, [Validators.max(24)]],
            overtimeHours: [this.timeRecord.Hours.Overtime, [Validators.max(24)]],
            doubleTimeHours: [this.timeRecord.Hours.DoubleTime, [Validators.max(24)]],
            comment: ''
        });

        this.observeProjectChanges();
        this.observeSystemChanges();
        this.observePhaseChanges();
        this.observeCostCodeChanges();
        this.observeIndirectCostCodeChanges();
        this.observeHoursChanges();
        this.observeDateChanges();
        this.observeCommentChanges();
        this.observeTimeEntryChanges();
    }

    private buildTimeEntryFormGroup () {

        return {

            time: this._formBuilder.group(this.buildTimeDetailFormGroup()),
            // {validator: validateTime('in', 'out', 'startAfterEnd')}),
            break: this._formBuilder.group(this.buildBreakFormGroup())
            // {validator: validateTime('in', 'out', 'breakStartAfterEnd')})
        };
    }

    private buildTimeDetailFormGroup() {

        let punchIn: string;
        let punchOut: string;

        const punch = this.timeRecord.Punch;

        if (punch && punch.hasOwnProperty('PunchIn')) {
            punchIn = moment(punch.PunchIn).format('HH:mm');
            console.log('punch in populated with: ', punchIn);
        }

        if (punch && punch.hasOwnProperty('PunchOut')) {
            punchOut = moment(punch.PunchOut).format('HH:mm');
            console.log('punch out populated with: ', punchOut);
        }

        return {

            in: punchIn,
            out: punchOut

        }
    }

    private buildBreakFormGroup() {

        let breakIn: string;
        let breakOut: string;

        const breaks = this.timeRecord.Breaks;

        if (breaks.length === 0) { return { in: '', out: '' } }

        const currentBreak = breaks[0];

        if (currentBreak && currentBreak.hasOwnProperty('TimeIn')) {
            breakIn = moment(currentBreak.TimeIn).format('HH:mm');
            console.log('punch in populated with: ', breakIn);
        }

        if (currentBreak && currentBreak.hasOwnProperty('TimeOut')) {
            breakOut = moment(currentBreak.TimeOut).format('HH:mm');
            console.log('punch out populated with: ', breakOut);
        }

        return {

            in: breakIn,
            out: breakOut

        }
    }

    public projectWasSelected(event) {

        this.enterTimeForm.patchValue({selectedProject: event.option.value});

    }

    public systemWasSelected(event) {

        this.enterTimeForm.patchValue({selectedSystem: event.option.value});

    }

    public phaseWasSelected(event) {

        this.enterTimeForm.patchValue({selectedPhase: event.option.value});

    }

    public costCodeWasSelected(event) {

        this.enterTimeForm.patchValue({selectedCostCode: event.option.value});
    }

    public indirectCostCodeWasSelected(event) {

        this.enterTimeForm.patchValue({selectedIndirectCost: event.option.value});

    }

    private observeIndirectCostCodeChanges() {

        const indirectCostCodeField = this.enterTimeForm.get(this.formKeys.indirectCostCode);
        const indirectCostCodeSelection = this.enterTimeForm.get(this.formKeys.selectedIndirectCostCode);

        indirectCostCodeField.valueChanges.subscribe(
            (indirectCostCodeFieldText) => {

                if (indirectCostCodeFieldText || indirectCostCodeFieldText === '') {

                    this.enterTimeForm.patchValue({
                        selectedIndirectCostCode: ''
                    });

                    indirectCostCodeField.setErrors({'invalid': true});

                }
            }
        );

        indirectCostCodeSelection.valueChanges.subscribe(
            (selectedIndirectCostCode) => {

                if (selectedIndirectCostCode) {

                    indirectCostCodeField.setErrors(null);
                    indirectCostCodeSelection.markAsDirty();

                }

            }
        );
    }

    private observeProjectChanges() {

        const projectField = this.enterTimeForm.get(this.formKeys.project);
        const projectSelection = this.enterTimeForm.get(this.formKeys.selectedProject);
        const costCodeSelection = this.enterTimeForm.get(this.formKeys.selectedCostCode);

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

            }
        );

        projectSelection.valueChanges.subscribe(
            (selectedProject) => {

                if (selectedProject) {

                    projectField.setErrors(null);

                    // we need to do this explicitly since we set the selectedProject field programmatically
                    projectSelection.markAsDirty();

                    this.systemsSubject.next(selectedProject.Systems);

                    this.costCodeSubject.next(selectedProject.CostCodes);

                    costCodeSelection.clearValidators();
                    costCodeSelection.setErrors(null);

                }
            }
        );
    }

    private observeHoursChanges() {
        const standardTimeField = this.enterTimeForm.get(this.formKeys.standardHours);
        const overtimeField = this.enterTimeForm.get(this.formKeys.overtimeHours);
        const doubleTimeField = this.enterTimeForm.get(this.formKeys.doubleTimeHours);

        standardTimeField.valueChanges.subscribe(
            (standardTime) => {

                standardTimeField.markAsDirty();

            }
        );

        overtimeField.valueChanges.subscribe(
            (overtime) => {

                overtimeField.markAsDirty();

            }
        );

        doubleTimeField.valueChanges.subscribe(
            (doubleTime) => {

                doubleTimeField.markAsDirty();

            }
        );
    }

    private observeCommentChanges() {
        const commentField = this.enterTimeForm.get(this.formKeys.comment);

        commentField.valueChanges.subscribe(
            (standardTime) => {

                commentField.markAsDirty();

            }
        );

    }

    private observeSystemChanges() {
        const systemField = this.enterTimeForm.get(this.formKeys.system);
        const systemSelection = this.enterTimeForm.get(this.formKeys.selectedSystem);

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
                    this.phasesSubject.next(selectedSystem.Phases);

                }

            }
        )
    }

    private observePhaseChanges() {
        const phaseField = this.enterTimeForm.get(this.formKeys.phase);
        const phaseSelection = this.enterTimeForm.get(this.formKeys.selectedPhase);

        phaseField.valueChanges.subscribe(
            (phaseText) => {

                const fieldsToClear = {
                    selectedPhase: '',
                };
                this.resetField(phaseText, phaseField, fieldsToClear)

            }
        )

        phaseSelection.valueChanges.subscribe(
            (selectedPhase) => {

                if (selectedPhase) {

                    phaseField.setErrors(null);
                    phaseSelection.markAsDirty();
                }

            }
        )
    }

    private observeDateChanges() {
        const dateField = this.enterTimeForm.get(this.formKeys.date);

        dateField.valueChanges.subscribe(
            (date) => {
                console.log('Date in changed to: ', date);
                dateField.markAsDirty();

            }
        );

    }

    private observeTimeEntryChanges() {
        this.observeTimeChanges();
        this.observeBreakChanges();
    }

    private observeTimeChanges() {
        const timeInField = this.enterTimeForm.get(this.formKeys.timeEntry.timeIn);
        const timeOutField = this.enterTimeForm.get(this.formKeys.timeEntry.timeOut);

        timeInField.valueChanges.subscribe(
            (timeIn) => {
                console.log('Time in changed to: ', timeIn);
                timeInField.markAsDirty();

            }
        );

        timeOutField.valueChanges.subscribe(
            (timeOut) => {
                console.log('Time out changed to: ', timeOut);
                timeOutField.markAsDirty();

            }
        );

    }

    private observeBreakChanges() {

    }

    private resetField(fieldValue: string, field: AbstractControl, fieldsToClear: any) {
        if (fieldValue || fieldValue === '') {

            this.enterTimeForm.patchValue(fieldsToClear);
            field.setErrors({'invalid': true});

        }
    }

    observeCostCodeChanges() {

        const costCodeField = this.enterTimeForm.get(this.formKeys.costCode);
        const costCodeSelection = this.enterTimeForm.get(this.formKeys.selectedCostCode);

        costCodeField.valueChanges.subscribe(
            (costCodeFieldText) => {

                if (costCodeFieldText || costCodeFieldText === '') {

                    const fieldsToClear = {selectedCostCode: ''};
                    this.resetField(costCodeFieldText, costCodeField, fieldsToClear);

                }
            }
        );

        costCodeSelection.valueChanges.subscribe(
            (selectedCostCode) => {

                if (selectedCostCode) {

                    costCodeField.setErrors(null);
                    costCodeSelection.markAsDirty();
                }

            }
        );
    }

    public didTapSaveButton() {
        console.log('Saving TimeRecord');
        this.loading = true;
        const timeRecord = this.prepareTimeRecordToSave();
        this._timeRecordUpdater.updateTimeRecord(timeRecord)
            .then((data) => {
                console.log('update was successful with data', data);
                this._messageService.sendMessage(ReloadType.edited);
                this._dialogRef.close(data);
            })
            .catch((error) => {
                console.log('there was an error updating', error);
            })
            .then(() => {
                this.loading = false;
            });
    }

    public didTapLocationButton() {
        console.log('Open Location Button Tapped');

        // TODO: Open Map modal
    }

    private prepareTimeRecordToSave(): TimeRecord {
        const timeRecordToSave = new TimeRecord();
        timeRecordToSave.Id = this.timeRecord.Id;

        const formValues = this.enterTimeForm.value;
        const changedProperties = this.getChangedProperties();

        console.log('preparing to save a timerecord with formvalues: ', formValues);
        console.log('and changed properties: ', changedProperties);

        if (changedProperties.includes(this.formKeys.selectedProject)) {
            timeRecordToSave.ProjectId = formValues.selectedProject.Id;

            /* The API requires a cost code to be sent whenever a project is sent so we make sure to populate it here. */
            timeRecordToSave.CostCodeId = formValues.selectedCostCode.Id;
        }

        if (changedProperties.includes(this.formKeys.selectedPhase)) {
            timeRecordToSave.PhaseId = formValues.selectedPhase.Id;
        }

        if (changedProperties.includes(this.formKeys.selectedCostCode)) {
            timeRecordToSave.CostCodeId = formValues.selectedCostCode.Id;
        }

        if (this.hoursChanged(changedProperties)) {
            console.log('hours changed');
            timeRecordToSave.Hours = new Hours();
            timeRecordToSave.Hours.RegularTime = formValues.standardHours;
            timeRecordToSave.Hours.Overtime = formValues.overtimeHours;
            timeRecordToSave.Hours.DoubleTime = formValues.doubleTimeHours;
            timeRecordToSave.Hours.Date = formValues.date;
        } else if (this.timeInTimeOutChanged(changedProperties)) {
            console.log('punch changed');
            const dateMoment = moment(this.timeRecord.Punch.PunchIn);
            const punchInTime = formValues.timeEntry.time.in;
            const punchOutTime = formValues.timeEntry.time.out;
            timeRecordToSave.Punch = this._dateHelper.buildPunch(dateMoment, punchInTime, punchOutTime)
        }
        console.log('We formatted the time record to save: ', timeRecordToSave);
        return timeRecordToSave;
    }

    private hoursChanged(changedProperties: string[]): boolean {
        return changedProperties.includes(this.formKeys.standardHours) ||
            changedProperties.includes(this.formKeys.overtimeHours) ||
            changedProperties.includes(this.formKeys.doubleTimeHours)
    }

    private timeInTimeOutChanged(changedProperties: string[]): boolean {
        return changedProperties.includes('timeEntry')
    }

    private getChangedProperties(): string[] {
        const changedProperties = [];

        Object.keys(this.enterTimeForm.controls).forEach((name) => {
            const currentControl = this.enterTimeForm.controls[name];

            if (currentControl.dirty) {
                changedProperties.push(name);
            }

        });

        return changedProperties;
    }

    didTapCancelButton(): void {
        console.log('View Modal Tapped Cancel Button');
        this._dialogRef.close();
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

}

class TimeModalFormKeys {
    project: string;
    selectedProject: string;
    system: string;
    selectedSystem: string;
    phase: string;
    selectedPhase: string;
    costCode: string;
    selectedCostCode: string;
    indirectCostCode: string;
    selectedIndirectCostCode: string;
    date: string;
    timeEntry: TimeEntryFormKeys;
    standardHours: string;
    overtimeHours: string;
    doubleTimeHours: string;
    comment: string;
}

class TimeEntryFormKeys {
    timeIn: string;
    timeOut: string;
}
