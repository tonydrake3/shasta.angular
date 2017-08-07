import {Component, OnInit} from '@angular/core';
import { CompanyService } from './company.service';
import {Router} from '@angular/router';
import { Company } from '../../models/domain/Company';
import {mockCompanies} from '../../mocks/data/mockCompany.data';

@Component({
    selector: 'esub-company-selection',
    styles: [],
    templateUrl: './company-selection.component.html'
})
export class CompanySelectionComponent implements OnInit {

    companyList: Array<Company>;

    constructor (private _companyService: CompanyService, private _router: Router) {}

    ngOnInit () {

        this._companyService.getLatest();
        this._companyService.companies$

            .map(val => val as Array<Company>)
            .subscribe(

                (companies) => {

                    this.companyList = companies;
                    // this.companyList = mockCompanies;
                },
                (error) => {
                    console.log(error);
                }
            )
    }

}
