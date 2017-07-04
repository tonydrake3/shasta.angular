import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'hammerjs';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

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
import {DataSyncService} from './shared/services/utilities/data-sync.service';
import {SettingsModule} from './features/settings/settings.module';
import {LookupDataService} from './shared/services/utilities/lookup-data.service';

// entry components
import { CommentsComponent } from './shared/components/comments.component';

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
        // ProjectModule
    ],
    declarations: [
        AppComponent,
        DashboardComponent,
        LoginComponent,
        // Pages
        PageLayoutFullscreenComponent,
    ],
    providers: [
        AuthenticationService,
        AuthGuard,
        DataSyncService,
        LookupDataService
    ],
    bootstrap: [AppComponent],
    entryComponents: [CommentsComponent]
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
