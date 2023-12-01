import {User, UserInput} from "@/types/User";
import {UserRowInput} from "@/cosmosPostgres/types/user";

// CREATE

export const addUser = async (user: UserInput): Promise<User | null> =>
    fetch(`/api/users/create`, {
        method: "POST",
        body: JSON.stringify(transformUserInput(user)),
    })
        .then((res) => res.json())
        .catch(null)

const transformUserInput = (user: UserInput): UserRowInput => ({
    id: user.id,
    name: user.name,
    email: user.email,
    username: user.username,
    profile_picture_url: user.profilePictureUrl,
})