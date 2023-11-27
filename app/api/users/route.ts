import {findAllUsers} from "@/azure/cosmos/services/user";

export const GET = async () => {
    return Response.json(await findAllUsers());
}