import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MdButtonToggleModule, MdSelectModule } from '@angular/material';

// import {ProjectGuard} from '../../shared/services/guards/project-guard.service';
import { ProjectRoutingModule, routedProjectComponents } from './project-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { ProjectSelectionManager } from './project-selection.manager';
import { ProjectSummaryService } from './project-summary/project-summary.service';
import { SharedHomeModule } from '../shared/shared.home.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MdButtonToggleModule,
        MdSelectModule,
        ProjectRoutingModule,
        ReactiveFormsModule,
        SharedModule,
        SharedHomeModule
    ],
    declarations: [
        routedProjectComponents
    ],
    providers: [
        // ProjectGuard,
        ProjectSelectionManager,
        ProjectSummaryService
    ],
    exports: [
    ]
})

export class ProjectModule {}
