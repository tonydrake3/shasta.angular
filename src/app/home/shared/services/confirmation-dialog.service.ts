import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import { MdDialog } from '@angular/material';
import {DialogData} from '../../../models/DialogData';

@Injectable()
export class ConfirmationDialogService {

    private _displayConfirmation: Subject<boolean>;
    private _isDialogOpen: boolean;

    constructor (private _dialog: MdDialog) {

        this._displayConfirmation = new Subject<boolean>();
        this._isDialogOpen = false;
    }

    public get isConfirmNeeded$ () {

        return this._displayConfirmation.asObservable();
    }

    public setNeedsConfirmation (flag: boolean) {

        this._displayConfirmation.next(flag);
    }

    public getLatest () {

    }

    public isDialogOpen () {

        return this._isDialogOpen;
    }

    public openNavigationWarningModal(data: DialogData) {

        const warningDialogRef = this._dialog.open(data.component, {
            data: data,
            height: data.height,
            width: data.width
        });
        this._isDialogOpen = true;
        warningDialogRef.afterClosed().subscribe(result => {
            // modal closed
            this._isDialogOpen = false;
        });
    }

    public closeNavigationWarningModal () {

        this._dialog.closeAll();
    }
}
