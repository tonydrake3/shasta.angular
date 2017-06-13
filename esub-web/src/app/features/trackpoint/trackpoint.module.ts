import { NgModule } from '@angular/core';

import { TrackpointRoutingModule } from './trackpoint-routing.module';

import { TrackpointComponent, TrackpointNavigationComponent } from './trackpoint.component';


@NgModule({
    imports: [
      TrackpointRoutingModule
    ],
    declarations: [
      TrackpointComponent,
      TrackpointNavigationComponent
    ]
})

export class TrackpointModule {}
