import { Component } from '@angular/core';
import { APPCONFIG } from '../../config'

@Component({
    selector: 'my-app-header',
    styles: [],
    templateUrl: './header.component.html'
})

export class AppHeaderComponent {
    AppConfig: any;
    public notificationCount: number;

    ngOnInit() {
        this.AppConfig = APPCONFIG;
        this.notificationCount = 2;
    }
}
