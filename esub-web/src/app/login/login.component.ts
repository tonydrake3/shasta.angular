import { Component } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import { AuthenticationService } from '../shared/services/authentication/authentication.service';
import { AuthorizationService } from '../shared/services/authorization/authorization.service';

import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import {UserService} from '../shared/services/user/user.service';

@Component({
    selector: 'esub-login',
    templateUrl: './login.component.html'
})
export class LoginComponent {

    username: string;
    password: string;

    constructor(private _route: ActivatedRoute, private _router: Router, private _authenticationService: AuthenticationService,
      private _authorizationService: AuthorizationService, private userService: UserService) {}

    login () {
        this._authenticationService.login(this.username, this.password)
            .subscribe(
                data => {

                    sessionStorage.setItem('authentication', JSON.stringify(data));

                    if (this._authenticationService.isLoggedIn()) {
                        this._authorizationService.getPermissions();
                        this.userService.getCurrentUserInfo();
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
                    console.log('Error');
                }
            )
    }

    loginOnEnter (event) {
        if (event.keyCode === 13) {
            this.login();
            // rest of your code
        }
    }

}
