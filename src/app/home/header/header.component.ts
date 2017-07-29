import {Component, Injector, OnInit} from '@angular/core';
import { APPCONFIG } from '../../config'
import {AuthenticationService} from '../../shared/services/authentication/authentication.service';
import {Router} from '@angular/router';
import {BaseComponent} from '../shared/components/base.component';
import {NotificationService} from '../notifications/notification.service';
import {MockNotificationService} from '../../mocks/mock.notification.service';
import {PopoverService} from '../shared/services/popover.service';
import {PopoverOptions} from '../../models/configuration/PopoverOptions';

@Component({
    selector: 'esub-app-header',
    styles: [],
    templateUrl: './header.component.html'
})

export class AppHeaderComponent extends BaseComponent implements OnInit {
    AppConfig: any;
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

    logout () {
        this._authService.logout();
        this._router.navigate(['../login']);
    }

    openNotifications () {

        const options = new PopoverOptions();
        options.height = 205;
        options.width = 320;
        options.componentName = 'notifications';

        if (this._popoverService.getCurrentPopoverState()) {

            this._popoverService.closePopover();
        } else {

            this._popoverService.openPopover(options);
        }
    }

    closeNotifications () {

        this._popoverService.closePopover();
    }
}
