import {getPool} from "@/cosmosPostgres/citus";
import {del, get} from "@/cosmosPostgres/services/base";

import { UserRow } from "@/cosmosPostgres/types/user";
import { NotebookRow } from "@/cosmosPostgres/types/notebook";
import { ScoreRow } from "@/cosmosPostgres/types/score";


// READ

// gets the score of a user for a notebook
export const getScore = async (userId: UserRow["id"], notebookId: NotebookRow["id"]): Promise<ScoreRow | null> => {
    const query = 'SELECT * FROM Scores WHERE user_id = $1 AND notebook_id = $2;';
    return get(query, [userId, notebookId]);
};

// UPDATE

export const updateScore = async (userId: string, notebookId: number, incrementAmount: number): Promise<boolean> => {
    const client = await getPool().connect();
    try {
        const queryText = `
            INSERT INTO Scores (user_id, notebook_id, score)
            VALUES ($1, $2, $3)
            ON CONFLICT (user_id, notebook_id)
            DO UPDATE SET score = Scores.score + EXCLUDED.score;
        `;
        await client.query(queryText, [userId, notebookId, incrementAmount]);
        return true;
    } catch (error) {
        return false;
    } finally {
        client.release();
    }
};

// DELETE

export const deleteScore = async (userId: string, notebookId: number): Promise<boolean> => {
    const queryText = 'DELETE FROM Scores WHERE user_id = $1 AND notebook_id = $2;';
    return del(queryText, [userId, notebookId]);
};

export * from './notebooks';
export * from './users';
