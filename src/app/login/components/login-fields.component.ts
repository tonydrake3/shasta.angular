import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';

import { AuthenticationService } from '../../shared/services/authentication/authentication.service';
import { Credentials } from '../../models/domain/Credentials';
import {emailValidator} from '../../home/shared/validators/email.validator';

@Component({
    selector: 'esub-login-fields',
    templateUrl: './login-fields.component.html'
})
export class LoginFieldsComponent {

    loginForm: FormGroup;
    _usernameControl;
    _passwordControl;

    loading = false;
    errorMessage = '';

    constructor(private _builder: FormBuilder, private _route: ActivatedRoute, private _router: Router,
                private _authenticationService: AuthenticationService) {

        this.createForm();
        this.trackUsernameChanges();
        this.trackPasswordChanges();
    }

    /******************************************************************************************************************
     * Public Methods
     ******************************************************************************************************************/

    login ({value, valid}: {value: Credentials, valid: boolean}) {

        this.loading = true;
        this._authenticationService.login(value.username, value.password)

            .subscribe(

                data => {

                    sessionStorage.setItem('authentication', JSON.stringify(data));

                    if (this._authenticationService.isLoggedIn()) {

                        this._route.queryParams

                            .map(qp => qp['redirectTo'])

                            .subscribe(

                                redirectTo => {

                                    // this.loading = false;
                                    const url = redirectTo ? [redirectTo] : ['company'];
                                    // console.log('login redirect url', url);
                                    this._router.navigate(url);
                                } ,
                                error => console.log(error)
                            );
                    }

                },
                error => {

                    this.errorMessage = error;
                    this.loading = false;
                    this._usernameControl.setErrors({'invalid' : true});
                    this._passwordControl.setErrors({'invalid' : true});
                }
            )
    }

    blurHandler (control) {

        // Prevent error when invalid control is not dirty
        if (control.value === '' && control.pristine) {

            control.markAsUntouched();

        } else if (control.value && this.loginForm.invalid) {

            this.resetErrors(control);
        }
    }

    /******************************************************************************************************************
     * Private Methods
     ******************************************************************************************************************/

    private createForm () {

        this.loginForm = this._builder.group({

            username: ['', [ Validators.required, Validators.minLength(5), emailValidator() ] ],
            password: ['', [ Validators.required, Validators.minLength(5) ] ]
        })
    }

    private trackUsernameChanges () {

        this._usernameControl = this.loginForm.get('username');
        this._usernameControl.valueChanges.forEach(

            (value: string) => {

                if (this.errorMessage) {

                    this.resetErrors(this._usernameControl);
                }
            }
        );
    }

    private trackPasswordChanges () {

        this._passwordControl = this.loginForm.get('password');
        this._passwordControl.valueChanges.forEach(

            (value: string) => {

                if (this.errorMessage) {

                    this.resetErrors(this._passwordControl);
                }
            }
        );
    }

    private resetErrors (control) {

        if (control === this._usernameControl && this._passwordControl.value !== '') {

            this._passwordControl.setErrors(null);

        } else if (control === this._passwordControl && this._usernameControl.value !== '' ) {

            this._usernameControl.setErrors(null);
        }
    }
}
