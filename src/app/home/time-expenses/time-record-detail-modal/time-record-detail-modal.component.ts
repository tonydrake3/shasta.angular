import { Component, Inject, OnInit } from '@angular/core';
import {MD_DIALOG_DATA, MdDialogRef} from '@angular/material';
import {TimeRecord} from '../../../models/domain/TimeRecord';
import {
    IndirectCostTimeModalDisplayData, TimeModal, TimeModalDisplayData, TimeModalMode, DisplayModeSpecifying,
    ProjectManualHoursDisplayData, ProjectPunchDisplayData
} from './ModalModels';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {EnterTimeFilterService} from '../enter-time/enter-time-filter.service';
import {Observable} from 'rxjs/Observable';
import {Project} from '../../../models/domain/Project';
import {CostCode} from '../../../models/domain/CostCode';
import {ProjectService} from '../../shared/services/project.service';
import {IndirectCostCodesService} from '../../shared/services/indirect-cost-codes.service';
import {IndirectCost} from '../../../models/domain/IndirectCost';
import {EntityDisplayFormatterService} from './entity-display-formatter.service';

@Component({
    selector: 'esub-time-record-detail-modal',
    templateUrl: './time-record-detail-modal.component.html',
    styleUrls: ['./time-record-detail-modal.component.scss']
})
export class TimeRecordDetailModalComponent implements OnInit, TimeModal {

    // Private
    private timeRecord: TimeRecord;

    // Public
    public enterTimeForm: FormGroup; // Duplicated
    public projects: Project[];   // Duplicated
    public costCodes: CostCode[];
    public indirectCostCodes: IndirectCost[];
    public filteredProjects: Observable<Project[]>; // Duplicated
    public filteredIndirectCostCodes: Observable<IndirectCost[]>; // Duplicated
    public filteredCostCodes: Observable<IndirectCost[]>; // Duplicated

    public displayData: TimeModalDisplayData;
    public displayMode: TimeModalMode;

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
                    const projects: Project[] = result['Value'];
                    this.projects = projects;
                }
            );

        // Duplicated from Enter-time-preload-manager
        this._indirectCostsService.indirectCostCodes$
            .subscribe( (result) => {
                console.log('updated indirect costs...');
                console.log(result);
                const indirectCostCodes: Array<IndirectCost> = result['Value'];
                this.indirectCostCodes = indirectCostCodes;
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
        this.costCodes = [];
    }

    // Duplicated from Enter Form... refactor?
    private buildForm() {
        console.log('Building form. The display data is');
        console.log(this.displayData);
        this.enterTimeForm = this._formBuilder.group( {
            project: this.timeRecord.Project,
            selectedProject: ['', [ Validators.required ] ],
            system: '',
            selectedSystem: '',
            phase: '',
            selectedPhase: '',
            costCode: this.timeRecord.CostCode,
            selectedCostCode: ['', [Validators.required]],
            indirectCostCode: '',
            selectedIndirectCostCode: ['', [Validators.required]],
            employee: '',
            date: ['', [Validators.required]],
            standardHours: '',
            overtimeHours: '',
            doubleTimeHours: '',
        })

        this.observeProjectChanges();
        this.observeCostCodeChanges();
        this.observeIndirectCostCodeChanges();
    }

    public close () {
        console.log('Close modal without saving');
        this.dialogRef.close();
    }

    public save () {
        console.log('Save this record');
        this.dialogRef.close();
    }

    // Duplicated from Enter Form
    public projectsTypeAheadHasFocus (value) {
        console.log('Project Typeahead has focus with value', value);
        if (value) {

            this.filteredProjects = this._filterService.filterCollection(value, this.projects);

        } else {

            this.filteredProjects = Observable.of(this.projects);

        }
    }

    // Duplicated
    public projectWasSelected (event) {
        console.log('Project was selected with event', event);
        this.enterTimeForm.patchValue({
            selectedProject: event.option.value
        });
    }

    // Duplicated
    public indirectCostCodesTypeAheadHasFocus (value) {

        console.log('Indirect Cost Code TypeAhead has focus with value: ');
        console.log(value);
        if (value) {
            console.log('by ' + value);
            this.filteredIndirectCostCodes = this._filterService
                .filterByKeyValuePair({ 'Description': value }, this.indirectCostCodes);

        } else {

            this.filteredIndirectCostCodes = Observable.of(this.indirectCostCodes);

        }
    }

    // Duplicated
    public costCodesTypeAheadHasFocus (value) {

        console.log('Cost Code TypeAhead has focus with value: ');
        console.log(value);
        if (value) {
            this.filteredCostCodes = this._filterService
                .filterByKeyValuePair({
                        'Code': value,
                        'Name': value
                    }, this.costCodes
                );

        } else {

            this.filteredCostCodes = Observable.of(this.costCodes);

        }
    }

    // Duplicated
    public costCodeWasSelected (event) {
        console.log('Cost Code was selected with event', event);

        this.enterTimeForm.patchValue({
            selectedCostCode: event.option.value
        });
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
                            .filterByKeyValuePair({'Description': indirectCostCodeFieldText}, this.indirectCostCodes);

                    } else {

                        indirectCostCodeField.setErrors({'invalid' : true});

                        this.filteredIndirectCostCodes = this._filterService
                            .filterByKeyValuePair({'Description': indirectCostCodeFieldText}, this.indirectCostCodes);

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
                    projectField.setErrors({'invalid' : true});

                    this.filteredProjects = this._filterService
                        .filterCollection(project, this.projects);
                }
            }
        );

        projectSelection.valueChanges.subscribe (
            (selectedProject) => {

                console.log('projectSelection.valueChanges', selectedProject);
                if (selectedProject) {

                    projectField.setErrors(null);
                    this.costCodes = selectedProject.CostCodes;
                    // this.checkDefaultSystem(selectedProject.Systems);
                    // this.checkDefaultCostCode(selectedProject.CostCodes);
                    // this.filterEmployeesByProject(selectedProject.Id);
                    // this.selectedEmployees = [];

                    costCodeSelection.clearValidators();
                    costCodeSelection.setErrors(null);
                }
            }
        );
    }

    observeCostCodeChanges() {
        console.log('Cost Code changed');
        const costCodeField = this.enterTimeForm.get('costCode');
        const costCodeSelection = this.enterTimeForm.get('selectedCostCode');

        console.log(costCodeField);
        console.log(costCodeSelection);

        costCodeField.valueChanges.subscribe(
            (costCodeFieldText) => {
                console.log('next cost code field change');
                console.log(costCodeFieldText);

                if (costCodeFieldText || costCodeFieldText === '') {

                    this.enterTimeForm.patchValue({
                        selectedIndirectCostCode: ''
                    });

                    if (this.costCodes.length > 0) {

                        this.filteredIndirectCostCodes = this._filterService
                            .filterByKeyValuePair({
                                'Code': costCodeFieldText,
                                'Name': costCodeFieldText
                            }, this.costCodes
                            );

                    } else {

                        costCodeField.setErrors({'invalid' : true});

                        this.filteredIndirectCostCodes = this._filterService
                            .filterByKeyValuePair({
                                    'Code': costCodeFieldText,
                                    'Name': costCodeFieldText
                                }, this.costCodes
                            );

                    }
                }
            }
        );

        costCodeSelection.valueChanges.subscribe(
            (selectedCostCode) => {

                if (selectedCostCode && this.costCodes.length === 0) {
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
