// Modules
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
    MdChipsModule, MdSelectModule, MdCheckboxModule, MdProgressBarModule,
    MdAutocompleteModule, MdTabsModule, MdTooltipModule, MdInputModule, MdButtonModule, MdDatepickerModule,
    MdDialogModule
} from '@angular/material';
import { DpDatePickerModule } from 'ng2-date-picker';

import { SharedModule } from '../../shared/shared.module';
import { SharedHomeModule } from '../shared/shared.home.module';
import { TimeExpensesRoutingModule } from './time-expenses-routing.module';

// Components
import { TimeExpensesComponent } from './time-expenses.component';
import { TimesheetCardComponent } from './timesheet-card/timesheet-card.component';
import { BadgedHourComponent } from './timesheet-card/badged-hour.component';
import { EnterTimeComponent } from './enter-time/enter-time.component';
import { EnterTimeFormComponent } from './enter-time/enter-time-form/enter-time-form.component';
import { EnterTimeGridComponent } from './enter-time/enter-time-grid/enter-time-grid.component';

// Services
import { TimeRecordsService } from './time-records.service';
import { EnterTimeManager } from './enter-time/enter-time.manager';
import { EnterTimeStatusService } from './enter-time/enter-time-status.service';
import { EnterTimePreloadManager } from './enter-time/enter-time-preload.manager';
import { EnterTimeBatchService } from './enter-time/enter-time-batch.service';
import { EnterTimeFilterService } from './enter-time/enter-time-filter.service';
import { EnterTimeTransformService } from './enter-time/enter-time-transform.service';
import {EnterTimeGridBuilderService} from './enter-time/enter-time-grid-builder.service';
import {EnterTimeNoteDialogComponent} from './enter-time/enter-time-note-dialog/enter-time-note-dialog.component';
import { TimeRecordDetailModalComponent } from './time-record-detail-modal/time-record-detail-modal.component';

@NgModule({
    imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      MdCheckboxModule,
      MdProgressBarModule,
      TimeExpensesRoutingModule,
      SharedModule,
      SharedHomeModule,
      DpDatePickerModule,
      MdAutocompleteModule,
      MdButtonModule,
      MdChipsModule,
      MdDatepickerModule,
      MdDialogModule,
      MdInputModule,
      MdSelectModule,
      MdTabsModule,
      MdTooltipModule
    ],
    declarations: [
      TimeExpensesComponent,
      TimesheetCardComponent,
      BadgedHourComponent,
      EnterTimeComponent,
      EnterTimeFormComponent,
      EnterTimeGridComponent,
      TimeRecordDetailModalComponent
    ],
    providers: [
      TimeRecordsService,
      EnterTimeBatchService,
      EnterTimeFilterService,
      EnterTimeGridBuilderService,
      EnterTimeManager,
      EnterTimeStatusService,
      EnterTimePreloadManager,
      EnterTimeTransformService
    ]
})

export class TimeExpensesModule {}
