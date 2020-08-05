import { User } from './user.interface';


export interface Group {
    name: string;
    users?: User[];
}