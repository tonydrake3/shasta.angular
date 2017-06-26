import { NgModule } from '@angular/core';
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
import { DEVMockDataService } from './DEV-mock-data.service';

// Pipes
import {StatusPipe} from './pipes/status.pipe';


@NgModule({
    imports: [
      MaterialModule,
      MdDatepickerModule,
      MdNativeDateModule
    ],
    declarations: [
        EChartsDirective,
        SlimScrollDirective,
        WeekSelectorComponent,
        StatusPipe
    ],
    providers: [
        AuthorizationService,
        DEVMockDataService,
        UserService
    ],
    exports: [
        EChartsDirective,
        SlimScrollDirective,
        WeekSelectorComponent,
        StatusPipe
    ]
})

export class SharedModule {}
