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
import {MockProjectService} from './mocks/mock.project.service';
import {MockProjectSummaryService} from './mocks/mock.project.summary.service';
import {WeatherService} from './services/utilities/weather.service';
import {WeatherPipe} from './pipes/weather.pipe';


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
        WeatherPipe,
        WeekSelectorComponent
    ],
    providers: [
        AuthorizationService,
        DEVMockDataService,
        MockProjectService,
        MockProjectSummaryService,
        MapsService,
        UserService,
        WeatherService
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
