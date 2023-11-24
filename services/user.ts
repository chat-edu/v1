import {User} from "@/types/User";

export const addUser = async (user: User) =>
    fetch(`/api/users/create`, {
        method: "POST",
        body: JSON.stringify(user),
    })
        .then(async (res) => (await res.json()) as boolean)
        .then((res) => res);

export const updateUserScore = async (userId: string, changeAmount: number) =>
    fetch(`/api/users/${userId}/update`, {
        method: "POST",
        body: JSON.stringify({
            changeAmount,
        })
    })
        .then(async (res) => (await res.json()) as boolean)
        .then((res) => res);
