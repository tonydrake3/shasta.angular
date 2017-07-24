import {Component, Injector, OnInit} from '@angular/core';

import {NotificationService} from './notification.service';
import {BaseComponent} from '../shared/components/base.component';
import {inject} from '@angular/core/testing';

@Component({
    selector: 'esub-notification',
    styles: [],
    templateUrl: './notifications.component.html'
})
export class NotificationComponent extends BaseComponent implements OnInit {

    _notificationList: any;

    constructor (protected injector: Injector) {

        super(injector, [
            {
                service: 'NotificationService',
                callback: 'notificationServiceCallback'
            }
        ]);
    }

    ngOnInit () {

        console.log('NotificationComponent OnInit');
    }

    notificationServiceCallback (notifications) {

        this._notificationList = notifications;
        console.log(notifications);
    }
}
