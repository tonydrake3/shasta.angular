import { Component, Inject, OnInit } from '@angular/core';
import {MD_DIALOG_DATA, MdDialogRef} from '@angular/material';
import {TimeRecord} from '../../../models/domain/TimeRecord';
import {IndirectCostTimeModalDisplayData, TimeModal, TimeModalDisplayData, TimeModalMode, DisplayModeSpecifying} from './ModalModels';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {EnterTimeFilterService} from '../enter-time/enter-time-filter.service';
import {Observable} from 'rxjs/Observable';
import {Project} from '../../../models/domain/Project';
import {CostCode} from '../../../models/domain/CostCode';
import {ProjectService} from '../../shared/services/project.service';
import {IndirectCostCodesService} from '../../shared/services/indirect-cost-codes.service';
import {IndirectCost} from '../../../models/domain/IndirectCost';

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
    public projects: Array<Project>;   // Duplicated
    public indirectCostCodes: Array<IndirectCost>;
    public filteredProjects: Observable<Project[]>; // Duplicated
    public filteredIndirectCostCodes: Observable<IndirectCost[]>; // Duplicated

    public displayData: TimeModalDisplayData;
    public displayMode: TimeModalMode;

    constructor (
        public dialogRef: MdDialogRef<TimeRecordDetailModalComponent>,
        @Inject(MD_DIALOG_DATA) public data: DisplayModeSpecifying & TimeRecord,
        private _formBuilder: FormBuilder,
        private _filterService: EnterTimeFilterService,
        private _projectService: ProjectService,
        private _indirectCostsService: IndirectCostCodesService// reused Filter Service... yay!
    ) {

        // Duplicated from Enter-time-preload-manager
        this._projectService.getLatest();
        this._indirectCostsService.getLatest();
        this._projectService.projects$
            .subscribe(
                (result) => {
                    const projects: Array<Project> = result['Value'];
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
        this.buildForm()
        this.indirectCostCodes = [];
        this.projects = [];
    }

    // Duplicated from Enter Form... refactor?
    private buildForm() {
        this.enterTimeForm = this._formBuilder.group( {
            project: this.displayData.projectText,
            selectedProject: ['', [ Validators.required ] ],
            system: '',
            selectedSystem: '',
            phase: '',
            selectedPhase: '',
            costCode: '',
            selectedCostCode: ['', [Validators.required]],
            indirectCostCode: '',
            selectedIndirectCostCode: ['', [Validators.required]],
            employee: '',
            date: ['', [Validators.required]],
            standardHours: '',
            overtimeHours: '',
            doubleTimeHours: '',
        })

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
    public openProjects (value) {

        if (value) {

            this.filteredProjects = this._filterService.filterCollection(value, this.projects);

        } else {

            this.filteredProjects = Observable.of(this.projects);

        }
    }

    // Duplicated
    public projectSelected (event) {

        this.enterTimeForm.patchValue({
            selectedProject: event.option.value
        });
    }

    // Duplicated
    public openIndirectCostCodes (value) {

        // const selectedProject = this.enterTimeForm.get('selectedProject');

        // TODO: Looks like we check whether there are any cost codes to determine whether we have indirect cost codes instead.
        // Lets refactor that when we get a chance
        // if (this.costCodes && this.costCodes.length > 0) {
        //
        //     if (value) {
        //
        //         this.filteredCostCodes = this._filterService.filterProjectCodes(value, selectedProject.value);
        //     } else {
        //
        //         this.filteredCostCodes = Observable.of(this.costCodes);
        //     }
        //
        // } else {
        console.log('filtering indirect cost codes with value ' + value);
            if (value) {
                console.log('by ' + value);
                this.filteredIndirectCostCodes = this._filterService
                    .filterByKeyValuePair({ 'Description': value }, this.indirectCostCodes);

            } else {

                this.filteredIndirectCostCodes = Observable.of(this.indirectCostCodes);
            }
        // }
    }

    // Duplicated from Enter Form
    public displayFormatted (value): string {

        if (value) {

            return value.Number + ' - ' + value.Name;
        }
        return '';
    }

    // Duplicated
    public displayIndirectCostCode (value: IndirectCost) {
        console.log('to format the indirect cost value');
        console.log(value);
        if (value) {

            return value.Description;

        }
        return '';
    }

    // Duplicated
    public costCodeSelected (event) {

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
        }
    }
}
