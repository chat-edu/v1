import {add, del, find, get, update} from "@/cosmos/services/base";

import {USERS_TABLE} from "@/cosmos/constants/tables";

import {User, UserRow, UserScore, UserScoreRow} from "@/types/User";
import {NotebookScore, NotebookScoreRow} from "@/types/Notebook";

export const findAllUsers = async (): Promise<User[]> => {
    return find('SELECT * FROM Users;', [], transform);
};

// gets all users and sots them by their score
export const findAllUsersByScore = async (limit: number): Promise<User[]> => {
    const queryText = `
        WITH RankedUsers AS (
            SELECT
                u.id AS id,
                u.name AS name,
                u.username AS username,
                u.email AS email,
                COALESCE(SUM(s.score), 0) AS score,
                RANK() OVER (ORDER BY COALESCE(SUM(s.score), 0) DESC) AS rank
            FROM Users u
            LEFT JOIN Scores s ON u.id = s.user_id
            GROUP BY u.id, u.username, u.name
        )
        SELECT
            id,
            name,
            email,
            username,
            score,
            rank
        FROM RankedUsers
        ORDER BY rank
        LIMIT $1;
    `;
    return find(queryText, [limit], transformUserScore);
}

export const addUser = async (user: User): Promise<boolean> => {
    return add(USERS_TABLE, user);
};

export const updateUser = async (id: string, updatedFields: Partial<User>): Promise<boolean> => {
    return update(USERS_TABLE, [id], updatedFields);
};

export const getUser = async (id: string): Promise<User | null> => {
    const query = 'SELECT * FROM Users WHERE id = $1;';
    return get(query, [id], transform);
};

export const deleteUser = async (id: string): Promise<boolean> => {
    return del(USERS_TABLE, [id]);
};

// finds the top users by score. Include rank in the row select
export const findScoresByUserId = async (userId: string): Promise<NotebookScore[]> => {
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
            s.score,
            COALESCE(nc.num_notes, 0) AS num_notes
        FROM Notebooks n
            LEFT JOIN Users u ON n.user_id = u.id
            LEFT JOIN Scores s ON n.id = s.notebook_id AND s.user_id = $1
            LEFT JOIN NoteCount nc ON n.id = nc.notebook_id
        WHERE s.score > 0
        ORDER BY s.score DESC

    `;

    return find(queryText, [userId], transformNotebookScore);
}

const transform = (user: UserRow): User => ({
    id: user.id,
    name: user.name,
    email: user.email,
    username: user.username,
    profilePictureUrl: user.profile_picture_url || `https://api.multiavatar.com/${user.id}.png`,
});

const transformUserScore = (user: UserScoreRow): UserScore => ({
    ...transform(user),
    score: parseInt(user.score || '0'),
    rank: parseInt(user.rank || '0'),
})

const transformNotebookScore = (row: NotebookScoreRow): NotebookScore => ({
    userId: row.user_id,
    username: row.username,
    id: row.id,
    name: row.name,
    userScore: parseInt(row.score || '0'),
    numNotes: parseInt(row.num_notes || '0')
});