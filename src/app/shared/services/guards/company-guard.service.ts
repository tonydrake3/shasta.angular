import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CompanyService } from '../../../features/company/company.service';
import { Observable } from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';


@Injectable()
export class CompanyGuard implements CanActivate, CanLoad {

    constructor(private _router: Router, private _companyService: CompanyService) {}

    canLoad (route: Route): boolean {

        this._companyService.hasMultipleCompanies()

            .then((result: any) => {

                if (result) return true;
                this._router.navigate(['dashboard']);
                return false
            });

        return false;

    }

    canActivate (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {

        return new Promise((resolve) => {
            this._companyService.hasMultipleCompanies()

                .then((result: any) => {

                    if (result) {
                        resolve(true);
                    } else {
                        this._router.navigate(['dashboard']);
                        resolve(false);
                    }
                });
        });
    }

}
