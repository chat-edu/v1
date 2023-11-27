import {getPool} from "@/azure/cosmos/citus";
import {del, find, get} from "@/azure/cosmos/services/base";

import {Score, ScoreRow, UserScore, UserScoreRow} from "@/types/Score";

// READ

export const getScore = async (userId: string, notebookId: number): Promise<Score | null> => {
    const query = 'SELECT * FROM Scores WHERE user_id = $1 AND notebook_id = $2;';
    return get(query, [userId, notebookId], transformScore);
};

export const findScoresByNotebookId = async (notebookId: number): Promise<UserScore[]> => {
    const queryText = `
        SELECT 
            Scores.*, 
            Users.username,
            Users.verified
        FROM Scores
        INNER JOIN Users ON Scores.user_id = Users.id
        WHERE notebook_id = $1
        ORDER BY score DESC;
    `;
    return find(queryText, [notebookId], transformUserScore);
}

// UPDATE

export const updateScore = async (userId: string, notebookId: number, incrementAmount: number): Promise<Score | null> => {
    const client = await getPool().connect();
    try {
        const queryText = `
            INSERT INTO Scores (user_id, notebook_id, score)
            VALUES ($1, $2, $3)
            ON CONFLICT (user_id, notebook_id)
            DO UPDATE SET score = Scores.score + EXCLUDED.score;
        `;
        const { rows } = await client.query(queryText, [userId, notebookId, incrementAmount]);
        return rows[0];
    } catch (error) {
        return null;
    } finally {
        client.release();
    }
};

// DELETE

export const deleteScore = async (userId: string, notebookId: number): Promise<boolean> => {
    const queryText = 'DELETE FROM Scores WHERE user_id = $1 AND notebook_id = $2;';
    return del(queryText, [userId, notebookId]);
};

// TRANSFORMERS

const transformScore = (row: ScoreRow): Score => ({
    userId: row.user_id,
    notebookId: row.notebook_id,
    score: row.score
});

const transformUserScore = (row: UserScoreRow): UserScore => ({
    ...transformScore(row),
    username: row.username,
    verified: row.verified
})
