import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {FormGroup, FormBuilder, Validators, FormControl, FormGroupDirective, NgForm} from '@angular/forms';
import { MdInputModule } from '@angular/material';

import { AuthenticationService } from '../shared/services/authentication/authentication.service';
import { AuthorizationService } from '../shared/services/authorization/authorization.service';

import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import {UserService} from '../shared/services/user/user.service';
import {CompanyService} from '../features/company/company.service';
import {Credentials} from '../models/domain/Credentials';
// import {ProjectService} from '../features/projects/project.service';

@Component({
    selector: 'esub-login',
    templateUrl: './login.component.html'
})
export class LoginComponent {

    loginForm: FormGroup;

    loading = false;
    errorMessage = '';

    constructor(private _builder: FormBuilder, private _route: ActivatedRoute, private _router: Router,
                private _authenticationService: AuthenticationService, private _authorizationService: AuthorizationService) {

        this.createForm();
    }

    login ({value, valid}: {value: Credentials, valid: boolean}) {

        this.loading = true;
        this._authenticationService.login(value.username, value.password)

            .subscribe(

                data => {

                    // console.log('Authenticated');
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
                    this.loginForm.get('username').setErrors({'invalid' : true});
                    this.loginForm.get('password').setErrors({'invalid' : true});
                }
            )
    }

    blurValidator (control) {

        // Error when invalid control is dirty, touched, or submitted
        if (control.value === '' && control.pristine) {

            control.markAsUntouched();
        }
    }

    private createForm () {

        this.loginForm = this._builder.group({

            username: ['', Validators.required ],
            password: ['', Validators.required ]
        })
    }

}
