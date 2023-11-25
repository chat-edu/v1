export interface User {
    id: string;
    name: string;
    email: string;
    username: string;
    profilePictureUrl: string;
}

export interface UserScore extends User {
    score: number;
    rank: number;
}

export interface UserRow {
    id: string;
    name: string;
    email: string;
    username: string;
    profile_picture_url: string;
}

export interface UserScoreRow extends UserRow {
    score: string;
    rank: string;
}