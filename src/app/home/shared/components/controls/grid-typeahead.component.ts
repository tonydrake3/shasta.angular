import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import * as _ from 'lodash';

@Component({
    selector: 'esub-grid-typeahead',
    templateUrl: './grid-typeahead.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GridTypeaheadComponent implements OnInit {

    @Input() field;
    @Input() list: Array<any>;

    public typeaheadList: Array<any>;
    public open: boolean;
    public textFieldValue: string;

    constructor () {

        this.typeaheadList = [];
        this.open = false;
    }

    ngOnInit () {

        // console.log(this.field);
        // console.log(this.list);
        this.textFieldValue = this.field.Name;
    }

    showTypeahead (event) {

        console.log(event);
        this.open = true;

        const currentItem = this.findItem(this.textFieldValue);

        if (currentItem.length > 0) {

            this.typeaheadList = currentItem;
        } else {

            this.typeaheadList = _.take(this.list, 5);
        }


    }

    closeTypeahead () {

        this.open = false;
        this.typeaheadList = [];
    }

    findItem (fieldValue: string) {

        return _.filter(this.list, (item) => {
            return _.includes(item.Name, fieldValue);
        });
    }
}
