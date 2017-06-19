import { Component, Input } from '@angular/core';

import { NavigationLink } from '../../../models/NavigationLink';

// TODO delete me
import { DEVMockDataService } from '../../../shared/DEV-mock-data.service';

@Component({
    selector: 'esub-app-sidenav-menu',
    styles: [],
    templateUrl: './sidenav-menu.component.html'
})

export class AppSidenavMenuComponent {
    public navigationLinks: NavigationLink[];
    public timeExpensesLinks: any;  // TODO type this
    public projectLinks: any;  // TODO type this

  constructor(private devMockDataService: DEVMockDataService) {

    // TODO move to real service once available
    this.navigationLinks = devMockDataService.navLinks;

    // TODO this more intelligently
    // manually construct time & expenses nav links
    this.timeExpensesLinks = [
        { title: 'Timesheets ', view: 'timesheets' },
        { title: 'Approve Time ', view: 'approve-time' },
        { title: 'Export Time ', view: 'export-time' },
    ];

    // TODO this more intelligently
    // manually construct project nav links
    // this.projectLinks = [
    //     { title: 'Project Summary ', view: 'summary' },
    //     { title: 'Field Notes ', view: 'field-notes' },
    //     { title: 'Daily Reports ', view: 'daily-reports' },
    //     { title: 'RFIs ', view: 'rfi' },
    //     { title: 'Submittals ', view: 'submittals' },
    // ];
  }
}
