import { Routes, RouterModule } from '@angular/router';

import { TrackpointComponent, TrackpointNavigationComponent } from './trackpoint.component';

export const TrackpointRoutes: Routes = [
  {
      path: '',
      component: TrackpointComponent,
      children: [
          { path: '', redirectTo: '/app/dashboard', pathMatch: 'full' },
          { path: ':id', component: TrackpointNavigationComponent }
      ]
  }
];

export const TrackpointRoutingModule = RouterModule.forChild(TrackpointRoutes);
