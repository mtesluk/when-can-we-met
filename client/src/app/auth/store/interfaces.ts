export interface AuthReducer {
    token: string;
}

export enum RightBarType {
    NONE,
    GROUPS,
    USERS,
}

export interface LayoutReducer {
    rightBar: RightBarType;
}