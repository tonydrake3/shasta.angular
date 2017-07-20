import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'esub-notification-item',
    styles: [],
    templateUrl: './notification-item.component.html'
})
export class NotificationItemComponent implements OnInit {

    _notification: any;

    constructor (private _router: Router) {}

    ngOnInit () {

        console.log('NotificationItemComponent OnInit');
    }

}
