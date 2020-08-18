import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthReducer } from '../store/interfaces';
import * as AuthActions from '../store/actions/auth.action';
import { MatDialog } from '@angular/material/dialog';
import { RegisterDialog } from './register-dialog/register-dialog';


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

  constructor(private _store: Store<{auth: AuthReducer}>,
              private _dialog: MatDialog,
            ) { }

  ngOnInit(): void {
  }

  onRegisterClick() {
    const dialogRef = this._dialog.open(RegisterDialog, {
      width: '20%',
      height: '50%',
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this._store.dispatch(AuthActions.login({credentials: this.loginForm.value}));
    }
  }

}
