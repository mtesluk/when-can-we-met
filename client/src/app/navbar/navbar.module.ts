import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { NavbarComponent } from './navbar.component';
import { AuthModule } from '../auth/auth.module';


@NgModule({
  declarations: [
    NavbarComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    AuthModule,
  ],
  exports: [
    NavbarComponent,
  ]
})
export class NavbarModule { }
