import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';
import { ProjectSelectionComponent } from './project-selection.component';
import { ProjectService } from './project.service';
import {ProjectSelectionCardComponent} from './project-selection-card/project-selection-card.component';
import {ProjectGuard} from '../../shared/services/guards/project-guard.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SharedModule
    ],
    declarations: [
        ProjectSelectionComponent,
        ProjectSelectionCardComponent
    ],
    providers: [
        ProjectService,
        ProjectGuard
    ]
})

export class ProjectModule {}
