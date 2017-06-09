import { NgModule } from '@angular/core';

import { EChartsDirective } from './echarts.directive';
import { SlimScrollDirective } from './slim-scroll.directive';

import { DEVMockDataService } from './DEV-mock-data.service';


@NgModule({
    imports: [],
    declarations: [
        EChartsDirective,
        SlimScrollDirective,
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
