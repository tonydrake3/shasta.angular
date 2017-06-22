import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'hammerjs';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// Home
import { HomeComponent } from './home/home.component';
import { PreloaderDirective } from './home/preloader.directive';
// Header
import { AppHeaderComponent } from './home/header/header.component';
// Sidenav
import { AppSidenavComponent } from './home/sidenav/sidenav.component';
import { ToggleOffcanvasNavDirective } from './home/sidenav/toggle-offcanvas-nav.directive';
import { AutoCloseMobileNavDirective } from './home/sidenav/auto-close-mobile-nav.directive';
import { AppSidenavMenuComponent } from './home/sidenav/sidenav-menu/sidenav-menu.component';
import { AccordionNavDirective } from './home/sidenav/sidenav-menu/accordion-nav.directive';
import { AppendSubmenuIconDirective } from './home/sidenav/sidenav-menu/append-submenu-icon.directive';
import { HighlightActiveItemsDirective } from './home/sidenav/sidenav-menu/highlight-active-items.directive';
// Search Overaly
import { AppSearchOverlayComponent } from './home/search-overlay/search-overlay.component';
import { SearchOverlayDirective } from './home/search-overlay/search-overlay.directive';
import { OpenSearchOverlaylDirective } from './home/search-overlay/open-search-overlay.directive';

// Pages
import { DashboardComponent } from './dashboard/dashboard.component';
import { PageLayoutFullscreenComponent } from './page-layouts/fullscreen/fullscreen.component';

// Sub modules
import { HomeModule } from './home/home.module';
import { SharedModule } from './shared/shared.module';

// hmr
import { removeNgStyles, createNewHosts } from '@angularclass/hmr';
import {AuthenticationService} from './shared/services/authentication/authentication.service';
import {AuthGuard} from './shared/services/guards/auth-guard.service';
import {LoginComponent} from './login/login.component';
import {CompanyModule} from './features/company/company.module';
import {ProjectModule} from './features/projects/project.module';
import {ProjectService} from './features/projects/project.service';

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        FormsModule,
        MaterialModule,
        BrowserAnimationsModule,
        AppRoutingModule,

        // Sub modules
        HomeModule,
        SharedModule,

        CompanyModule,
        ProjectModule
    ],
    declarations: [
        AppComponent,
        // Home
        HomeComponent,
        PreloaderDirective,
        // Header
        AppHeaderComponent,
        // Sidenav
        AppSidenavComponent,
        ToggleOffcanvasNavDirective,
        AutoCloseMobileNavDirective,
        AppSidenavMenuComponent,
        AccordionNavDirective,
        AppendSubmenuIconDirective,
        HighlightActiveItemsDirective,
        // Search overlay
        AppSearchOverlayComponent,
        SearchOverlayDirective,
        OpenSearchOverlaylDirective,
        //
        DashboardComponent,
        LoginComponent,
        // Pages
        PageLayoutFullscreenComponent,
    ],
    providers: [
        AuthenticationService,
        AuthGuard,
        ProjectService
    ],
    bootstrap: [AppComponent]
})

export class AppModule {
    constructor(public appRef: ApplicationRef) {}
    hmrOnInit(store) {
        console.log('HMR store', store);
    }
    hmrOnDestroy(store) {
        const cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
        // recreate elements
        store.disposeOldHosts = createNewHosts(cmpLocation);
        // remove styles
        removeNgStyles();
    }
    hmrAfterDestroy(store) {
        // display new elements
        store.disposeOldHosts();
        delete store.disposeOldHosts;
    }
}
