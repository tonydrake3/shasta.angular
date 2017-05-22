import { Component } from '@angular/core';
import { MdSnackBar, MdDialog, MdDialogRef } from '@angular/material';
import { LayoutService } from '../../layout/layout.service'

@Component({
    selector: 'my-ui-components',
    styles: [],
    templateUrl: './components.component.html',
})

export class UIComponentsComponent {
    constructor(public snackBar: MdSnackBar, public dialog: MdDialog, private layoutService: LayoutService) {}

    // 
    activateLoader() {
        this.layoutService.updatePreloaderState('active');
    }
    hideLoader() {
        this.layoutService.updatePreloaderState('hide');
    }

    // Tooltips
    tooltipDirection = 'below';

    // SnackBar
    openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
            duration: 2000,
        });
    }

    openDialog() {
        this.dialog.open(DialogOverviewExampleDialog);
    }
    selectedOption;
    openDialogWithAResult() {
        let dialogRef = this.dialog.open(DialogResultExampleDialog);
        dialogRef.afterClosed().subscribe(result => {
            this.selectedOption = result;
        });
    }

    // Progress Bar, Spinner
    determinateValue = 30;
    determinateValue2 = 50;
}


// openDialog
@Component({
    selector: 'dialog-overview-example-dialog',
    template: `<p> Hi, I'm a simple dialog! </p>`,
})
export class DialogOverviewExampleDialog {}


// openDialogWithAResult
@Component({
    selector: 'dialog-result-example-dialog',
    template: `<h1 md-dialog-title>Dialog</h1>
        <div md-dialog-content style="padding-bottom: 20px;">What would you like to do?</div>
        <div md-dialog-actions>
            <button md-button (click)="dialogRef.close('Option 1')">Option 1</button>
            <button md-button (click)="dialogRef.close('Option 2')">Option 2</button>
        </div>`,
})
export class DialogResultExampleDialog {
    constructor(public dialogRef: MdDialogRef<DialogResultExampleDialog>) {}
}

