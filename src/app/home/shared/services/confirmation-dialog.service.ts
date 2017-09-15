import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import { MdDialog } from '@angular/material';
import {ConfirmationDialogComponent} from '../components/confirmation-dialog.component';

@Injectable()
export class ConfirmationDialogService {

    private _displayConfirmation: Subject<boolean>;

    constructor (private _dialog: MdDialog) {

        this._displayConfirmation = new Subject<boolean>();
    }

    public get isConfirmNeeded$ () {

        return this._displayConfirmation.asObservable();
    }

    public setNeedsConfirmation (flag: boolean) {

        this._displayConfirmation.next(flag);
    }

    public getLatest () {

    }

    private openNavigationWarningModal(data: any) {

        const warningDialogRef = this._dialog.open(ConfirmationDialogComponent, {
            data: data,
            height: '300px',
            width: '200px'
        });
        warningDialogRef.afterClosed().subscribe(result => {
            // modal closed
        });
    }
}
