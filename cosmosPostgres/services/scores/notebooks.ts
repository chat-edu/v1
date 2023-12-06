import {find, get} from "@/cosmosPostgres/services/base";

import {NotebookRow, RankedNotebookScoreRow} from "@/cosmosPostgres/types";

// finds the top notebooks by total score
export const findTopNotebooks = async (limit: number): Promise<RankedNotebookScoreRow[]> => {
    const queryText = `
        WITH RankedNotebooks AS (
            SELECT
                n.id AS notebook_id,
                COALESCE(SUM(s.score), 0) AS score,
                u.id AS author_id,
                n.name AS notebook_name,
                u.username AS author_username,
                u.verified AS author_verified,
                RANK() OVER (ORDER BY COALESCE(SUM(s.score), 0) DESC) AS rank
            FROM Notebooks n
                LEFT JOIN Scores s ON n.id = s.notebook_id
                JOIN Users u ON n.user_id = u.id
            GROUP BY n.id, u.username, u.id
        ),
        NoteCount AS (
            SELECT
                notebook_id,
                COALESCE(COUNT(id), 0) AS num_notes
                FROM Notes
                GROUP BY notebook_id
        )
        SELECT
            rn.notebook_id,
            rn.score,
            rn.notebook_name,
            rn.author_id,
            rn.author_username,
            rn.author_verified,
            nc.num_notes,
            rn.rank
        FROM RankedNotebooks rn
            LEFT JOIN NoteCount nc ON rn.notebook_id = nc.notebook_id
        WHERE rn.score > 0
        ORDER BY rn.rank
        LIMIT $1;
    `;
    return find(queryText, [limit]);
}

export const findTopNotebooksByCreatorId = async (userId: string, limit: number): Promise<RankedNotebookScoreRow[]> => {
    const queryText = `
        WITH RankedNotebooks AS (
            SELECT
                n.id AS notebook_id,
                COALESCE(SUM(s.score), 0) AS score,
                n.name AS notebook_name,
                u.id AS author_id,
                u.name AS author_name,
                u.username AS author_username,
                u.verified AS author_verified,
                RANK() OVER (ORDER BY COALESCE(SUM(s.score), 0) DESC) AS rank
            FROM Notebooks n
                LEFT JOIN Scores s ON n.id = s.notebook_id
                JOIN Users u ON n.user_id = u.id
            WHERE n.user_id = $1
            GROUP BY n.id, u.username, u.id
        ),
        NoteCount AS (
            SELECT
                notebook_id,
                COALESCE(COUNT(id), 0) AS num_notes
                FROM Notes
                GROUP BY notebook_id
        )
        SELECT
            rn.notebook_id,
            rn.score,
            rn.author_id,
            rn.notebook_name,
            rn.author_username,
            rn.author_verified,
            nc.num_notes,
            rn.rank
        FROM RankedNotebooks rn
            LEFT JOIN NoteCount nc ON rn.notebook_id = nc.notebook_id
        ORDER BY rn.rank
        LIMIT $2;
    `;
    return find(queryText, [userId, limit]);
}

export const findTopNotebooksByUserId = async (userId: string, limit: number): Promise<RankedNotebookScoreRow[]> => {
    const queryText = `
        WITH RankedNotebooks AS (
            SELECT
                n.id AS notebook_id,
                COALESCE(SUM(s.score), 0) AS score,
                n.name AS notebook_name,
                u.id AS author_id,
                u.name AS author_name,
                u.username AS author_username,
                u.verified AS author_verified,
                RANK() OVER (ORDER BY COALESCE(SUM(s.score), 0) DESC) AS rank
            FROM Notebooks n
                LEFT JOIN Scores s ON n.id = s.notebook_id
                JOIN Users u ON n.user_id = u.id
            WHERE s.user_id = $1
            GROUP BY n.id, u.username, u.id
        ),
        NoteCount AS (
            SELECT
                notebook_id,
                COALESCE(COUNT(id), 0) AS num_notes
                FROM Notes
                GROUP BY notebook_id
        )
        SELECT
            rn.notebook_id,
            rn.score,
            rn.notebook_name,
            rn.author_username,
            rn.author_verified,
            nc.num_notes,
            rn.rank
        FROM RankedNotebooks rn
            LEFT JOIN NoteCount nc ON rn.notebook_id = nc.notebook_id
        WHERE rn.score > 0
        ORDER BY rn.rank
        LIMIT $2;
    `;
    return find(queryText, [userId, limit]);
}

// gets the rank of a notebook by total score
export const getRankedNotebook = async (notebookId: NotebookRow["id"]): Promise<RankedNotebookScoreRow | null> => {
    const query = `
        WITH ScoreAggregation AS (
            SELECT
                notebook_id,
                COALESCE(SUM(score), 0) AS score
            FROM Scores
            GROUP BY notebook_id
        ),
        NoteCount AS (
            SELECT
                notebook_id,
                COALESCE(COUNT(id), 0) AS num_notes
            FROM Notes
            GROUP BY notebook_id
        ),
        RankedNotebooks AS (
            SELECT
                n.id AS notebook_id,
                n.name AS notebook_name,
                u.username AS author_username,
                u.verified AS author_verified,
                sa.score,
                nc.num_notes,
                RANK() OVER (ORDER BY COALESCE(sa.score, 0) DESC) AS rank
             FROM Notebooks n
                 JOIN Users u ON n.user_id = u.id
                 LEFT JOIN ScoreAggregation sa ON n.id = sa.notebook_id
                 LEFT JOIN NoteCount nc ON n.id = nc.notebook_id
        )
        SELECT
            notebook_id,
            score,
            notebook_name,
            author_username,
            author_verified,
            num_notes,
            rank
        FROM RankedNotebooks
        WHERE notebook_id = $1;
    `
    return get(query, [notebookId]);
}