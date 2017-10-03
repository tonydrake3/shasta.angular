import {Component, Inject, OnInit} from '@angular/core';
import {MD_DIALOG_DATA, MdDialogRef} from '@angular/material';
import * as _ from 'lodash';

@Component({
    selector: 'esub-enter-time-note-dialog',
    templateUrl: './enter-time-note-dialog.component.html'
})
export class EnterTimeNoteDialogComponent implements OnInit {

    public title: string;
    public note: string;

    constructor (public dialogRef: MdDialogRef<EnterTimeNoteDialogComponent>, @Inject(MD_DIALOG_DATA) public data) {}

    ngOnInit () {

        if (this.data.value === '') {

            this.title = 'Add new note';
            this.note = '';
        } else {

            this.title = 'Change note';
            this.note = _.cloneDeep(this.data.value);
        }
    }

    public close () {

        this.dialogRef.close();
    }

    public save () {

        this.data.setValue(_.cloneDeep(this.note));
        this.dialogRef.close();
    }
}
