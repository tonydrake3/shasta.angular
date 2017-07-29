import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';

import { DpDatePickerModule } from 'ng2-date-picker';

import { SharedModule } from '../../shared/shared.module';

import { TimeExpensesRoutingModule } from './time-expenses-routing.module';

import { TimeExpensesComponent } from './time-expenses.component';
import { TimesheetCardComponent } from './timesheet-card/timesheet-card.component';
import { BadgedHourComponent } from './timesheet-card/badged-hour.component';
import { EnterTimeComponent } from './enter-time/enter-time.component';

import { TimeRecordsService } from './time-records.service';
import { SharedHomeModule } from '../shared/shared.home.module';

@NgModule({
    imports: [
      CommonModule,
      FormsModule,
      MaterialModule,
      TimeExpensesRoutingModule,
      SharedModule,
      SharedHomeModule,
      DpDatePickerModule
    ],
    declarations: [
      TimeExpensesComponent,
      TimesheetCardComponent,
      BadgedHourComponent,
      EnterTimeComponent
    ],
    providers: [
      TimeRecordsService
    ]
})

export class TimeExpensesModule {}
