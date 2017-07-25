import {Component, Injector, OnInit} from '@angular/core';
import { APPCONFIG } from '../../config'
import {AuthenticationService} from '../../shared/services/authentication/authentication.service';
import {Router} from '@angular/router';
import {NotificationComponent} from '../notifications/notifications.component';
import {BaseComponent} from '../shared/components/base.component';
import {Http} from '@angular/http';
import {NotificationService} from '../notifications/notification.service';
import {MockNotificationService} from '../../mocks/mock.notification.service';
import {PopoverService} from '../shared/services/popover.service';

@Component({
    selector: 'esub-app-header',
    styles: [],
    templateUrl: './header.component.html'
})

export class AppHeaderComponent extends BaseComponent implements OnInit {
    AppConfig: any;
    component = NotificationComponent;
    public notificationCount: number;

    constructor(protected _injector: Injector, private _authService: AuthenticationService, private _router: Router,
                private _popoverService: PopoverService) {

        super(_injector, []);
        super.inject([
            {
                toInject: MockNotificationService,
                subject: 'notifications$',
                initializer: 'getLatest',
                callback: 'notificationCallback'
            }
        ]);
    }

    notificationCallback (notifications) {
        this.notificationCount = notifications.length;
    }

    ngOnInit() {
        this.AppConfig = APPCONFIG;
    }

    openNotifications () {

        console.log('AppHeaderComponent openNotifications');
        // this.isNotificationOpen = !this.isNotificationOpen;
        this._popoverService.openPopover();
    }

    logout () {
        this._authService.logout();
        this._router.navigate(['../login']);
    }
}
