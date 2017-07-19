import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';
import { CompanySelectionComponent } from './company-selection.component';
import { CompanyService } from './company.service';
import {CompanyGuard} from '../shared/services/guards/company-guard.service';
import {CompanySelectionCardComponent} from './company-selection-card/company-selection-card.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SharedModule
    ],
    declarations: [
        CompanySelectionComponent,
        CompanySelectionCardComponent
    ],
    providers: [
        CompanyService,
        CompanyGuard
    ]
})

export class CompanyModule {}
