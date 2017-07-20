import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'esub-popover',
    template: `
        <div class="popover arrow-top-right" *ngIf="open">Cras mattis consectetur purus sit amet fermentum.</div>
    `
})
export class PopoverComponent implements OnInit {

    @Input() open: boolean;

    constructor () {}

    ngOnInit () {


    }
}
