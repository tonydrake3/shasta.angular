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
import { DEVMockDataService } from './DEV-mock-data.service';

// Pipes
import {StatusPipe} from './pipes/status.pipe';
import {MockProjectService} from './mocks/mock.project.service';


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
        BaseCardComponent,
        StatusPipe
    ],
    providers: [
        AuthorizationService,
        DEVMockDataService,
        MockProjectService,
        UserService
    ],
    exports: [
        EChartsDirective,
        SlimScrollDirective,
        WeekSelectorComponent,
        BaseCardComponent,
        StatusPipe
    ]
})

export class SharedModule {}
