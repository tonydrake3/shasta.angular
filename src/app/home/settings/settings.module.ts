import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import {SettingsRoutingModule, routedSettingsComponents} from './settings-routing.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SettingsRoutingModule
    ],
    declarations: [
        routedSettingsComponents
    ],
    providers: [],
    exports: []
})

export class SettingsModule {}
