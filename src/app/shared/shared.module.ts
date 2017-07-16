import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule, MdDatepickerModule, MdNativeDateModule } from '@angular/material';

// Directives
import { EChartsDirective } from './directives/echarts.directive';
import { SlimScrollDirective } from './directives/slim-scroll.directive';
import {TextHighlightDirective} from './directives/highlight.directive';

// Services
import { AuthorizationService } from './services/authorization/authorization.service';
import {MapsService} from './services/utilities/maps.service';
import { UserService } from './services/user/user.service';
import {WeatherService} from './services/utilities/weather.service';
import {MockProjectService} from './mocks/mock.project.service';
import {MockProjectSummaryService} from './mocks/mock.project.summary.service';

// Components
import { BaseCardComponent } from './components/base.card.component';
import {MapComponent} from './components/map.component';
import { WeekSelectorComponent } from './components/week-selector.component';
import { CommentsComponent } from './components/comments.component';

// Pipes
import {StatusPipe} from './pipes/status.pipe';
import {DateToWeekdayPipe} from './pipes/date-to-weekday.pipe';
import {KeysPipe} from './pipes/keys.pipe';


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
        DateToWeekdayPipe,
        KeysPipe,
        CommentsComponent
    ],
    providers: [
        AuthorizationService,
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
        DateToWeekdayPipe,
        KeysPipe,
        CommentsComponent
    ]
})

export class SharedModule {}
