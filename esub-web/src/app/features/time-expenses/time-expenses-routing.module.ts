import { Routes, RouterModule } from '@angular/router';

import { TimeExpensesComponent, TimeManagementComponent, ExpenseManagementComponent } from './time-expenses.component';
import { TimesheetsComponent } from './timesheets/timesheets.component';

export const TimeExpensesRoutes: Routes = [
  {
      path: '',
      component: TimeExpensesComponent,
      children: [
          { path: '', redirectTo: '/app/dashboard', pathMatch: 'full' },
          { path: 'timesheets', component: TimesheetsComponent },
          { path: 'time-management', component: TimeManagementComponent },
          { path: 'expense-management', component: ExpenseManagementComponent }
      ]
  }
];

export const TimeExpensesRoutingModule = RouterModule.forChild(TimeExpensesRoutes);
