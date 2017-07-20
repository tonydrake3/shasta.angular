import { Component, OnInit } from '@angular/core';
import { APPCONFIG } from '../../config'
import {AuthenticationService} from '../../shared/services/authentication/authentication.service';
import {Router} from '@angular/router';

@Component({
    selector: 'esub-app-header',
    styles: [],
    templateUrl: './header.component.html'
})

export class AppHeaderComponent implements OnInit {
    AppConfig: any;
    public notificationCount: number;
    public isNotificationOpen = false;

    constructor(private _authService: AuthenticationService, private _router: Router) {}

    ngOnInit() {
        this.AppConfig = APPCONFIG;
        this.notificationCount = 2;
    }

    openNotifications () {

        this.isNotificationOpen = !this.isNotificationOpen;
    }

    logout () {
        this._authService.logout();
        this._router.navigate(['../login']);
    }
}
