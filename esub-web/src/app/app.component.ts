import * as jQuery from 'jquery';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, NavigationEnd } from '@angular/router';
import { APPCONFIG } from './config'
import { LayoutService } from './layout/layout.service'
import { AuthenticationService } from './shared/services/authentication/authentication.service';

// 3rd
import 'styles/font-awesome.scss';
import 'styles/material2-theme.scss';
import 'styles/bootstrap.scss';
// custom
import 'styles/layout.scss';
import 'styles/theme.scss';
import 'styles/ui.scss';
import 'styles/app.scss';

@Component({
    selector: 'esub-root',
    templateUrl: './app.component.html',
    providers: [LayoutService],
})
export class AppComponent implements OnInit {
    AppConfig: any;
    constructor(private router: Router, private authenticationService: AuthenticationService) {

        this.authenticationService.login('manager@esub.com', 'Test1234');

    }

    ngOnInit() {
        this.AppConfig = APPCONFIG;

        // Scroll to top on route change
        this.router.events.subscribe((evt) => {
            if (!(evt instanceof NavigationEnd)) {
                return;
            }
            document.body.scrollTop = 0;
        });

    }
}
