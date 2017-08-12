import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import {SettingsRoutingModule, routedSettingsComponents} from './settings-routing.module';
import {MaterialModule} from '@angular/material';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SettingsRoutingModule,
        MaterialModule
    ],
    declarations: [
        routedSettingsComponents
    ],
    providers: [],
    exports: []
})

export class SettingsModule {}
