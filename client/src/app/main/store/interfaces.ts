import { User } from "../../shared/interfaces/user.interface";
import { Group } from "../../shared/interfaces/group.interface";


export interface CalendarReducer {
    groups: Group[],
    group: Group,
    users: User[],
    user: User,
}