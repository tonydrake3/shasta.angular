import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule, MdDatepickerModule, MdNativeDateModule } from '@angular/material';

// Directives
import { EChartsDirective } from './echarts.directive';
import { SlimScrollDirective } from './slim-scroll.directive';
import {TextHighlightDirective} from './directives/highlight.directive';

// Services
import { AuthorizationService } from './services/authorization/authorization.service';
import {MapsService} from './services/utilities/maps.service';
import { UserService } from './services/user/user.service';
import {WeatherService} from './services/utilities/weather.service';
import { DEVMockDataService } from './DEV-mock-data.service';
import {MockProjectService} from './mocks/mock.project.service';
import {MockProjectSummaryService} from './mocks/mock.project.summary.service';

// Components
import { BaseCardComponent } from './components/base.card.component';
import {MapComponent} from './components/map.component';
import { WeekSelectorComponent } from './components/week-selector.component';

// Pipes
import {StatusPipe} from './pipes/status.pipe';
import {DateToWeekdayPipe} from './pipes/date-to-weekday.pipe';



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
        TextHighlightDirective,
        WeekSelectorComponent,
        BaseCardComponent,
        StatusPipe,
        DateToWeekdayPipe
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
        TextHighlightDirective,
        WeekSelectorComponent,
        BaseCardComponent,
        StatusPipe,
        DateToWeekdayPipe
    ]
})

export class SharedModule {}
