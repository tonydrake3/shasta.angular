import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';

import { SharedModule } from '../../shared/shared.module';

import { TimeExpensesRoutingModule } from './time-expenses-routing.module';

import { TimeExpensesComponent } from './time-expenses.component';
import { TimesheetCardComponent } from './timesheet-card/timesheet-card.component';

@NgModule({
    imports: [
      CommonModule,
      FormsModule,
      MaterialModule,
      TimeExpensesRoutingModule,
      SharedModule
    ],
    declarations: [
      TimeExpensesComponent,
      TimesheetCardComponent
    ]
})

export class TimeExpensesModule {}