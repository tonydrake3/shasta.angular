import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule, MdDatepickerModule, MdNativeDateModule } from '@angular/material';

// Directives
import { EChartsDirective } from './directives/echarts.directive';
import { SlimScrollDirective } from './directives/slim-scroll.directive';

// Services
import { AuthorizationService } from './services/authorization/authorization.service';
import { UserService } from './services/user/user.service';
import {DataSyncService} from './services/utilities/data-sync.service';

// Components
import { WeekSelectorComponent } from './components/week-selector.component';
import { BaseCardComponent } from './components/base.card.component';
import { CommentsComponent } from './components/comments.component';

// Pipes
import {StatusPipe} from './pipes/status.pipe';
import {KeysPipe} from './pipes/keys.pipe';

@NgModule({
  imports: [
    MaterialModule,
    MdDatepickerModule,
    MdNativeDateModule,
    CommonModule,
    FormsModule
  ],
  declarations: [
    EChartsDirective,
    SlimScrollDirective,
    WeekSelectorComponent,
    BaseCardComponent,
    StatusPipe,
    KeysPipe,
    CommentsComponent
  ],
  providers: [
    AuthorizationService,
    UserService
  ],
  exports: [
    EChartsDirective,
    SlimScrollDirective,
    WeekSelectorComponent,
    BaseCardComponent,
    StatusPipe,
    KeysPipe,
    CommentsComponent
  ]
})

export class SharedModule {}
