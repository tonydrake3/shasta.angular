import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule, MdDatepickerModule, MdNativeDateModule } from '@angular/material';

// Services
import {MockProjectService} from '../mocks/mock.project.service';
import {MockProjectSummaryService} from '../mocks/mock.project.summary.service';

// Components

// Pipes


@NgModule({
    imports: [
        MaterialModule,
        MdDatepickerModule,
        MdNativeDateModule,
        CommonModule,
        FormsModule

    ],
    declarations: [],
    providers: [
        MockProjectService,
        MockProjectSummaryService,
    ],
    exports: []
})

export class MockModule {}
