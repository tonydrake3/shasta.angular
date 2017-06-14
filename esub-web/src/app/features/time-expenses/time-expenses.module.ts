import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '@angular/material';

import { TimeExpensesRoutingModule } from './time-expenses-routing.module';

import { TimeExpensesComponent, TimeManagementComponent, ExpenseManagementComponent } from './time-expenses.component';
import { TimesheetsComponent } from './timesheets/timesheets.component';


@NgModule({
    imports: [
      CommonModule,
      FormsModule,
      MaterialModule,
      TimeExpensesRoutingModule
    ],
    declarations: [
      TimeExpensesComponent,
      TimesheetsComponent,
      TimeManagementComponent,
      ExpenseManagementComponent
    ]
})

export class TimeExpensesModule {}
