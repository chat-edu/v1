import {User, UserInput} from "@/types/User";

// CREATE

export const addUser = async (user: UserInput): Promise<User | null> =>
    fetch(`/api/users/create`, {
        method: "POST",
        body: JSON.stringify(user),
    })
        .then((res) => res.json())
        .catch(null)
