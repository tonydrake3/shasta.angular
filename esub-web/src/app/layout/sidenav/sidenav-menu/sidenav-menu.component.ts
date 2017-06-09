import { Component, Input } from '@angular/core';

import { NavigationLink} from '../../../models/NavigationLink';

// TODO delete me
import { DEVMockDataService } from '../../../shared/DEV-mock-data.service';

@Component({
    selector: 'esub-app-sidenav-menu',
    styles: [],
    templateUrl: './sidenav-menu.component.html'
})

export class AppSidenavMenuComponent {
  public navigationLinks: NavigationLink[];

  constructor(public devMockDataService: DEVMockDataService) {
    this.navigationLinks = devMockDataService.navLinks;
  }
}
