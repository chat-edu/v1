import {addUser} from "@/cosmos/services/user";

import {User} from "@/types/User";

export async function POST(request: Request) {
    const user = await request.json() as User;
    return Response.json(await addUser({
        name: user.name,
        email: user.email,
        username: user.username,
        id: user.id,
        profile_picture_url: user.profilePictureUrl,
    }));
}