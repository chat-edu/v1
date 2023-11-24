import {addUser} from "@/cosmosPostgres/services/user";

import {User} from "@/types/User";

export async function POST(request: Request) {
    const user = await request.json() as User;
    return Response.json(await addUser(user));
}