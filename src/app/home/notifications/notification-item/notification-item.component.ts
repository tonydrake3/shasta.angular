import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {EsubNotification} from '../../../models/domain/EsubNotification';

@Component({
    selector: 'esub-notification-item',
    styles: [],
    templateUrl: './notification-item.component.html'
})
export class NotificationItemComponent implements OnInit {

    @Input() notification: EsubNotification;

    constructor (private _router: Router) {}

    ngOnInit () {

        // console.log('NotificationItemComponent OnInit');
    }

    navigateToAction (event) {

        console.log(event);
    }
}
