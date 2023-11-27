import {User} from "@/types/User";

// CREATE

export const addUser = async (user: User): Promise<User | null> =>
    fetch(`/api/users/create`, {
        method: "POST",
        body: JSON.stringify(user),
    })
        .then((res) => res.json())
        .catch(null)
