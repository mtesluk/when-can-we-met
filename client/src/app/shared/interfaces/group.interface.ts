import { User } from './user.interface';


export interface Group {
    id?: number;
    name: string;
    users?: User[];
}