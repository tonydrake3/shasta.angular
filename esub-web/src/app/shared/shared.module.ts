import { NgModule } from '@angular/core';

import { EChartsDirective } from './echarts.directive';
import { SlimScrollDirective } from './slim-scroll.directive';
import { AuthenticationService } from './services/authentication/authentication.service';
import { AuthorizationService } from './services/authorization/authorization.service';


@NgModule({
    imports: [],
    declarations: [
        EChartsDirective,
        SlimScrollDirective,
    ],
    providers: [
        AuthenticationService,
        AuthorizationService
    ],
    exports: [
        EChartsDirective,
        SlimScrollDirective,
    ]
})

export class SharedModule {}
