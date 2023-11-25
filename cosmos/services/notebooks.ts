import { add, del, find, get, update } from "@/cosmos/services/base";

import { NOTEBOOKS_TABLE } from "@/cosmos/constants/tables";

import {
    Notebook,
    NotebookRow,
    NotebookRowInput,
    RankedNotebook,
    RankedNotebookRow
} from "@/types/Notebook";

export const findAllNotebooks = async (): Promise<Notebook[]> => {
    const queryText = `
        SELECT 
            notebooks.*, 
            users.username as username, 
            count(notes.id) as num_notes 
        FROM notebooks 
        JOIN users ON notebooks.user_id = users.id 
        LEFT JOIN notes ON notes.notebook_id = notebooks.id 
        GROUP BY notebooks.id, users.id;
    `;
    return find(queryText, [], transformNotebook);
};

export const findNotebooksByUserId = async (userId: string): Promise<Notebook[]> => {
    const queryText = `
        SELECT notebooks.*, users.username as username, count(notes.id) as num_notes 
        FROM notebooks JOIN users ON notebooks.user_id = users.id LEFT JOIN notes ON notes.notebook_id = notebooks.id 
        WHERE notebooks.user_id = $1 
        GROUP BY notebooks.id, users.id;
    `;
    return find(queryText, [userId], transformNotebook);
};

// sort the notebooks by their score, descending, then by their number of notes if there is a tie
// use the scores table to determine the aggregate score for each notebook
export const findTopNotebooks = async (limit: number): Promise<RankedNotebook[]> => {
    const queryText = `

        WITH RankedNotebooks AS (
            SELECT
                n.id AS id,
                n.name AS name,
                u.username AS username,
                COALESCE(SUM(s.score), 0) AS total_score,
                RANK() OVER (ORDER BY COALESCE(SUM(s.score), 0) DESC) AS rank,
                COALESCE(COUNT(nt.id), 0) AS num_notes
            FROM Notebooks n
                     LEFT JOIN Scores s ON n.id = s.notebook_id
                     LEFT JOIN Notes nt ON n.id = nt.notebook_id
                     JOIN Users u ON n.user_id = u.id
            GROUP BY n.id, u.username, n.name
        )
        SELECT
            id,
            username,
            name,
            total_score,
            rank,
            username,
            num_notes
        FROM RankedNotebooks
        ORDER BY rank
        LIMIT $1;
    `;
    return find(queryText, [limit], transformRankedNotebook);
}

export const getRankedNotebook = async (notebookId: number): Promise<RankedNotebook | null> => {
    const query = `
        WITH RankedNotebooks AS (
            SELECT
                n.id AS id,
                n.name AS name,
                u.username AS username,
                COALESCE(SUM(s.score), 0) AS total_score,
                RANK() OVER (ORDER BY COALESCE(SUM(s.score), 0) DESC) AS rank,
                COALESCE(COUNT(nt.id), 0) AS num_notes
            FROM Notebooks n
            LEFT JOIN Scores s ON n.id = s.notebook_id
            LEFT JOIN Notes nt ON n.id = nt.notebook_id
            JOIN Users u ON n.user_id = u.id
            GROUP BY n.id, u.username, n.name
        )
        SELECT
            id,
            name,
            total_score,
            rank,
            username,
            num_notes
        FROM RankedNotebooks
        WHERE id = $1;
    `
    return get(query, [notebookId], transformRankedNotebook);
}


export const addNotebook = async (notebook: NotebookRowInput): Promise<boolean> => {
    return add(NOTEBOOKS_TABLE, notebook);
};

export const updateNotebook = async (id: number, updatedFields: Partial<NotebookRowInput>): Promise<boolean> => {
    return update(NOTEBOOKS_TABLE, [id], updatedFields);
};

export const getNotebook = async (id: number): Promise<Notebook | null> => {
    const query = `
        SELECT
            n.*,
            u.username AS username,
            COUNT(nt.id) AS num_notes
        FROM Notebooks n
        JOIN Users u ON n.user_id = u.id
        LEFT JOIN Notes nt ON n.id = nt.notebook_id
        WHERE n.id = $1
        GROUP BY n.id, u.username;
    `
    return get(query, [id], transformNotebook);
};

export const deleteNotebook = async (id: number): Promise<boolean> => {
    return del(NOTEBOOKS_TABLE, [id]);
};

const transformNotebook = (row: NotebookRow): Notebook => ({
    id: row.id,
    name: row.name,
    userId: row.user_id,
    username: row.username,
    numNotes: parseInt(row.num_notes),
});

const transformRankedNotebook = (row: RankedNotebookRow): RankedNotebook => ({
    ...transformNotebook(row),
    totalScore: parseInt(row.total_score),
    rank: parseInt(row.rank),
});