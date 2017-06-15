import { Routes, RouterModule } from '@angular/router';

import { TimeExpensesComponent } from './time-expenses.component';

export const TimeExpensesRoutes: Routes = [
  { path: '', redirectTo: '/time-expenses/timesheets', pathMatch: 'full' },
  { path: ':view', component: TimeExpensesComponent }
];

export const TimeExpensesRoutingModule = RouterModule.forChild(TimeExpensesRoutes);
