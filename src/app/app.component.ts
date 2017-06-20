import * as jQuery from 'jquery';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, NavigationEnd } from '@angular/router';
import { APPCONFIG } from './config'
import { HomeService } from './home/home.service'
import { environment } from '../environments/environment';

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
    providers: [HomeService],
})
export class AppComponent implements OnInit {
    AppConfig: any;
    public gitVersion: string;

    constructor(private router: Router) {
      this.gitVersion = environment.gitVersion;
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
