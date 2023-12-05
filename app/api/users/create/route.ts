import {addUser} from "@/cosmosPostgres/services/user";

import {UserRow} from "@/cosmosPostgres/types/user";
import {uploadUserRows} from "@/search/users/upload";

export async function POST(request: Request) {
    const userRow = await request.json() as UserRow;

    if(!userRow.name || !userRow.email || !userRow.username || !userRow.id || !userRow.profile_picture_url)
        return Response.json(null);

    const user = await addUser(userRow);
    if(!user) return Response.json(null);

    await uploadUserRows([{
        id: user.id,
        name: user.name,
        username: user.username,
        profile_picture_url: user.profile_picture_url
    }])
    return Response.json(user);
}