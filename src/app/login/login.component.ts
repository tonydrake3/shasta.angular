import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthenticationService } from '../shared/services/authentication/authentication.service';
import { AuthorizationService } from '../shared/services/authorization/authorization.service';

import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import {UserService} from '../shared/services/user/user.service';
import {CompanyService} from '../features/company/company.service';

@Component({
    selector: 'esub-login',
    templateUrl: './login.component.html'
})
export class LoginComponent {

    username: string;
    password: string;
    loading = false;
    errorMessage = '';

    constructor(private _route: ActivatedRoute, private _router: Router, private _authenticationService: AuthenticationService,
      private _authorizationService: AuthorizationService, private _userService: UserService, private _companyService: CompanyService) {}

    login () {
        this.loading = true;
        this._authenticationService.login(this.username, this.password)
            .subscribe(
                data => {

                    sessionStorage.setItem('authentication', JSON.stringify(data));

                    if (this._authenticationService.isLoggedIn()) {
                        this.loading = false;
                        this._authorizationService.getPermissions();
                        this._userService.getCurrentUserInfo()
                            .subscribe(
                                user => console.log('Login UserService', user),
                                error => console.log('Login UserService Error', error)
                            );
                        this._companyService.getCompanies();
                        this._route.queryParams
                            .map(qp => qp['redirectTo'])
                            .subscribe(
                                redirectTo => {
                                    const url = redirectTo ? [redirectTo] : ['/'];
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
                }
            )
    }

}
