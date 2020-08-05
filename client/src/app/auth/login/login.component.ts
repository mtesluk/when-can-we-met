import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthReducer } from '../store/interfaces';
import * as AuthActions from '../store/actions/auth.action';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(private _store: Store<{auth: AuthReducer}>) { }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this._store.dispatch({type: AuthActions.LOGIN, credentials: this.loginForm.value});
    }
  }

}
