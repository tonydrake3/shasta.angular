import { Component } from '@angular/core';
import { CompanyService } from './company.service';

@Component({
    selector: 'esub-project-selection',
    styles: [],
    templateUrl: './company-selection.component.html',
    providers: [ CompanyService ]
})
export class CompanySelectionComponent {

    constructor (private _companyService: CompanyService) {}

}
