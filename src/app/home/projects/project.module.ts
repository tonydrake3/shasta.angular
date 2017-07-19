import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';

// import {ProjectGuard} from '../../shared/services/guards/project-guard.service';
import {ProjectRoutingModule, routedProjectComponents} from './project-routing.module';
import {ProjectService} from './project.service';
import {SHARED_FORM_DIRECTIVES} from '@angular/forms/src/directives';
import {SharedModule} from '../../shared/shared.module';
import {MaterialModule} from '@angular/material';
import {ProjectSelectionManager} from './project-selection.manager';
import {ProjectSummaryService} from './project-summary/project-summary.service';
import {SharedHomeModule} from '../shared/shared.home.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MaterialModule,
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
        ProjectService,
        ProjectSelectionManager,
        ProjectSummaryService
    ],
    exports: [
    ]
})

export class ProjectModule {}
