///<reference path="components/base.card.component.ts"/>
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule, MdDatepickerModule, MdNativeDateModule } from '@angular/material';

// Directives
import {EChartsDirective} from './directives/echarts.directive';
import {SlimScrollDirective} from './directives/slim-scroll.directive';
import {TextHighlightDirective} from './directives/highlight.directive';

// Services
import {AuthorizationService} from './services/authorization/authorization.service';
import {EmployeeService} from './services/user/employee.service';
import {IndirectCostCodesService} from './services/indirect-cost-codes.service';
import {MapsService} from './services/maps.service';
import {UserService} from './services/user/user.service';
import {WeatherService} from './services/weather.service';
import {ProjectService} from './services/project.service';

// Components
import {BaseCardComponent} from './components/base.card.component';
import {CommentsComponent} from './components/comments.component';
import {MapComponent} from './components/map.component';
import {WeekSelectorComponent} from './components/week-selector.component';

// Pipes
import {DateToWeekdayPipe} from './pipes/date-to-weekday.pipe';
import {KeysPipe} from './pipes/keys.pipe';
import {StatusPipe} from './pipes/status.pipe';
import {NumericPrecisionPipe} from './pipes/numeric-precision.pipe';


@NgModule({
    imports: [
        MaterialModule,
        MdDatepickerModule,
        MdNativeDateModule,
        CommonModule,
        FormsModule

    ],
    declarations: [
        BaseCardComponent,
        EChartsDirective,
        MapComponent,
        SlimScrollDirective,
        TextHighlightDirective,
        WeekSelectorComponent,
        StatusPipe,
        DateToWeekdayPipe,
        KeysPipe,
        CommentsComponent,
        NumericPrecisionPipe
    ],
    providers: [
        AuthorizationService,
        EmployeeService,
        IndirectCostCodesService,
        MapsService,
        ProjectService,
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
        CommentsComponent,
        NumericPrecisionPipe
    ]
})

export class SharedHomeModule {}
