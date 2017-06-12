import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

import { AuthenticationService } from "../shared/services/authentication/authentication.service";
import { AuthorizationService } from "../shared/services/authorization/authorization.service";

import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';

@Component({
    selector: 'esub-login',
    templateUrl: './login.component.html'
})
export class LoginComponent {

    username: string;
    password: string;

    constructor(private _route: ActivatedRoute, private _router: Router, private _authenticationService: AuthenticationService, private _authorizationService: AuthorizationService) {}

    login () {
        this._authenticationService.login(this.username, this.password)
            .subscribe(
                data => {

                    sessionStorage.setItem('authentication', JSON.stringify(data));

                    if(this._authenticationService.isLoggedIn()) {
                        this._route.queryParams
                            .map(qp => qp['redirectTo'])
                            .subscribe(
                                redirectTo => {
                                    let url = redirectTo ? [redirectTo] : ['/'];
                                    console.log(url);
                                    this._router.navigate(url);
                                } ,
                                error => console.log(error)
                            );
                        this._authorizationService.getPermissions();
                    }

                },
                error => {
                    console.log("Error");
                }
            )
    }

}
