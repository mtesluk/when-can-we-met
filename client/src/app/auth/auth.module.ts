import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { authReducer } from '../auth/store/reducers/auth.reducer';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { AuthComponent } from './auth.component';

import { AuthEffects } from './store/effects/auth.effect';

@NgModule({
  declarations: [
    LoginComponent,
    LogoutComponent,
    AuthComponent,
  ],
  imports: [
    SharedModule,
    StoreModule.forFeature('auth', authReducer),
    EffectsModule.forFeature([AuthEffects])
  ],
  exports: [
    AuthComponent,
  ]
})
export class AuthModule { }
