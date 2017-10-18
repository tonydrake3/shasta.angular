import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import {ResetPasswordService} from './reset-password.service';
import {emailValidator} from '../../home/shared/validators/email.validator';



@Component({
    selector: 'esub-forgot-password',
    templateUrl: './forgot-password.component.html'
})
export class ForgotPasswordComponent {

    forgotPasswordForm: FormGroup;
    _emailControl;

    loading = false;
    errorMessage = '';

    constructor(private _builder: FormBuilder, private _resetPasswordService: ResetPasswordService) {

        this.createForm();
        this.trackEmailChanges();
    }

    /******************************************************************************************************************
     * Public Methods
     ******************************************************************************************************************/

    reset ({value, valid}: {value: any, valid: boolean}) {

        if (!this.loading) {

            this.loading = true;
            // this._resetPasswordService.sendEmail(value.email)
            //
            //     .subscribe(
            //
            //         (data) => {
            //
            //             this.loading = false;
            //             console.log(data);
            //         },
            //         (error) => {
            //
            //             console.log(error);
            //         }
            //     );
        }
    }

    blurHandler (control) {

        // Prevent error when invalid control is not dirty
        if (control.value === '' && control.pristine) {

            control.markAsUntouched();

        }
    }

    /******************************************************************************************************************
     * Private Methods
     ******************************************************************************************************************/

     private createForm () {

        this.forgotPasswordForm = this._builder.group({

            email: ['', [ Validators.required, Validators.minLength(5), emailValidator() ] ]
        })
    }

    private trackEmailChanges () {

        this._emailControl = this.forgotPasswordForm.get('email');
        this._emailControl.valueChanges.forEach(

            (value: string) => {

                // if (this.errorMessage) {
                //
                //     this.resetErrors(this._emailControl);
                // }
            }
        );
    }

    // private resetErrors (control) {
    //
    //     if (control === this._usernameControl && this._passwordControl.value !== '') {
    //
    //         this._passwordControl.setErrors(null);
    //
    //     } else if (control === this._passwordControl && this._usernameControl.value !== '' ) {
    //
    //         this._usernameControl.setErrors(null);
    //     }
    // }
}
