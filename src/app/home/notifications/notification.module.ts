import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from '@angular/material';

import {SharedHomeModule} from '../shared/shared.home.module';
import {NotificationService} from './notification.service';
import {NotificationComponent} from './notifications.component';
import {NotificationItemComponent} from './notification-item/notification-item.component';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        SharedHomeModule
    ],
    declarations: [
        NotificationComponent,
        NotificationItemComponent
    ],
    providers: [
        NotificationService,
    ],
    exports: [
    ]
})

export class NotificationModule {}
