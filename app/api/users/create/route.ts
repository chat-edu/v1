import {addUser} from "@/cosmosPostgres/services/user";

import {UserRow} from "@/cosmosPostgres/types/user";

export async function POST(request: Request) {
    const userRow = await request.json() as UserRow;

    if(!userRow.name || !userRow.email || !userRow.username || !userRow.id || !userRow.profile_picture_url)
        return Response.json(null);

    return Response.json(await addUser(userRow));
}