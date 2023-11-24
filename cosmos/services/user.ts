import {add, del, find, get, update} from "@/cosmos/services/base";

import {USERS_TABLE} from "@/cosmos/constants/tables";

import {User} from "@/types/User";

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

const transform = (row: User): User => row;