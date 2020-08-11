import { props, createAction } from "@ngrx/store";
import { User } from "../../../shared/interfaces/user.interface";


export const SET_USER = '[Calendar] SET USER';
export const SET_USERS = '[Calendar] SET USERS';
export const GET_USERS = '[Calendar] GET USERS';
export const ADD_USERS = '[Calendar] ADD USERS TO GROUP';

export const setUsers = createAction(SET_USERS, props<{users: User[]}>());
export const setUser = createAction(SET_USER, props<{user: User}>());
export const getUsers = createAction(GET_USERS, props<{groupId: number}>());
export const addUsersToGroup = createAction(ADD_USERS, props<{groupId: number, users: string[]}>());

