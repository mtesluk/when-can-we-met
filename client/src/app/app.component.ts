import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AuthReducer } from './auth/store/interfaces';
import * as AuthActions from './auth/store/actions/auth.action';
import { NotificationService } from './shared/directives/notification.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'wcwm';

  token$: Observable<string> = this._store.select(state => state.auth.token);

  constructor(private _store: Store<{auth: AuthReducer}>,
              private _notificationService: NotificationService,
              private _snackBar: MatSnackBar,
            ) { }

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) {
      this._store.dispatch({type: AuthActions.SET_TOKEN, token});
    }

    this._notificationService.notify$.subscribe((text: string) => {
      this._snackBar.open(text, 'Dismiss', {
        duration: 3000,
        horizontalPosition: environment.notify.horizontal as MatSnackBarHorizontalPosition,
        verticalPosition: environment.notify.vertical as MatSnackBarVerticalPosition,
      });
    });
  }
}
