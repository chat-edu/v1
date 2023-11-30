import {User} from "@/types/User";
import {Notebook} from "@/types/Notebook";

interface ScoreInterface {
    score: number;
}

export interface UserScorePartial extends ScoreInterface {
    userId: User["id"];
}

export interface NotebookScorePartial extends ScoreInterface {
    notebookId: Notebook["id"];
}

export interface Score extends UserScorePartial, NotebookScorePartial {}

export interface Ranked {
    rank: number;
}

export * from "./user";
export * from "./notebook";