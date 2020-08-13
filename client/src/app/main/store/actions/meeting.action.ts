import { createAction, props } from "@ngrx/store";
import { Meeting } from '../../../shared/interfaces/meeting.interface';

export const GET_MEETINGS = '[Calendar] GET MEETINGS';
export const SET_MEETINGS = '[Calendar] SET MEETINGS';


export const getMeetings = createAction(GET_MEETINGS, props<{groupId: number, userId?: number}>());
export const setMeetings = createAction(SET_MEETINGS, props<{meetings: Meeting[]}>());