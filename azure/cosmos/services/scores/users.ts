import {find} from "@/azure/cosmos/services/base";

import {NotebookRow} from "@/azure/cosmos/types/notebook";
import {
    RankedUserCreatorScoreRow,
    RankedUserNotebookRow,
    UserNotebookScoreRow,
} from "@/azure/cosmos/types/score";

// finds the top users by score on a notebook
export const findScoresByNotebookId = async (notebookId: NotebookRow["id"]): Promise<RankedUserNotebookRow[]> => {
    const queryText = `
        SELECT 
            Scores.score,
            Users.id AS user_id,
            Users.username,
            Users.verified,
            RANK() OVER (ORDER BY Scores.score DESC) AS rank
        FROM Scores
            INNER JOIN Users ON Scores.user_id = Users.id
        WHERE notebook_id = $1
        ORDER BY score DESC;
    `;
    return find(queryText, [notebookId]);
}

// finds the top users by total score
export const findTopUsers = async (limit: number): Promise<RankedUserNotebookRow[]> => {
    const queryText = `
        SELECT
            COALESCE(SUM(s.score), 0) AS score,
            u.id AS user_id,
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

export const findTopCreators = async (limit: number): Promise<RankedUserCreatorScoreRow[]> => {
    const queryText = `
        SELECT 
            u.id AS user_id, 
            u.username, 
            u.verified, 
            COALESCE(SUM(s.score), 0) AS score, 
            COUNT(n.id) AS num_notebooks, 
            RANK() OVER (ORDER BY COALESCE(SUM(s.score), 0) DESC) AS rank
        FROM Users u
        LEFT JOIN Notebooks n ON u.id = n.user_id
        LEFT JOIN Scores s ON n.id = s.notebook_id
        WHERE score > 0
        GROUP BY u.id
        ORDER BY score DESC
        LIMIT $1;
    `;
    return find(queryText, [limit]);
}

export const findScoresByUserId = async (userId: string): Promise<UserNotebookScoreRow[]> => {
    const queryText = `
        WITH NoteCount AS (
            SELECT
                notebook_id,
                COUNT(id) AS num_notes
            FROM Notes
            GROUP BY notebook_id
        )
        SELECT
            n.id,
            n.name,
            n.user_id,
            u.username,
            u.profile_picture_url,
            u.verified,
            s.score,
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