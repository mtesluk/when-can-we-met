import { createAction, props } from '@ngrx/store';
import { Credentials } from '../../credentials.interface';


export const SET_TOKEN = '[Auth] SET TOKEN';
export const LOGIN = '[Auth] LOGIN';
export const LOGOUT = '[Auth] LOGOUT'


export const setToken = createAction(SET_TOKEN, props<{token: string}>());
export const login = createAction(LOGIN, props<{credentials: Credentials}>());
export const logout = createAction(LOGOUT);
