import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Company } from '../../../models/domain/Company';
import { routeName } from '../../shared/configuration/web-route-names.configuration';
import {HeaderUpdateService} from '../../header/header-update.service';

@Component({
    selector: 'esub-company-selection-card',
    templateUrl: './company-selection-card.component.html'
})
export class CompanySelectionCardComponent {

    @Input() company: Company;

    constructor (private _router: Router, private headerUpdate: HeaderUpdateService) {}

    /******************************************************************************************************************
     * Public Methods
     ******************************************************************************************************************/

    selectCompany (company: Company) {

        sessionStorage.setItem('tenant', JSON.stringify(company.Id));
        this.headerUpdate.triggerUpdate();
        this._router.navigate([routeName.time]);
    }
}
