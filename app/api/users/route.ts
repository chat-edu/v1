import {findAllUsers} from "@/cosmosPostgres/services/user";

export const GET = async () => {
    return Response.json(await findAllUsers());
}