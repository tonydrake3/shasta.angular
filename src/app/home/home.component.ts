import { Component } from '@angular/core';
import {PermissionsService} from '../shared/services/authorization/permissions.service';

@Component({
    selector: 'esub-app-home',
    templateUrl: './home.component.html',
})
export class HomeComponent {
    constructor(private _permissions: PermissionsService) {

        this._permissions.getLatest();
    }
}
