import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';
import { ProjectSelectionComponent } from './project-selection.component';
import { ProjectService } from './project.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SharedModule
    ],
    declarations: [
        ProjectSelectionComponent
    ],
    providers: [
        ProjectService
    ]
})

export class ProjectModule {}
