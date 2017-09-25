// Modules
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
    MdChipsModule, MdSelectModule, MdCheckboxModule, MdProgressBarModule,
    MdAutocompleteModule, MdTabsModule, MdTooltipModule, MdInputModule, MdButtonModule
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
import {EnterTimeStatusService} from './enter-time/enter-time-status.service';
import {EnterTimePreloadManager} from './enter-time/enter-time-preload.manager';
import {EnterTimeBatchService} from './enter-time/enter-time-batch.service';
import {EnterTimeAutocompleteService} from './enter-time/enter-time-autocomplete.service';

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
      MdButtonModule,
      MdChipsModule,
      MdSelectModule,
      MdInputModule,
      MdAutocompleteModule,
      MdTabsModule,
      MdTooltipModule
    ],
    declarations: [
      TimeExpensesComponent,
      TimesheetCardComponent,
      BadgedHourComponent,
      EnterTimeComponent,
      EnterTimeFormComponent,
      EnterTimeGridComponent
    ],
    providers: [
      TimeRecordsService,
      EnterTimeAutocompleteService,
      EnterTimeBatchService,
      EnterTimeManager,
      EnterTimeStatusService,
      EnterTimePreloadManager
    ]
})

export class TimeExpensesModule {}
