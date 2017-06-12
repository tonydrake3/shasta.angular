import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from './authentication.service';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {

    constructor(private _router: Router, private _authService: AuthenticationService) {}

    canLoad (route: Route): boolean {

        if (this._authService.isLoggedIn()) return true;

        return false;

    }

    canActivate (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

        const url: string = state.url;

        if (this._authService.isLoggedIn()) return true;

        this._router.navigate(['login'], {queryParams: {redirectTo: url}});

        return false;
    }
}
