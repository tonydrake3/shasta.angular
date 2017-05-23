import { Component } from '@angular/core';
import { APPCONFIG } from '../../config'

@Component({
    selector: 'my-page-careers',
    styles: [],
    templateUrl: './careers.component.html'
})

export class PageCareersComponent {
    AppConfig: any;

    ngOnInit() {
        this.AppConfig = APPCONFIG;
    }
}
