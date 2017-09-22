import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'hammerjs';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Pages
import { LoginComponent } from './login/login.component'

// Sub modules
import { HomeModule } from './home/home.module';
import { SharedModule } from './shared/shared.module';
import { CompanyModule } from './home/company/company.module';
import { SettingsModule } from './home/settings/settings.module';

// hmr
import { removeNgStyles, createNewHosts } from '@angularclass/hmr';
import {AuthenticationService} from './shared/services/authentication/authentication.service';
import {AuthGuard} from './shared/services/guards/auth-guard.service';
import {DataSyncService} from './home/shared/services/data-sync.service';
import {LookupDataService} from './home/shared/services/lookup-data.service';

// entry components
import { CommentsComponent } from './home/shared/components/comments.component';
import {MdInputModule, MdProgressSpinnerModule} from '@angular/material';

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        AppRoutingModule,

        // Sub modules
        HomeModule,
        SharedModule,
        MdInputModule,
        MdProgressSpinnerModule,

        CompanyModule,
        // ProjectModule
    ],
    declarations: [
        AppComponent,
        LoginComponent,
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
