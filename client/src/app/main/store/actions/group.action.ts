import { createAction, props } from '@ngrx/store';
import { Group } from '../../../shared/interfaces/group.interface';


export const GET_GROUPS = '[Calendar] GET GROUPS';
export const SET_GROUPS = '[Calendar] SET GROUPS';
export const CREATE_GROUP = '[Calendar] CREATE GROUP';

export const getGroups = createAction(GET_GROUPS);
export const createGroup = createAction(CREATE_GROUP, props<{group: Group}>());
export const setGroups = createAction(SET_GROUPS, props<{groups: Group[]}>());
