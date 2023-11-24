import {add, del, find, get, update} from "@/cosmosPostgres/services/base";

import {USERS_TABLE} from "@/cosmosPostgres/constants/tables";

import {User} from "@/types/User";

export const findAllUsers = async (): Promise<User[]> => {
    return find('SELECT * FROM Users;', [], transform);
};

export const addUser = async (user: User): Promise<boolean> => {
    return add(USERS_TABLE, user);
};

export const updateUser = async (id: string, updatedFields: Partial<User>): Promise<boolean> => {
    return update(USERS_TABLE, id, updatedFields);
};

export const getUser = async (id: string): Promise<User | null> => {
    return get(USERS_TABLE, id, transform);
};

export const deleteUser = async (id: string): Promise<boolean> => {
    return del(USERS_TABLE, id);
};

const transform = (row: User): User => row;