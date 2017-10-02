import {Component, Inject, OnInit} from '@angular/core';
import {DialogData} from '../../../../models/DialogData';
import {MD_DIALOG_DATA, MdDialogRef} from '@angular/material';

@Component({
    selector: 'esub-enter-time-note-dialog',
    templateUrl: './enter-time-note-dialog.component.html'
})
export class EnterTimeNoteDialogComponent implements OnInit {

    constructor (public dialogRef: MdDialogRef<EnterTimeNoteDialogComponent>, @Inject(MD_DIALOG_DATA) public data: DialogData) {}

    ngOnInit () {


    }
}
