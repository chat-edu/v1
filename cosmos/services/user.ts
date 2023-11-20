import { USERS_CONTAINER } from "@/cosmos/constants";
import {add, del, find, get, getContainer, replace} from "@/cosmos/services/base";
import {allUsersQuery} from "@/cosmos/queries";

import { User } from "@/types/User";

const partitionKey = undefined;

export const getUserContainer = async () => getContainer(USERS_CONTAINER, partitionKey);

// Find Users
export const findAllUsers = async (): Promise<User[]> =>
    find(await getUserContainer(), allUsersQuery);

// Add User
export const addUser = async (user: User): Promise<User> =>
    add(await getUserContainer(), user);

// Update User Score
export const updateUserScore = async (id: string, changeAmount: number): Promise<User> => {
    const user = await getUser(id);
    const updatedUser = { ...user, score: user.score + changeAmount };
    return replace(await getUserContainer(), id, updatedUser);
};

// Get User
export const getUser = async (id: string): Promise<User> =>
    get<User>(await getUserContainer(), id);

// Delete User
export const deleteUser = async (id: string) =>
    del(await getUserContainer(), id);
