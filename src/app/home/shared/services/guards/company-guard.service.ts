import {Injectable, OnDestroy} from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CompanyService } from '../../../company/company.service';
import { routeName } from '../../../../models/configuration/routeName';
import { Company } from '../../../../models/domain/Company';

@Injectable()
export class CompanyGuard implements CanActivate, OnDestroy {

    _companyServiceSubscription;

    constructor(private _router: Router, private _companyService: CompanyService) {}

    canActivate (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {

        return new Promise((resolve, reject) => {

            this._companyService.getLatest();
            this._companyServiceSubscription = this._companyService.companies$

                .map(val => val as Array<Company>)
                .subscribe(

                    (companies) => {
                        // console.log('canActivateCallback', companies);
                        if (companies.length > 1) {

                            resolve(true);
                        } else {

                            sessionStorage.setItem('tenant', JSON.stringify(companies[0].Id));
                            this._router.navigate([routeName.project]);
                            resolve(false);
                        }
                    },
                    (error) => {
                        this._router.navigate([routeName.project]);
                        reject(error);
                    }
                )
        });
    }

    ngOnDestroy () {

        this._companyServiceSubscription.unsubscribe();
    }
}
