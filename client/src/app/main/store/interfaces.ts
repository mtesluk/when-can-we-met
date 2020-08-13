import { User } from "../../shared/interfaces/user.interface";
import { Group } from "../../shared/interfaces/group.interface";
import { Meeting } from "../../shared/interfaces/meeting.interface";


export interface CalendarReducer {
    groups: Group[],
    group: Group,
    users: User[],
    user: User,
    meetings: Meeting[],
}