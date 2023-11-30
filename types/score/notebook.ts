import {NotebookScorePartial, Ranked} from "@/types/score/index";

export interface NotebookScore extends NotebookScorePartial {
    notebookName: string;
    authorId: string;
    authorUsername: string;
    authorVerified: boolean;
    numNotes: number;
}

export interface RankedNotebookScore extends NotebookScore, Ranked {}