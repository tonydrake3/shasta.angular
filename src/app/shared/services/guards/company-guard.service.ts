import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CompanyService } from '../../../features/company/company.service';
import {apiRoutes} from '../../../models/configuration/apiRoutes';

@Injectable()
export class CompanyGuard implements CanActivate, CanLoad {

    constructor(private _router: Router, private _companyService: CompanyService) {}

    canLoad (route: Route): Promise<boolean> {

        return new Promise((resolve, reject) => {

            this._companyService.companies$

                .subscribe(
                    (companies) => {
                        console.log(companies['values']);
                        // console.log('companies["values"].length > 1', companies['values'].length > 1);
                        resolve(companies['values'].length > 1);
                    },
                    (error) => {
                        this._router.navigate(['project']);
                        reject(error);
                    }
                )
        });

    }

    canActivate (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {

        console.log('CanActivate');
        return new Promise((resolve, reject) => {

            this._companyService.companies$

                .subscribe(
                    (companies) => {
                        console.log(companies['values']);
                        // console.log('companies["values"].length > 1', companies['values'].length > 1);
                        resolve(companies['values'].length > 1);
                    },
                    (error) => {
                        this._router.navigate(['project']);
                        reject(error);
                    }
                )
        });
    }
}
