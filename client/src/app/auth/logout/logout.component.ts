import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthReducer } from '../store/interfaces';
import * as AuthActions from '../store/actions/auth.action';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private _store: Store<{auth: AuthReducer}>) { }

  ngOnInit(): void {
  }

  logout() {
    this._store.dispatch(AuthActions.resetToken());
    localStorage.removeItem('token');
  }

}
