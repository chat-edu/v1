import {findNotebooks} from "@/cosmosPostgres/services/notebooks";

export const GET = async () => {
    return Response.json(await findNotebooks());
}