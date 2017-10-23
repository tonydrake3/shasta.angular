import { Routes, RouterModule } from '@angular/router';

import { TimeExpensesComponent } from './time-expenses.component';
import { EnterTimeComponent } from './enter-time/enter-time.component';

import {TimeSettingsComponent} from './settings/settings.component';
import { CanDeactivateGuard } from '../shared/services/guards/deactivate-guard.service';
export const TimeExpensesRoutes: Routes = [
  { path: '', redirectTo: '/time/timesheets', pathMatch: 'full' },
  { path: 'enter', component: EnterTimeComponent, canDeactivate: [CanDeactivateGuard] },
  { path: ':view', component: TimeExpensesComponent },
  { path: 'settings', component: TimeSettingsComponent }
];

export const TimeExpensesRoutingModule = RouterModule.forChild(TimeExpensesRoutes);
