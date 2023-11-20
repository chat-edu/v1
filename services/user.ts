export const addUser = async (id: string) =>
    fetch(`/api/users/create`, {
        method: "POST",
        body: JSON.stringify({
            id,
            score: 0,
            isOnboarded: true,
        }),
    })

export const updateUserScore = async (userId: string, changeAmount: number) =>
    fetch(`/api/users/${userId}/update`, {
        method: "POST",
        body: JSON.stringify({
            changeAmount,
        })
    })
