import { createAction, props } from '@ngrx/store';
import { Credentials } from '../../credentials.interface';


export const SET_TOKEN = '[Auth] SET TOKEN'
export const RESET_TOKEN = '[Auth] RESET TOKEN'
export const LOGIN = '[Auth] LOGIN'

export const setToken = createAction(SET_TOKEN, props<{token: string}>());
export const resetToken = createAction(RESET_TOKEN);
export const login = createAction(LOGIN, props<{credentials: Credentials}>());
