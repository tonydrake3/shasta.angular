import {Component, Input, OnInit} from '@angular/core';
import {Project} from '../../../../models/domain/Project';

@Component({
    selector: 'esub-project-selection-card',
    templateUrl: './project-selection-card.component.html'
})
export class ProjectSelectionCardComponent implements OnInit {
    @Input() project: Project;

    constructor() {}

    ngOnInit () {

    }
}
