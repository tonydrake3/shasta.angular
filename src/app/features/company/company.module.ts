import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';
import { CompanySelectionComponent } from './company-selection.component';
import { CompanyService } from './company.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SharedModule
    ],
    declarations: [
        CompanySelectionComponent
    ],
    providers: [
        CompanyService
    ]
})

export class CompanyModule {}