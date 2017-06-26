import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// import {ProjectGuard} from '../../shared/services/guards/project-guard.service';
import {ProjectRoutingModule, routedProjectComponents} from './project-routing.module';
import {ProjectService} from './project.service';
import {SHARED_FORM_DIRECTIVES} from '@angular/forms/src/directives';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ProjectRoutingModule,
        SharedModule
    ],
    declarations: [
        routedProjectComponents
    ],
    providers: [
        // ProjectGuard,
        ProjectService
    ],
    exports: [
    ]
})

export class ProjectModule {}
