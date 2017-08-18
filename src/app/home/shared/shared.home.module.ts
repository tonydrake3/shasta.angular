///<reference path="components/base.card.component.ts"/>
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule, MdDatepickerModule, MdNativeDateModule } from '@angular/material';
import {MockModule} from '../../mocks/mock.module';

// Directives
import {EChartsDirective} from './directives/echarts.directive';
import {SlimScrollDirective} from './directives/slim-scroll.directive';
import {TextHighlightDirective} from './directives/highlight.directive';
import {DynamicInjectionDirective} from './directives/dynamic-injector.directive';

// Services
import {AuthorizationService} from './services/authorization/authorization.service';
import {CurrentEmployeeService} from './services/user/current-employee.service';
import {MapsService} from './services/maps.service';
import {UserService} from './services/user/user.service';
import {WeatherService} from './services/weather.service';
import {PopoverService} from './services/popover.service';

// Components
import {BaseCardComponent} from './components/base.card.component';
import {CommentsComponent} from './components/comments.component';
import {MapComponent} from './components/map.component';
import {WeekSelectorComponent} from './components/week-selector.component';
import {PopoverComponent} from './components/popover.component';

// Pipes
import {DateToWeekdayPipe} from './pipes/date-to-weekday.pipe';
import {KeysPipe} from './pipes/keys.pipe';
import {StatusPipe} from './pipes/status.pipe';
import {ClickCloseDirective} from './directives/click-close.directive';

@NgModule({
    imports: [
        MaterialModule,
        MdDatepickerModule,
        MdNativeDateModule,
        CommonModule,
        FormsModule,
        MockModule

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
        PopoverComponent,
        DynamicInjectionDirective,
        ClickCloseDirective
    ],
    providers: [
        AuthorizationService,
        CurrentEmployeeService,
        MapsService,
        PopoverService,
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
        PopoverComponent,
        DynamicInjectionDirective,
        ClickCloseDirective
    ]
})

export class SharedHomeModule {}
