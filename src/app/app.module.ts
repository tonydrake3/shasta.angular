import { OnlyNumber } from './home/shared/directives/onlyNumber.directive';

import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdInputModule, MdProgressSpinnerModule } from '@angular/material';
import 'hammerjs';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotificationModule } from './home/notifications/notification.module';

// Pages
import { LoginComponent } from './login/login.component'

// Sub modules
import { HomeModule } from './home/home.module';
import { SharedModule } from './shared/shared.module';
import { CompanyModule } from './home/company/company.module';
import { LoginModule } from './login/login.module';
import { SettingsModule } from './home/settings/settings.module';

// hmr
import { removeNgStyles, createNewHosts } from '@angularclass/hmr';
import {AuthenticationService} from './shared/services/authentication/authentication.service';
import {AuthGuard} from './shared/services/guards/auth-guard.service';
import {DataSyncService} from './home/shared/services/data-sync.service';
import {LookupDataService} from './home/shared/services/lookup-data.service';

// entry components
import { CommentsComponent } from './home/shared/components/comments.component';
import { TimeCardTimeDetailComponent } from './home/time-expenses/timesheet-card/timesheet-card-timedetail.component';
import { ConfirmationDialogComponent } from './home/shared/components/confirmation-dialog.component';
import { NotesEntryDialogComponent } from './home/shared/components/notes-entry.component';
import { NotificationComponent } from './home/notifications/notifications.component';
import { PermissionsService } from './shared/services/authorization/permissions.service';
import { TimesheetCardPinComponent } from 'app/home/time-expenses/timesheet-card/timesheet-card-pin.component';
import { TimeRecordDetailModalComponent } from './home/time-expenses/time-record-detail-modal/time-record-detail-modal.component';

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        NotificationModule,

        // Sub modules
        LoginModule,
        HomeModule,
        SharedModule,
        MdInputModule,
        MdProgressSpinnerModule,

        CompanyModule,

        // ProjectModule
    ],
    declarations: [
        AppComponent
    ],
    providers: [
        AuthenticationService,
        AuthGuard,
        DataSyncService,
        LookupDataService,
        PermissionsService
    ],
    bootstrap: [AppComponent],
    entryComponents: [
        CommentsComponent,
        ConfirmationDialogComponent,
        NotesEntryDialogComponent,
        NotificationComponent,
        TimeRecordDetailModalComponent,
	TimeCardTimeDetailComponent, TimesheetCardPinComponent
    ]
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
