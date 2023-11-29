// used on the client side to display a user's score on a notebook
import {User} from "@/types/User";
import {Notebook} from "@/types/Notebook";

export interface Score {
    userId: User['id'];
    notebookId: Notebook['id'];
    score: number;
}

export interface UserScore extends Score {
    username: string;
    verified: boolean;
}

export interface NotebookScore extends UserScore {
    notebookName: string;
    numNotes: number;
}