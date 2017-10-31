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
import {UserService} from '../shared/services/user/user.service';
import {Permissions} from '../../models/domain/Permissions';
import {PermissionsService} from '../../shared/services/authorization/permissions.service';

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
    public permissions: Permissions;

    constructor(protected _injector: Injector, private _authService: AuthenticationService, private _router: Router,
                private _popoverService: PopoverService, private headerUpdates: HeaderUpdateService,
                private notificationService: NotificationService, private userService: UserService,
                private permissionsService: PermissionsService) {

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

        this.permissionsService.permissions$
            .takeUntil(this.ngUnsubscribe)
            .subscribe(
                (permissions) => {

                    if (permissions) {

                        // console.log('EnterTimeComponent PermissionsService permissions', permissions);
                        this.permissions = permissions;
                    }
                }
            );

        this.userService.currentUserInfo$
            .takeUntil(this.ngUnsubscribe)
            .subscribe(
                (user) => {

                    this.fullName = user[0]['FirstName'] + ' ' + user[0]['LastName'];
                }
            );

        this.headerUpdates.shouldUpdate$
            .takeUntil(this.ngUnsubscribe)
            .subscribe(
                (update) => {

                    if (update) {
                        this.tenant = JSON.parse(sessionStorage.getItem('tenant'));
                        this.notificationService.getLatest();
                        this.userService.getLatest();
                    }
                }
            );

        if (JSON.parse(sessionStorage.getItem('tenant'))) {
            this.tenant = JSON.parse(sessionStorage.getItem('tenant'));
            this.notificationService.getLatest();
            this.userService.getLatest();
        }
    }

    ngOnDestroy () {

        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

    public navigateHome () {

        if (this.permissions.Projects.CanManage) {

            //TODO: Fix when navigation is available
            this._router.navigate(['time/timesheets']);
        } else {

            this._router.navigate(['time/timesheets']);
        }
    }

    logout () {
        this._authService.logout();
        this.permissionsService.clearPermissions();
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
