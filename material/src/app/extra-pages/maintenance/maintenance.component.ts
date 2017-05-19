import { Component } from '@angular/core';
import { APPCONFIG } from '../../config'

@Component({
    selector: 'my-page-maintenance',
    styles: [],
    templateUrl: './maintenance.component.html'
})

export class PageMaintenanceComponent {
    AppConfig: any;

    ngOnInit() {
        this.AppConfig = APPCONFIG;
    }
}
