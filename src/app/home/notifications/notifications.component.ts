import {Component, OnInit} from '@angular/core';

import {NotificationService} from './notification.service';


@Component({
    selector: 'esub-notification',
    styles: [],
    templateUrl: './notifications.component.html'
})
export class NotificationComponent implements OnInit {

    _notificationList: any;

    constructor (private _notificationService: NotificationService) {}

    ngOnInit () {

        console.log('NotificationComponent OnInit');
    }

}
