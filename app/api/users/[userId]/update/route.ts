import {updateUser} from "@/cosmos/services/user"

import {UserIdParams} from "@/app/api/users/[userId]/UserIdParams";
import {User} from "@/types/User";

export async function POST(request: Request, {params}: {params: UserIdParams}) {
    const body = await request.json();
    let updatedFields: Partial<User> = {};
    if (body.name) updatedFields.name = body.name;
    if (body.email) updatedFields.email = body.email;
    if(body.username) updatedFields.username = body.username;
    if(Object.keys(updatedFields).length === 0) return Response.json(true);
    return Response.json(await updateUser(params.userId, updatedFields));
}