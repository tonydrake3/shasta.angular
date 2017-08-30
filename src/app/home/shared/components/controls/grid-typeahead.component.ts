import {Component, Input, OnInit} from '@angular/core';
import * as _ from 'lodash';
import {FormControl} from '@angular/forms';

@Component({
    selector: 'esub-grid-typeahead',
    templateUrl: './grid-typeahead.component.html'
})
export class GridTypeaheadComponent implements OnInit {

    @Input() field;
    @Input() list;

    public typeahead: FormControl;

    public typeaheadList: Array<any>;
    public open: boolean;

    constructor () {

        this.typeaheadList = [];
        this.open = false;
        this.typeahead = new FormControl();
    }

    ngOnInit () {

        console.log(this.field, this.list);


    }


}
