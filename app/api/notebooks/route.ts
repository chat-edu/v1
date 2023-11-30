import {findNotebooks} from "@/azure/cosmos/services/notebooks";

export const GET = async () => {
    return Response.json(await findNotebooks());
}