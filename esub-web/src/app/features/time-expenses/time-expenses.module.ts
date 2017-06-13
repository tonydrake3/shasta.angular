import { NgModule } from '@angular/core';

import { TimeExpensesRoutingModule } from './time-expenses-routing.module';

import { TimeExpensesComponent, TimeManagementComponent, ExpenseManagementComponent } from './time-expenses.component';
import { TimesheetsComponent } from './timesheets/timesheets.component';


@NgModule({
    imports: [
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
