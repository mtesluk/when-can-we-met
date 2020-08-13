import { User } from "./user.interface";
import { Group } from "./group.interface";

export interface Meeting {
    id?: number;
    name: string;
    startDate: Date;
    endDate: Date;
    user: User;
    groups?: Group[];
}
