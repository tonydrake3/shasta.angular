import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AuthenticationService } from '../shared/services/authentication/authentication.service';
import { AuthorizationService } from '../shared/services/authorization/authorization.service';
import { UserService } from '../shared/services/user/user.service';
import { CompanyService } from '../features/company/company.service';
import { Credentials } from '../models/domain/Credentials';

import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';

@Component({
    selector: 'esub-login',
    templateUrl: './login.component.html'
})
export class LoginComponent {

    loginForm: FormGroup;
    _usernameField;
    _passwordField;

    loading = false;
    errorMessage = '';

    constructor(private _builder: FormBuilder, private _route: ActivatedRoute, private _router: Router,
                private _authenticationService: AuthenticationService, private _authorizationService: AuthorizationService) {

        this.createForm();
        this._usernameField = this.loginForm.get('username');
        this._passwordField = this.loginForm.get('password');
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
                        // this._authorizationService.getPermissions();
                        // this._userService.currentUserInfo$
                        //     .subscribe(
                        //         user => console.log('Login UserService', user),
                        //         error => console.log('Login UserService Error', error)
                        //     );

                        this._route.queryParams

                            .map(qp => qp['redirectTo'])

                            .subscribe(

                                redirectTo => {

                                    this.loading = false;
                                    const url = redirectTo ? [redirectTo] : ['company'];
                                    // console.log('login redirect url', url);
                                    this._router.navigate(url);
                                } ,
                                error => console.log(error)
                            );
                    }

                },
                error => {

                    console.log(error);
                    this.errorMessage = error;
                    this.loading = false;
                    this._usernameField.setErrors({'invalid' : true});
                    this._passwordField.setErrors({'invalid' : true});
                }
            )
    }

    blurValidator (control) {

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

            username: ['', Validators.required ],
            password: ['', Validators.required ]
        })
    }

    private resetErrors (control) {

        if (control === this._usernameField && this._passwordField.value !== '') {

            this._passwordField.setErrors(null);

        } else if (control === this._passwordField && this._usernameField.value !== '' ) {

            this._usernameField.setErrors(null);
        }
    }
}
