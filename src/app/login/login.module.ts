import { NgModule } from '@angular/core';
import { ReactiveFormsModule  } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import {MdInputModule, MdProgressSpinnerModule} from '@angular/material';
import {LoginRoutingModule, routedLoginComponents} from './login-routing.module';
import {ResetPasswordService} from './components/reset-password.service';



@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        SharedModule,
        MdInputModule,
        MdProgressSpinnerModule,
        LoginRoutingModule
    ],
    declarations: [
        routedLoginComponents
    ],
    providers: [
        ResetPasswordService
    ]
})

export class LoginModule {}
