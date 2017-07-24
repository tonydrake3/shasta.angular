import {Component, Injector, OnInit} from '@angular/core';

import {NotificationService} from './notification.service';
import {BaseComponent} from '../shared/components/base.component';
import {NotificationMap, notificationMap} from '../shared/map/notification.map';
import {Notification} from '../../models/domain/Notification'

@Component({
    selector: 'esub-notification',
    styles: [],
    templateUrl: './notifications.component.html'
})
export class NotificationComponent extends BaseComponent implements OnInit {

    // Private
    _notificationMap: NotificationMap[];

    // Public
    notificationList: Notification[];

    constructor (protected injector: Injector) {

        super(injector, [
            {
                service: 'NotificationService',
                callback: 'notificationServiceCallback'
            }
        ]);

        this._notificationMap = notificationMap;
    }

    ngOnInit () {

        // console.log('NotificationComponent OnInit');
    }

    notificationServiceCallback (notifications) {

        // this.notificationList = notifications as Notification[];
        // this.notificationList = this.updateNotifications(notifications);

        this.notificationList = this.updateNotificationList(notifications);
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
