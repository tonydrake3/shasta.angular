import { NgModule } from '@angular/core';

import { TimeExpensesRoutingModule } from './time-expenses-routing.module';

import { TimeExpensesComponent, TimesheetsComponent, TimeManagementComponent, ExpenseManagementComponent } from './time-expenses.component';


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
