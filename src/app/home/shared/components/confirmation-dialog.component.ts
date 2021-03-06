import {Component, Inject, Injector} from '@angular/core';
import {MD_DIALOG_DATA, MdDialogRef} from '@angular/material';
import {Router} from '@angular/router';
import {DialogData} from '../../../models/DialogData';
import {ConfirmationDialogService} from '../services/confirmation-dialog.service';

@Component({
    selector: 'esub-confirmation-dialog',
    template: `
        <h2 md-dialog-title>{{data.title}}</h2>
        <md-dialog-content>{{data.contentText}}</md-dialog-content>
        <md-dialog-actions align="end">
            <button md-button (click)="close()">{{data.cancelButtonText}}</button>
            <button md-button (click)="navigate()">{{data.proceedButtonText}}</button>
        </md-dialog-actions>
    `
})
export class ConfirmationDialogComponent {

    constructor(@Inject(MD_DIALOG_DATA) public data: DialogData, private _router: Router,
                private _confirmationService: ConfirmationDialogService, private _injector: Injector) {}

    public close () {

        this._confirmationService.closeNavigationWarningModal();
    }

    public navigate () {

        this._confirmationService.setNeedsConfirmation(false);
        this._router.navigateByUrl(this.data.navigationUrl);
        this._confirmationService.closeNavigationWarningModal();

        if (this.data.service) {

            const serviceRef = this._injector.get(this.data.service.referenceObject);
            serviceRef[this.data.service.referenceMethod]();
        }
    }
}
