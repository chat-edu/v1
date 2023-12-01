import {find, get} from "@/cosmosPostgres/services/base";

import {NotebookRow} from "@/cosmosPostgres/types/notebook";
import {
    RankedUserCreatorScoreRow,
    RankedUserNotebookScoreRow, RankedUserScoreRow,
    UserNotebookScoreRow,
} from "@/cosmosPostgres/types/score";
import {UserRow} from "@/cosmosPostgres/types";

// finds the top users by score on a notebook
export const findScoresByNotebookId = async (notebookId: NotebookRow["id"]): Promise<RankedUserNotebookScoreRow[]> => {
    const queryText = `
        WITH NoteCount AS (
            SELECT
                notebook_id,
                COUNT(*) AS num_notes
            FROM Notes
            GROUP BY notebook_id
        )
        SELECT 
            Scores.score,
            Users.id AS user_id,
            Users.name,
            Users.username,
            Users.profile_picture_url,
            Users.verified,
            Notebooks.name AS notebook_name,
            NotebookUsers.id AS author_id,
            NotebookUsers.username AS author_username,
            NotebookUsers.verified AS author_verified,
            NoteCount.num_notes,
            RANK() OVER (ORDER BY Scores.score DESC) AS rank
        FROM Scores
            INNER JOIN Users ON Scores.user_id = Users.id
            INNER JOIN Notebooks on Notebooks.id = Scores.notebook_id
            INNER JOIN USERS as NotebookUsers on Notebooks.user_id = NotebookUsers.id
            LEFT JOIN NoteCount ON Notebooks.id = NoteCount.notebook_id
        WHERE Notebooks.id = $1
        ORDER BY score DESC;
    `;
    return find(queryText, [notebookId]);
}

// finds the top users by total score
export const findTopUsers = async (limit: number): Promise<RankedUserScoreRow[]> => {
    const queryText = `
        SELECT
            COALESCE(SUM(s.score), 0) AS score,
            u.id AS user_id,
            u.name,
            u.username,
            u.profile_picture_url,
            u.verified,
            RANK() OVER (ORDER BY COALESCE(SUM(s.score), 0) DESC) AS rank
        FROM Users u
            LEFT JOIN Scores s ON u.id = s.user_id
        WHERE score > 0
        GROUP BY u.id
        ORDER BY score DESC
        LIMIT $1;
    `;
    return find(queryText, [limit]);
}

// finds the top creators by the total score of their notebooks
export const findTopCreators = async (limit: number): Promise<RankedUserCreatorScoreRow[]> => {
    const queryText = `
        SELECT
            u.id AS user_id,
            u.name,
            u.username,
            u.profile_picture_url,
            u.verified,
            COALESCE(SUM(s.score), 0) AS score,
            COUNT(DISTINCT n.id) AS num_notebooks,
            RANK() OVER (ORDER BY COALESCE(SUM(s.score), 0) DESC) AS rank
        FROM Users u
                 LEFT JOIN Notebooks n ON u.id = n.user_id
                 LEFT JOIN Scores s ON n.id = s.notebook_id
        GROUP BY u.id
        HAVING COALESCE(SUM(s.score), 0) > 0
        ORDER BY score DESC
        LIMIT $1;
    `;
    return find(queryText, [limit]);
}

// finds the scores of a user on all notebooks they've used
export const findScoresByUserId = async (userId: UserRow["id"]): Promise<UserNotebookScoreRow[]> => {
    const queryText = `
        WITH NoteCount AS (
            SELECT
                notebook_id,
                COUNT(*) AS num_notes
            FROM Notes
            GROUP BY notebook_id
        )
        SELECT
            n.id AS notebook_id,
            n.name AS notebook_name,
            n.user_id AS author_id,
            u.id AS author_id,
            u.name AS author_name,
            u.username AS author_username,
            u.profile_picture_url AS author_profile_picture_url,
            u.verified AS author_verified,
            s.score,
            s.user_id AS user_id,
            COALESCE(nc.num_notes, 0) AS num_notes
        FROM Notebooks n
            LEFT JOIN Users u ON n.user_id = u.id
            LEFT JOIN Scores s ON n.id = s.notebook_id AND s.user_id = $1
            LEFT JOIN NoteCount nc ON n.id = nc.notebook_id
        WHERE s.score > 0
        ORDER BY s.score DESC
    `;
    return find(queryText, [userId]);
}

// finds the score of a user on a notebook
export const findScoreByUserIdAndNotebookId = async (userId: UserRow["id"], notebookId: NotebookRow["id"]): Promise<UserNotebookScoreRow | null> => {
    const queryText = `
        WITH NoteCount AS (
            SELECT
                notebook_id,
            COUNT(*) AS num_notes  -- Count all notes for each notebook
            FROM Notes
            WHERE notebook_id = $2  -- Filter by the notebook ID
            GROUP BY notebook_id    -- Group by the notebook ID
        )        
         SELECT
             s.score,
             s.notebook_id,
             s.user_id,
             n.name,
             u.id AS author_id,
             u.username AS author_username,
             u.verified AS author_verified,
             COALESCE(nc.num_notes, 0) AS num_notes
         FROM Scores s
             INNER JOIN Notebooks n ON s.notebook_id = n.id
             INNER JOIN Users u ON n.user_id = u.id
             LEFT JOIN NoteCount nc ON s.notebook_id = nc.notebook_id
         WHERE s.user_id = $1 AND s.notebook_id = $2
    `;
    return await get(queryText, [userId, notebookId]);
}

// finds the score and rank of a user
export const findUserScoreAndRank = async (userId: UserRow["id"]): Promise<RankedUserScoreRow | null> => {
    const queryText = `
        SELECT
            COALESCE(SUM(s.score), 0) AS score,
            u.id AS user_id,
            u.name,
            u.username,
            u.profile_picture_url,
            u.verified,
            RANK() OVER (ORDER BY COALESCE(SUM(s.score), 0) DESC) AS rank
        FROM Users u
            LEFT JOIN Scores s ON u.id = s.user_id
        WHERE u.id = $1
        GROUP BY u.id
        ORDER BY score DESC
    `;
    return await get(queryText, [userId]);
}

// finds the score and rank of a creator
export const findCreatorScoreAndRank = async (userId: UserRow["id"]): Promise<RankedUserCreatorScoreRow | null> => {
    const queryText = `
        SELECT
            u.id AS user_id,
            u.name,
            u.username,
            u.profile_picture_url,
            u.verified,
            COALESCE(SUM(s.score), 0) AS score,
            COUNT(DISTINCT n.id) AS num_notebooks,
            RANK() OVER (ORDER BY COALESCE(SUM(s.score), 0) DESC) AS rank
        FROM Users u
            LEFT JOIN Notebooks n ON u.id = n.user_id
            LEFT JOIN Scores s ON n.id = s.notebook_id
        WHERE u.id = $1
        GROUP BY u.id
        HAVING COALESCE(SUM(s.score), 0) > 0
        ORDER BY score DESC
    `;
    return await get(queryText, [userId]);
}