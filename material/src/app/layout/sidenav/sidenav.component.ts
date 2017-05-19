import { Component, Input } from '@angular/core';
import { APPCONFIG } from '../../config'

@Component({
    selector: 'my-app-sidenav',
    styles: [],
    templateUrl: './sidenav.component.html'
})

export class AppSidenavComponent {
    AppConfig;

    ngOnInit() {
        this.AppConfig = APPCONFIG;
    }

    toggleCollapsedNav() {
        this.AppConfig.navCollapsed = !this.AppConfig.navCollapsed;
    }
}
