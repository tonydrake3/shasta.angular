import {Component, Inject} from '@angular/core';
import {MD_DIALOG_DATA, MdDialogRef} from '@angular/material';
import {Router} from '@angular/router';

@Component({
    selector: 'esub-confirmation-dialog',
    template: `
        <h2 md-dialog-title>Unsaved changes</h2>
        <md-dialog-content>Are you sure you want to navigate away without saving your time entries?</md-dialog-content>
        <md-dialog-actions>
            <button md-button class="" md-dialog-close>Stay on this page</button>
            <!-- Can optionally provide a result for the closing dialog. -->
            <button md-button (click)="navigate()">Leave</button>
        </md-dialog-actions>
    `
})
export class ConfirmationDialogComponent {

    constructor(public dialogRef: MdDialogRef<ConfirmationDialogComponent>, @Inject(MD_DIALOG_DATA) public data: any,
                private _router: Router) {

        console.log('Confirmation Data', data);
    }

    public navigate() {

        this._router.navigateByUrl(this.data.url);
    }
}
