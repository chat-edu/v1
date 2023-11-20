export const addUser = async (id: string) =>
    fetch(`/api/users/create`, {
        method: "POST",
        body: JSON.stringify({
            id,
            score: 0,
            isOnboarded: true,
        }),
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
