import {findAllNotebooks} from "@/cosmos/services/notebooks";

export const GET = async () => {
    return Response.json(await findAllNotebooks());
}