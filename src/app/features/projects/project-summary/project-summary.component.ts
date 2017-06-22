import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'esub-project-summary',
    styles: [],
    templateUrl: './project-summary.component.html',
})
export class ProjectSummaryComponent implements OnInit {

    constructor () {

        console.log('ProjectSummaryCtor');
    }

    ngOnInit () {

        console.log('ProjectSummaryInit');
    }
}
