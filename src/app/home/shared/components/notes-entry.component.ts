import {Component, Inject, OnInit} from '@angular/core';
import {MD_DIALOG_DATA, MdDialogRef} from '@angular/material';
import * as _ from 'lodash';

@Component({
    selector: 'esub-notes-entry-dialog',
    template: `
        <h2 md-dialog-title>{{title}}</h2>
        <md-dialog-content>
            <md-form-field>
                <input mdInput type="text" [id]="'txtEnterTimeGridNote'" [(ngModel)]="note">
            </md-form-field>
        </md-dialog-content>
        <md-dialog-actions align="end">
            <button md-button (click)="close()">Cancel</button>
            <button md-button (click)="save()">Save</button>
        </md-dialog-actions>
    `
})
export class NotesEntryDialogComponent implements OnInit {

    public title: string;
    public note: string;

    constructor (public dialogRef: MdDialogRef<NotesEntryDialogComponent>, @Inject(MD_DIALOG_DATA) public data) {}

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
