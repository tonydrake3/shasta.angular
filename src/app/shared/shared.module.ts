import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule, MdDatepickerModule, MdNativeDateModule } from '@angular/material';

// Directives
import { EChartsDirective } from './echarts.directive';
import { SlimScrollDirective } from './slim-scroll.directive';

// Services
import { AuthorizationService } from './services/authorization/authorization.service';
import { UserService } from './services/user/user.service';
import {MapsService} from './services/utilities/maps.service';

// Components
import { WeekSelectorComponent } from './components/week-selector.component';
import { BaseCardComponent } from './components/base.card.component';
import { DEVMockDataService } from './DEV-mock-data.service';

// Pipes
import {StatusPipe} from './pipes/status.pipe';
import {MapComponent} from './components/map.component';


@NgModule({
    imports: [
      MaterialModule,
      MdDatepickerModule,
      MdNativeDateModule,
      CommonModule
    ],
    declarations: [
        BaseCardComponent,
        EChartsDirective,
        MapComponent,
        SlimScrollDirective,
        StatusPipe,
        WeekSelectorComponent
    ],
    providers: [
        AuthorizationService,
        DEVMockDataService,
        MapsService,
        UserService
    ],
    exports: [
        BaseCardComponent,
        EChartsDirective,
        MapComponent,
        SlimScrollDirective,
        StatusPipe,
        WeekSelectorComponent
    ]
})

export class SharedModule {}
