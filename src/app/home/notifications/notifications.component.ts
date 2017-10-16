import {Component, Injector, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';

import {NotificationService} from './notification.service';
import {BaseComponent} from '../shared/components/base.component';
import {EsubNotification} from '../../models/domain/EsubNotification';

@Component({
    selector: 'esub-notification',
    styles: [],
    templateUrl: './notifications.component.html'
})
export class NotificationComponent implements OnInit, OnDestroy {

    // Private
    private notificationSubscription: Subscription;

    // Public
    notificationList: EsubNotification[];

    constructor (protected injector: Injector, private _notifications: NotificationService) {

        this.notificationList = [];
    }

    ngOnInit () {

        this.notificationSubscription = this._notifications.notifications$
            .subscribe((notifications) => {
                this.notificationList = notifications;
                // console.log(this.notificationList);
            });
    }

    ngOnDestroy () {

        this.notificationSubscription.unsubscribe();
    }
}
