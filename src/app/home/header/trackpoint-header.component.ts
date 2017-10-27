import {Component, Injector, OnDestroy, OnInit} from '@angular/core';
import { APPCONFIG } from '../../config'
import {AuthenticationService} from '../../shared/services/authentication/authentication.service';
import {Router} from '@angular/router';
import {BaseComponent} from '../shared/components/base.component';
import {NotificationService} from '../notifications/notification.service';
import {PopoverService} from '../shared/services/popover.service';
import {PopoverOptions} from '../../models/configuration/PopoverOptions';
import {HeaderUpdateService} from './header-update.service';
import {Subject} from 'rxjs/Subject';
import {CurrentEmployeeService} from '../shared/services/user/current-employee.service';
import {Observable} from 'rxjs/Observable';

@Component({
    selector: 'esub-trackpoint-header',
    styles: [],
    templateUrl: './trackpoint-header.component.html'
})

export class TrackpointHeaderComponent implements OnInit, OnDestroy {

    private ngUnsubscribe: Subject<void> = new Subject<void>();
    AppConfig: any;

    public notificationCount: string;
    public fullName: string;
    public tenant: string;

    constructor(protected _injector: Injector, private _authService: AuthenticationService, private _router: Router,
                private _popoverService: PopoverService, private headerUpdates: HeaderUpdateService,
                private notificationService: NotificationService, private currentEmployeeService: CurrentEmployeeService) {

        this.notificationCount = '0';
    }

    ngOnInit() {
        this.AppConfig = APPCONFIG;

        this.notificationService.notifications$
            .takeUntil(this.ngUnsubscribe)
            .subscribe(
                (notifications) => {

                    if (notifications) {

                        if (notifications.length < 9) {

                            this.notificationCount = notifications.length.toString();
                        } else {

                            this.notificationCount = '9+';
                        }
                    }
                }
            );

        this.currentEmployeeService.currentEmployee$
            .takeUntil(this.ngUnsubscribe)
            .subscribe(
                (employee) => {

                    this.fullName = employee['Value'].FirstName + ' ' + employee['Value'].LastName;
                }
            );

        this.headerUpdates.shouldUpdate$
            .takeUntil(this.ngUnsubscribe)
            .subscribe(
                (update) => {

                    if (update) {
                        this.tenant = JSON.parse(sessionStorage.getItem('tenant'));
                        this.notificationService.getLatest();
                        this.currentEmployeeService.getLatest();
                    }
                }
            );

        if (JSON.parse(sessionStorage.getItem('tenant'))) {
            this.tenant = JSON.parse(sessionStorage.getItem('tenant'));
            this.notificationService.getLatest();
            this.currentEmployeeService.getLatest();
        }
    }

    ngOnDestroy () {

        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

    logout () {
        this._authService.logout();
        this._router.navigate(['../login']);
    }

    openNotifications (param) {

        if (param > 0) {
            const options = new PopoverOptions();
            switch (param) {
                case 1:
                    options.height = 80;
                    break;
                case 2:
                    options.height = 145;
                    break;
                default:
                    options.height = 206;
                    break;
            }

            options.width = 320;
            options.componentName = 'notifications';

            if (this._popoverService.getCurrentPopoverState()) {

                this._popoverService.closePopover();
            } else {

                this._popoverService.openPopover(options);
            }
        }
    }

    closeNotifications () {

        this._popoverService.closePopover();
    }


}
