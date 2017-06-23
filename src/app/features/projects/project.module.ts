import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// import {ProjectGuard} from '../../shared/services/guards/project-guard.service';
import {ProjectRoutingModule, routedProjectComponents} from './project-routing.module';
import {ProjectService} from './project.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ProjectRoutingModule
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
