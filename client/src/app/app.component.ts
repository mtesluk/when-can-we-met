import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AuthReducer } from './auth/store/interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'wcwm';

  token$: Observable<string> = this._store.select(state => state.auth.token);

  constructor(private _store: Store<{auth: AuthReducer}>) { }
}
