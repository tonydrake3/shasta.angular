import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'esub-admin-settings',
    styles: [],
    templateUrl: './admin-settings.component.html',
})
export class AdminSettingsComponent implements OnInit {

    constructor () {

        console.log('AdminSettingsComponent Ctor');
    }

    ngOnInit () {

        console.log('AdminSettingsComponent OnInit');
    }
}
