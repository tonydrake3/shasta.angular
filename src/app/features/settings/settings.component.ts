import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'esub-settings',
    styles: [],
    template: `<router-outlet></router-outlet>`
})

export class SettingsComponent implements OnInit {

    constructor() {
        console.log('SettingsComponent constructor');
    }

    ngOnInit () {

    }
}
