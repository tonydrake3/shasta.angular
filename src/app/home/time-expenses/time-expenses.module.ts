// Modules
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {MaterialModule, MdChipsModule} from '@angular/material';
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

@NgModule({
    imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      MaterialModule,
      TimeExpensesRoutingModule,
      SharedModule,
      SharedHomeModule,
      DpDatePickerModule,
      MdChipsModule
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
      EnterTimeManager
    ]
})

export class TimeExpensesModule {}
