import { NgModule } from '@angular/core';

// Directives
import { EChartsDirective } from './echarts.directive';
import { SlimScrollDirective } from './slim-scroll.directive';

// Services
import { AuthorizationService } from './services/authorization/authorization.service';
import { UserService } from './services/user/user.service';
import { AuthGuard } from './services/guards/auth-guard.service';

// Components
import { WeekSelectorComponent } from './components/week-selector.component';

import { DEVMockDataService } from './DEV-mock-data.service';


@NgModule({
    imports: [],
    declarations: [
        EChartsDirective,
        SlimScrollDirective,
        WeekSelectorComponent
    ],
    providers: [
        AuthorizationService,
        DEVMockDataService,
        UserService
    ],
    exports: [
        EChartsDirective,
        SlimScrollDirective,
        WeekSelectorComponent
    ]
})

export class SharedModule {}
