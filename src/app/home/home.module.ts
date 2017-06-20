import { NgModule } from '@angular/core';

import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    imports: [
        HomeRoutingModule,
        SharedModule,
    ],
    declarations: []
})

export class HomeModule {}
