import {add, del, find, get, update} from "@/cosmos/services/base";

import {USERS_TABLE} from "@/cosmos/constants/tables";

import {User} from "@/types/User";
import {NotebookScore, NotebookScoreRow} from "@/types/Notebook";

export const findAllUsers = async (): Promise<User[]> => {
    return find('SELECT * FROM Users;', [], transform);
};

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

export const findScoresByUserId = async (userId: string): Promise<NotebookScore[]> => {
    const queryText = `
        SELECT Users.id AS user_id, Users.username AS username, Notebooks.id, Notebooks.name, Scores.score, COUNT(Notes.id) AS num_notes
        FROM Scores
        INNER JOIN Users ON Scores.user_id = Users.id
        INNER JOIN Notebooks ON Scores.notebook_id = Notebooks.id
        INNER JOIN Notes ON Notebooks.id = Notes.notebook_id
        WHERE Scores.user_id = $1
        GROUP BY Users.id, Notebooks.id, Scores.score
        ORDER BY score DESC;
    `;
    return find(queryText, [userId], transformNotebookScore);
}

const transform = (row: User): User => row;

const transformNotebookScore = (row: NotebookScoreRow): NotebookScore => ({
    userId: row.user_id,
    username: row.username,
    id: row.id,
    name: row.name,
    userScore: row.score,
    numNotes: parseInt(row.num_notes || '0')
});