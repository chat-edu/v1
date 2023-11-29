import {User} from "@/types/User";

// used on the client side to create a new notebook
export interface NotebookInput {
    name: string;
    userId: string;
}

// used on the client side to display a notebook
export interface Notebook extends NotebookInput {
    id: number;
    username: User["username"];
    verified: User["verified"];
    numNotes: number;
}

// used on the client side to display a notebook, the total score on the notebook, and the rank of the notebook
export interface RankedNotebook extends Notebook {
    totalScore: number;
    rank: number;
}