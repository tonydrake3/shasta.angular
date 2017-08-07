import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';

import {Company} from '../../../models/domain/Company';

@Component({
    selector: 'esub-company-selection-card',
    templateUrl: './company-selection-card.component.html'
})
export class CompanySelectionCardComponent {

    @Input() company: Company;

    constructor (private _router: Router) {}

    selectCompany (company: Company) {
        sessionStorage.setItem('tenant', JSON.stringify(company.Id));
        this._router.navigate(['project']);
    }
}
