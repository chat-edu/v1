export interface UserInput {
    id: string;
    name: string;
    email: string;
    username: string;
    profilePictureUrl: string;
}

export interface User extends UserInput {
    verified: boolean;
}

export interface UserScore extends User {
    score: number;
    rank: number;
}

export interface UserRowInput {
    id: string;
    name: string;
    email: string;
    username: string;
    profile_picture_url: string;
}

export interface UserRow extends UserRowInput {

    verified: boolean;
}

export interface UserScoreRow extends UserRow {
    score: string;
    rank: string;
}