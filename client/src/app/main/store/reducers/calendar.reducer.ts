import { createReducer, on } from '@ngrx/store';
import { CalendarReducer } from '../interfaces';
import * as groupActions from '../actions/group.action';

export const initialState: CalendarReducer = {
  groups: [],
  group: null,
  users: [],
  user: null,
};

const _calendarReducer = createReducer(initialState,
  on(groupActions.setGroups, (state, {groups}) => ({...state, groups: groups})),
);

export function calendarReducer(state, action) {
  return _calendarReducer(state, action);
}