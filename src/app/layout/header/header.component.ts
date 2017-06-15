import { Component, OnInit } from '@angular/core';
import { APPCONFIG } from '../../config'

@Component({
    selector: 'esub-app-header',
    styles: [],
    templateUrl: './header.component.html'
})

export class AppHeaderComponent implements OnInit {
    AppConfig: any;
    public notificationCount: number;

    ngOnInit() {
        this.AppConfig = APPCONFIG;
        this.notificationCount = 2;
    }
}
