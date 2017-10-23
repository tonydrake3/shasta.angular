///<reference path="components/base.card.component.ts"/>
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
    MdAutocompleteModule,
    MdButtonModule, MdDatepickerModule, MdDialogModule, MdInputModule, MdNativeDateModule,
    MdProgressSpinnerModule
} from '@angular/material';
import { DpDatePickerModule } from 'ng2-date-picker';
import {MockModule} from '../../mocks/mock.module';

// Directives
import {CloseDateFlyoutDirective} from './directives/date-flyout.directive';
import {EChartsDirective} from './directives/echarts.directive';
import {SlimScrollDirective} from './directives/slim-scroll.directive';
import {TextHighlightDirective} from './directives/highlight.directive';
import {DynamicInjectionDirective} from './directives/dynamic-injector.directive';
import { OnlyNumber} from './directives/onlyNumber.directive';
import {TimeInputDirective} from './directives/time-input.directive';

// Services
import {AuthorizationService} from './services/authorization/authorization.service';
import {CurrentEmployeeService} from './services/user/current-employee.service';
import {EmployeeService} from './services/user/employee.service';
import {IndirectCostCodesService} from './services/indirect-cost-codes.service';
import {MapsService} from './services/maps.service';
import { TimecardMapComponent } from '../time-expenses/timesheet-card/timesheet-card-map.component';
import {TimeSettingsService} from './services/time-settings.service';
import {UserService} from './services/user/user.service';
import {WeatherService} from './services/weather.service';
import {PopoverService} from './services/popover.service';
import { CommentsService } from './services/comments.service';
import {ProjectService} from './services/project.service';
import {DateFlyoutService} from './components/date-flyout/date-flyout.service';

// Components
import {BaseCardComponent} from './components/base.card.component';
import {CommentsComponent} from './components/comments.component';
import {MapComponent} from './components/map.component';
import {WeekSelectorComponent} from './components/week-selector.component';
import {PopoverComponent} from './components/popover.component';
import { TimeCardTimeDetailComponent } from './../time-expenses/timesheet-card/timesheet-card-timedetail.component';
import {DaypickerFlyoutComponent} from './components/date-flyout/daypicker-flyout.component';

// Pipes
import {DateToWeekdayPipe} from './pipes/date-to-weekday.pipe';
import {KeysPipe} from './pipes/keys.pipe';
import {StatusPipe} from './pipes/status.pipe';
import {ClickCloseDirective} from './directives/click-close.directive';
import {NumericPrecisionPipe} from './pipes/numeric-precision.pipe';
import {TimeFormatPipe} from './pipes/time-format.pipe';
import {CanDeactivateGuard} from './services/guards/deactivate-guard.service';
import {ConfirmationDialogComponent} from './components/confirmation-dialog.component';
import {ConfirmationDialogService} from './services/confirmation-dialog.service';
import {NotesEntryDialogComponent} from './components/notes-entry.component';
import { TimesheetCardPinComponent } from 'app/home/time-expenses/timesheet-card/timesheet-card-pin.component';
import {TimeRecordDetailModalComponent} from '../time-expenses/time-record-detail-modal/time-record-detail-modal.component';
import {EntityDisplayFormatterService} from './services/entity-display-formatter.service';

@NgModule({
    imports: [
        MdDatepickerModule,
        MdNativeDateModule,
        MdProgressSpinnerModule,
        MdButtonModule,
        MdDialogModule,
        MdInputModule,
        MdAutocompleteModule,
        CommonModule,
        FormsModule,
        MockModule,
        ReactiveFormsModule,
        DpDatePickerModule
    ],
    declarations: [
        BaseCardComponent,
        DaypickerFlyoutComponent,
        EChartsDirective,
        MapComponent,
        TimecardMapComponent,
        SlimScrollDirective,
        TextHighlightDirective,
        WeekSelectorComponent,
        StatusPipe,
        DateToWeekdayPipe,
        KeysPipe,
        CommentsComponent,
        PopoverComponent,
        DynamicInjectionDirective,
        ClickCloseDirective,
        NumericPrecisionPipe,
        CloseDateFlyoutDirective,
        TimeInputDirective,
        TimeFormatPipe,
        TimeCardTimeDetailComponent,
        ConfirmationDialogComponent,
        NotesEntryDialogComponent,
        TimesheetCardPinComponent,
        TimeRecordDetailModalComponent,
        OnlyNumber
    ],
    providers: [
        AuthorizationService,
        DateFlyoutService,
        EmployeeService,
        IndirectCostCodesService,
        MapsService,
        ProjectService,
        CurrentEmployeeService,
        MapsService,
        PopoverService,
        TimeSettingsService,
        UserService,
        WeatherService,
        TimeFormatPipe,
        CanDeactivateGuard,
        CommentsService,
        ConfirmationDialogService,
        EntityDisplayFormatterService
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
        PopoverComponent,
        DynamicInjectionDirective,
        ClickCloseDirective,
        NumericPrecisionPipe,
        CloseDateFlyoutDirective,
        TimeInputDirective,
        TimeFormatPipe,
        ConfirmationDialogComponent,
        NotesEntryDialogComponent,
        TimeCardTimeDetailComponent,
        TimeRecordDetailModalComponent
    ]
})

export class SharedHomeModule {}
