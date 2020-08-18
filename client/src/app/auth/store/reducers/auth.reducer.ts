import { createReducer, on } from '@ngrx/store';
import * as AuthActions from '../actions/auth.action';
import { AuthReducer } from '../interfaces';


export const initialState: AuthReducer = {
    token: '',
};

const _authReducer = createReducer(initialState,
  on(AuthActions.setToken, (state, {token}) => ({...state, token: token})),
);

export function authReducer(state, action) {
  return _authReducer(state, action);
}