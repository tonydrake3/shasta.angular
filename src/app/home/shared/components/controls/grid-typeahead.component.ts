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

    public typeaheadList: Array<any>;
    public open: boolean;

    constructor () {

        this.typeaheadList = [];
        this.open = false;
    }

    ngOnInit () {

        // console.log(this.field);
        // console.log(this.list);


    }

    showTypeahead () {

        this.open = true;
        this.typeaheadList = _.take(this.list, 5);
    }

    closeTypeahead () {

        this.open = false;
        this.typeaheadList = [];
    }

    findItem (id: string) {

        _.filter(this.list, (item) => {

        })
    }
}
