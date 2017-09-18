///<reference path="components/base.card.component.ts"/>
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule, MdDatepickerModule, MdNativeDateModule } from '@angular/material';
import {DpDatePickerModule} from 'ng2-date-picker';

// Directives
import {CloseDateFlyoutDirective} from './directives/date-flyout.directive';
import {EChartsDirective} from './directives/echarts.directive';
import {SlimScrollDirective} from './directives/slim-scroll.directive';
import {TextHighlightDirective} from './directives/highlight.directive';
import {TimeInputDirective} from './directives/time-input.directive';

// Services
import {AuthorizationService} from './services/authorization/authorization.service';
import {EmployeeService} from './services/user/employee.service';
import {IndirectCostCodesService} from './services/indirect-cost-codes.service';
import {MapsService} from './services/maps.service';
import {UserService} from './services/user/user.service';
import {WeatherService} from './services/weather.service';
import {ProjectService} from './services/project.service';
import {DateFlyoutService} from './components/date-flyout/date-flyout.service';

// Components
import {BaseCardComponent} from './components/base.card.component';
import {CommentsComponent} from './components/comments.component';
import {MapComponent} from './components/map.component';
import {WeekSelectorComponent} from './components/week-selector.component';
import {DaypickerFlyoutComponent} from './components/date-flyout/daypicker-flyout.component';
import {GridTypeaheadComponent} from './components/controls/grid-typeahead.component';

// Pipes
import {DateToWeekdayPipe} from './pipes/date-to-weekday.pipe';
import {KeysPipe} from './pipes/keys.pipe';
import {StatusPipe} from './pipes/status.pipe';
import {NumericPrecisionPipe} from './pipes/numeric-precision.pipe';
import {TimeFormatPipe} from './pipes/time-format.pipe';
import {CanDeactivateGuard} from './guards/deactivate-guard.service';
import {ConfirmationDialogComponent} from './components/confirmation-dialog.component';
import {ConfirmationDialogService} from './services/confirmation-dialog.service';
import {TimeValidationService} from './services/time-validation.service';

@NgModule({
    imports: [
        MaterialModule,
        MdDatepickerModule,
        MdNativeDateModule,
        CommonModule,
        FormsModule,
        DpDatePickerModule,
    ],
    declarations: [
        BaseCardComponent,
        DaypickerFlyoutComponent,
        EChartsDirective,
        MapComponent,
        SlimScrollDirective,
        TextHighlightDirective,
        WeekSelectorComponent,
        StatusPipe,
        DateToWeekdayPipe,
        KeysPipe,
        CommentsComponent,
        NumericPrecisionPipe,
        CloseDateFlyoutDirective,
        GridTypeaheadComponent,
        TimeInputDirective,
        TimeFormatPipe,
        ConfirmationDialogComponent
    ],
    providers: [
        AuthorizationService,
        DateFlyoutService,
        EmployeeService,
        IndirectCostCodesService,
        MapsService,
        ProjectService,
        UserService,
        WeatherService,
        TimeFormatPipe,
        CanDeactivateGuard,
        ConfirmationDialogService,
        TimeValidationService
    ],
    exports: [
        BaseCardComponent,
        DaypickerFlyoutComponent,
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
        NumericPrecisionPipe,
        CloseDateFlyoutDirective,
        GridTypeaheadComponent,
        TimeInputDirective,
        TimeFormatPipe,
        ConfirmationDialogComponent
    ]
})

export class SharedHomeModule {}
