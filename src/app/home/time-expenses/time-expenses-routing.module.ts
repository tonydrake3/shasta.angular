import { Routes, RouterModule } from '@angular/router';

import { TimeExpensesComponent } from './time-expenses.component';
import { EnterTimeComponent } from './enter-time/enter-time.component';

export const TimeExpensesRoutes: Routes = [
  { path: '', redirectTo: '/time-expenses/timesheets', pathMatch: 'full' },
  { path: ':view', component: TimeExpensesComponent },
  { path: 'enter', component: EnterTimeComponent }
];

export const TimeExpensesRoutingModule = RouterModule.forChild(TimeExpensesRoutes);