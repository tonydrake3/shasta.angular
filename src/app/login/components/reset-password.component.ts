import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';

@Component({
    selector: 'esub-reset-password',
    templateUrl: './reset-password.component.html'
})
export class ResetPasswordComponent {

    // Public
    public loading = false;
    public resetPasswordForm: FormGroup;
    public errorMessage = '';

    constructor(private _builder: FormBuilder) {

        this.createForm();
    }

    /******************************************************************************************************************
     * Public Methods
     ******************************************************************************************************************/

     submit (form) {

     }

    /******************************************************************************************************************
     * Private Methods
     ******************************************************************************************************************/

     private createForm () {

        this.resetPasswordForm = this._builder.group({

            email: ['', Validators.required ]
        })
    }
}
