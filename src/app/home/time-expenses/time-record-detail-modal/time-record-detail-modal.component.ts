import { Component, Inject, OnInit } from '@angular/core';
import {MD_DIALOG_DATA, MdDialogRef} from '@angular/material';
import {TimeRecord} from '../../../models/domain/TimeRecord';
import {IndirectCostTimeModalDisplayData, TimeModal, TimeModalDisplayData, TimeModalMode, DisplayModeSpecifying} from './ModalModels';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EnterTimeFilterService} from "../enter-time/enter-time-filter.service";
import {Observable} from "rxjs/Observable";
import {Project} from "../../../models/domain/Project";

@Component({
  selector: 'esub-time-record-detail-modal',
  templateUrl: './time-record-detail-modal.component.html',
  styleUrls: ['./time-record-detail-modal.component.scss']
})
export class TimeRecordDetailModalComponent implements OnInit, TimeModal {

    // Private
    private timeRecord: TimeRecord;

    // Public
    public enterTimeForm: FormGroup;
    public projects: Array<Project>;
    public filteredProjects: Observable<Project[]>;
    public displayData: TimeModalDisplayData;
    public displayMode: TimeModalMode;

    constructor (
        public dialogRef: MdDialogRef<TimeRecordDetailModalComponent>,
        @Inject(MD_DIALOG_DATA) public data: DisplayModeSpecifying & TimeRecord,
        private _formBuilder: FormBuilder,
        private _filterService: EnterTimeFilterService // reused Filter Service... yay!
    ) {}

    ngOnInit () {
        console.log('Initializing modal. The data is');
        console.log(this.data);
        this.initializeTimeRecordFromInputData();
        this.initializeTimeRecordInputData();
        this.displayMode = this.data.displayMode;
        if (this.displayMode === TimeModalMode.edit) {
            this.buildForm()
        }
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
            employee: '',
            date: ['', [Validators.required]],
            standardHours: '',
            overtimeHours: '',
            doubleTimeHours: '',
        })
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

    // Duplicated from Enter Form
    public displayFormatted (value): string {

        if (value) {

            return value.Number + ' - ' + value.Name;
        }
        return '';
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
