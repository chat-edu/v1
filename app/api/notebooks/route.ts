import {findAllNotebooks} from "@/cosmosPostgres/services/notebooks";

export const GET = async () => {
    return Response.json(await findAllNotebooks());
}