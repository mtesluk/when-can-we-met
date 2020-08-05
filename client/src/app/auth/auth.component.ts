import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthReducer } from './store/interfaces';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  token$: Observable<string> = this._store.select(state => state.auth.token);

  constructor(private _store: Store<{auth: AuthReducer}>) { }

  ngOnInit(): void {
  }

}
