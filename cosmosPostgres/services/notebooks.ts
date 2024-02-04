import { add, del, find, get, update } from "@/cosmosPostgres/services/base";

import { NOTEBOOKS_TABLE } from "@/cosmosPostgres/constants/tables";

import { NotebookRow, NotebookRowInput } from "@/cosmosPostgres/types/notebook";

// CREATE

export const addNotebook = async (notebook: NotebookRowInput) => {
    return add<NotebookRowInput, NotebookRow>(NOTEBOOKS_TABLE, notebook);
};

// QUERIES

export const getNotebook = async (id: number): Promise<NotebookRow | null> => {
    const query = `
        SELECT
            n.*,
            u.username AS username,
            u.verified AS verified,
            COUNT(nt.id) AS num_notes
        FROM Notebooks n
        JOIN Users u ON n.user_id = u.id
        LEFT JOIN Notes nt ON n.id = nt.notebook_id
        WHERE n.id = $1
        GROUP BY n.id, u.username, u.verified;
    `
    return get(query, [id]);
};

export const getNotebookByAccessCode = async (accessCode: string): Promise<NotebookRow | null> => {
    const query = `
        SELECT
            n.*,
            u.username AS username,
            u.verified AS verified,
            COUNT(nt.id) AS num_notes
        FROM Notebooks n
        JOIN Users u ON n.user_id = u.id
        LEFT JOIN Notes nt ON n.id = nt.notebook_id
        WHERE n.access_code = $1
        GROUP BY n.id, u.username, u.verified;
    `
    return get(query, [accessCode]);
}

export const findNotebooks = async (): Promise<NotebookRow[]> => {
    const queryText = `
        SELECT 
            notebooks.*, 
            users.username as username, 
            users.verified as verified,
            count(notes.id) as num_notes 
        FROM notebooks 
        JOIN users ON notebooks.user_id = users.id 
        LEFT JOIN notes ON notes.notebook_id = notebooks.id 
        GROUP BY notebooks.id, users.id;
    `;
    return find(queryText, []);
};

export const findEnrolledNotebooksByUserId = async (userId: string): Promise<NotebookRow[]> => {
    const queryText = `
        SELECT 
            notebooks.*, 
            users.username as username, 
            users.verified as verified,
            count(notes.id) as num_notes 
        FROM notebooks 
        JOIN users ON notebooks.user_id = users.id 
        LEFT JOIN notes ON notes.notebook_id = notebooks.id 
        WHERE notebooks.id IN (SELECT notebook_id FROM enrollments WHERE user_id = $1)
        GROUP BY notebooks.id, users.id;
    `;
    return find(queryText, [userId]);
}

export const findNotebooksByTeacherId = async (userId: string): Promise<NotebookRow[]> => {
    const queryText = `
        SELECT 
            notebooks.*, 
            users.username as username, 
            users.verified as verified,
            count(notes.id) as num_notes 
        FROM notebooks 
        JOIN users ON notebooks.user_id = users.id 
        LEFT JOIN notes ON notes.notebook_id = notebooks.id 
        WHERE notebooks.user_id = $1
        GROUP BY notebooks.id, users.id;
    `;
    return find(queryText, [userId]);

}

// UPDATE

export const updateNotebook = async (id: number, updatedFields: Partial<NotebookRowInput>) => {
    return update<Partial<NotebookRowInput>, NotebookRow>(NOTEBOOKS_TABLE, [id], updatedFields);
};

// DELETE

export const deleteNotebook = async (id: number): Promise<boolean> => {
    return del(NOTEBOOKS_TABLE, [id]);
};