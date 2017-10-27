import {Component, Inject} from '@angular/core';
import {MD_DIALOG_DATA, MdDialogRef} from '@angular/material';
import {DialogData} from '../../../models/DialogData';

@Component({
    selector: 'esub-warning-dialog',
    template: `
        <h2 md-dialog-title>{{data.title}}</h2>
        <md-dialog-content>{{data.contentText}}</md-dialog-content>
        <md-dialog-actions align="end">
            <button md-button (click)="close()">Close</button>
        </md-dialog-actions>
    `
})
export class WarningDialogComponent {

    constructor(public dialogRef: MdDialogRef<WarningDialogComponent>, @Inject(MD_DIALOG_DATA) public data: DialogData) {}

    public close () {

        this.dialogRef.close()
    }
}

