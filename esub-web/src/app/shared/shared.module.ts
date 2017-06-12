import { NgModule } from '@angular/core';

import { EChartsDirective } from './echarts.directive';
import { SlimScrollDirective } from './slim-scroll.directive';
import { AuthenticationService } from './services/authentication/authentication.service';
import { AuthorizationService } from './services/authorization/authorization.service';
import { UserService } from "./services/user/user.service";
import { AuthGuard } from "./services/authentication/auth-guard.service";

import { DEVMockDataService } from './DEV-mock-data.service';


@NgModule({
    imports: [],
    declarations: [
        EChartsDirective,
        SlimScrollDirective,
    ],
    providers: [
        AuthenticationService,
        AuthorizationService,
        AuthGuard,
        UserService
    ],
    exports: [
        EChartsDirective,
        SlimScrollDirective,
    ],
    providers: [
      DEVMockDataService
    ]
})

export class SharedModule {}
