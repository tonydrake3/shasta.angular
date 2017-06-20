import {Component, OnInit} from '@angular/core';
import { CompanyService } from './company.service';
import {Router} from '@angular/router';

@Component({
    selector: 'esub-project-selection',
    styles: [],
    templateUrl: './company-selection.component.html'
})
export class CompanySelectionComponent implements OnInit {

    _companyList: any;

    constructor (private _companyService: CompanyService, private _router: Router) {}

    ngOnInit () {

        this._companyService.companies$
            .subscribe(
                (companies) => {
                    this._companyList = companies['value'];
                    if (this._companyList.length <= 1) {
                        sessionStorage.setItem('tenant', JSON.stringify(companies['value'][0].Id));
                        this._router.navigate(['project']);
                    }
                },
                (error) => {
                    console.log(error);
                }
            )
    }

}
