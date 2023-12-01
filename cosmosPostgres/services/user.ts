import {add, del, find, get, update} from "@/cosmosPostgres/services/base";

import {USERS_TABLE} from "@/cosmosPostgres/constants/tables";

import { UserRowInput, UserRow } from "@/cosmosPostgres/types/user";

// CREATE

export const addUser = async (user: UserRowInput): Promise<UserRow | null> => {
    return add<UserRowInput, UserRow>(USERS_TABLE, user);
};

// READ

export const getUser = async (id: string): Promise<UserRow | null> => {
    const query = 'SELECT * FROM Users WHERE id = $1;';
    return get(query, [id]);
};

export const findAllUsers = async (): Promise<UserRow[]> => {
    return find('SELECT * FROM Users;', []);
};


// UPDATE

export const updateUser = async (id: string, updatedFields: Partial<UserRowInput>): Promise<boolean> => {
    return update<Partial<UserRowInput>, UserRow>(USERS_TABLE, [id], updatedFields);
};

// DELETE

export const deleteUser = async (id: string): Promise<boolean> => {
    return del(USERS_TABLE, [id]);
};