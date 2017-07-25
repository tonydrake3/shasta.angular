import {Component, Injector, OnInit} from '@angular/core';

import {NotificationService} from './notification.service';
import {BaseComponent} from '../shared/components/base.component';
import {NotificationMap, notificationMap} from '../shared/map/notification.map';
import {Notification} from '../../models/domain/Notification'
import {MockNotificationService} from '../../mocks/mock.notification.service';

@Component({
    selector: 'esub-notification',
    styles: [],
    templateUrl: './notifications.component.html'
})
export class NotificationComponent implements OnInit {

    // Private
    _notificationMap: NotificationMap[];

    // Public
    notificationList: Notification[];

    constructor (protected injector: Injector, private _notifications: MockNotificationService) {

        this._notificationMap = notificationMap;
    }

    ngOnInit () {

        this._notifications.notifications$
            .subscribe((notifications) => {
                this.notificationList = this.updateNotificationList(notifications);
            });
    }

    updateNotificationList (notifications) {

        notifications.forEach((notificationItem) => {

            this._notificationMap.forEach((mapItem) => {

                if (mapItem.Value === notificationItem.Type) {

                    notificationItem.Icon = mapItem.Icon;
                    notificationItem.Action = mapItem.Action;
                    notificationItem.ActionDescription = mapItem.ActionDescription;
                }
            });
        });

        return notifications;
    }
}
