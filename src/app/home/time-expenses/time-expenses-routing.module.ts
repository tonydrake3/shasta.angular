import { Routes, RouterModule } from '@angular/router';
import { TimeExpensesComponent } from './time-expenses.component';
import {TimeSettingsComponent} from './time-settings/time-settings.component';
import { EnterTimeComponent } from './enter-time/enter-time.component';
import { CanDeactivateGuard } from '../shared/services/guards/deactivate-guard.service';
export const TimeExpensesRoutes: Routes = [
  { path: '', redirectTo: '/time/timesheets', pathMatch: 'full' },
  { path: 'enter', component: EnterTimeComponent, canDeactivate: [CanDeactivateGuard] },
  { path: 'settings', component: TimeSettingsComponent },
  { path: ':view', component: TimeExpensesComponent }
];

export const TimeExpensesRoutingModule = RouterModule.forChild(TimeExpensesRoutes);
