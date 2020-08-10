import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AuthReducer } from './auth/store/interfaces';
import * as AuthActions from './auth/store/actions/auth.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'wcwm';

  token$: Observable<string> = this._store.select(state => state.auth.token);

  constructor(private _store: Store<{auth: AuthReducer}>) { }

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) {
      this._store.dispatch({type: AuthActions.SET_TOKEN, token});
    }
  }
}
