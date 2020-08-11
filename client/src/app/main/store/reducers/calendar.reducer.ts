import { createReducer, on } from '@ngrx/store';
import { CalendarReducer } from '../interfaces';
import * as groupActions from '../actions/group.action';
import * as userActions from '../actions/user.actions';


export const initialState: CalendarReducer = {
  groups: [],
  group: null,
  users: [],
  user: null,
};

const _calendarReducer = createReducer(initialState,
  on(groupActions.setGroups, (state, {groups}) => ({...state, groups: groups})),
  on(groupActions.setGroup, (state, {group}) => ({...state, group: group})),
  on(userActions.setUsers, (state, {users}) => ({...state, users: users})),
  on(userActions.setUser, (state, {user}) => ({...state, user: user})),
);

export function calendarReducer(state, action) {
  return _calendarReducer(state, action);
}