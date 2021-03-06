import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
    MdChipsModule, MdSelectModule, MdCheckboxModule, MdProgressBarModule,
    MdAutocompleteModule, MdTabsModule, MdTooltipModule, MdInputModule, MdButtonModule, MdDatepickerModule,
    MdDialogModule, MdCardModule
} from '@angular/material';
import { DpDatePickerModule } from 'ng2-date-picker';

import { SharedModule } from '../../shared/shared.module';
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

import { SharedHomeModule } from '../shared/shared.home.module';
import {TimeSettingsComponent} from './time-settings/time-settings.component';
import {TimeSettingsService} from './time-settings/time-settings.service';

import { TimeExpensesService } from './time-expenses.service';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { ProjectSummaryService } from '../projects/project-summary/project-summary.service';
import { EnterTimeManager } from './enter-time/enter-time.manager';
import { EnterTimeStatusService } from './enter-time/enter-time-status.service';
import { EnterTimePreloadManager } from './enter-time/enter-time-preload.manager';
import { EnterTimeBatchService } from './enter-time/enter-time-batch.service';
import { EnterTimeFilterService } from './enter-time/enter-time-filter.service';
import { EnterTimeTransformService } from './enter-time/enter-time-transform.service';
import { EntityDisplayFormatterService } from '../shared/services/entity-display-formatter.service';
import {EnterTimeCopyService} from './enter-time/enter-time-copy.service';
import {TimeRecordUpdaterService} from './time-record-detail-modal/time-record-updater.service';
import {MessageService} from './timesheet-card/message.service';

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
        MdTooltipModule,
        FlashMessagesModule
    ],
    declarations: [
        TimeExpensesComponent,
        TimesheetCardComponent,
        BadgedHourComponent,
        EnterTimeComponent,
        EnterTimeFormComponent,
        EnterTimeGridComponent,
        TimeSettingsComponent,
    ],
    providers: [
        TimeRecordsService,
        TimeRecordUpdaterService,
        EnterTimeBatchService,
        TimeExpensesService,
        EnterTimeFilterService,
        EnterTimeManager,
        MessageService,
        EnterTimeStatusService,
        EnterTimePreloadManager,
        ProjectSummaryService,
        EnterTimeTransformService,
        EntityDisplayFormatterService,
        EnterTimeCopyService,
        TimeSettingsService
    ]
})

export class TimeExpensesModule {}
