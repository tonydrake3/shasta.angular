import {Component, Injector} from '@angular/core';
import { CompanyService } from './company.service';
import { Company } from '../../models/domain/Company';
import {mockCompanies} from '../../mocks/data/mockCompany.data';
import {BaseComponent} from '../shared/components/base.component';

@Component({
    selector: 'esub-company-selection',
    styles: [],
    templateUrl: './company-selection.component.html'
})
export class CompanySelectionComponent extends BaseComponent {

    companyList: Array<Company>;

    constructor (private _injector: Injector) {

        super(_injector, []);

        super.inject([
            {
                toInject: CompanyService,
                subject: 'companies$',
                initializer: 'getLatest',
                callback: 'companyServiceCallback'
            }
        ])
    }

    companyServiceCallback (companies) {

        // console.log('CompanySelection CompanyServiceCallback');
        this.companyList = companies as Array<Company>;
        // this.companyList = mockCompanies;

        this.addLogos();
    }

    // TODO: Remove
    addLogos () {
        this.companyList.forEach((company) => {

            company.LogoUrl = 'https://2k4s4k3wofhp2b3qaf1365bl-wpengine.netdna-ssl.com/wp-content/uploads/2017/03/esublogo2017-1.jpg';
        });
    }
}
