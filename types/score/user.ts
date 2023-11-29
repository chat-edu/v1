import {NotebookScore, Ranked, UserScorePartial} from "@/types/score";

export interface UserScore extends UserScorePartial {
    name: string;
    username: string;
    profilePictureUrl: string;
    verified: boolean;
}

export interface UserCreatorScore extends UserScore {
    numNotebooks: number;
}

export interface RankedUserCreatorScore extends UserCreatorScore, Ranked {}

export interface UserNotebookScore extends UserScore, NotebookScore {}

export interface RankedUserNotebookScore extends UserNotebookScore, Ranked {}