import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule, MdDatepickerModule, MdNativeDateModule } from '@angular/material';

// Directives
import { EChartsDirective } from './echarts.directive';
import { SlimScrollDirective } from './slim-scroll.directive';

// Services
import { AuthorizationService } from './services/authorization/authorization.service';
import { UserService } from './services/user/user.service';
import {DataSyncService} from './services/utilities/data-sync.service';

// Components
import { WeekSelectorComponent } from './components/week-selector.component';
import { BaseCardComponent } from './components/base.card.component';

// Pipes
import {StatusPipe} from './pipes/status.pipe';


@NgModule({
    imports: [
      MaterialModule,
      MdDatepickerModule,
      MdNativeDateModule,
      CommonModule
    ],
    declarations: [
        EChartsDirective,
        SlimScrollDirective,
        WeekSelectorComponent,
        StatusPipe,
        BaseCardComponent
    ],
    providers: [
        AuthorizationService,
        UserService
    ],
    exports: [
        EChartsDirective,
        SlimScrollDirective,
        WeekSelectorComponent,
        StatusPipe,
        BaseCardComponent
    ]
})

export class SharedModule {}
