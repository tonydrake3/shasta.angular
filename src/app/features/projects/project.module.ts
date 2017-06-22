import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';
import { ProjectService } from './project.service';
import {ProjectGuard} from '../../shared/services/guards/project-guard.service';
import {ProjectRoutingModule, routedProjectComponents} from './project-routing.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SharedModule,
        ProjectRoutingModule
    ],
    declarations: [
        routedProjectComponents
    ],
    providers: [
        ProjectGuard
    ]
})

export class ProjectModule {}
