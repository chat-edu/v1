import {findAllUsers} from "@/cosmos/services/user";

export const GET = async () => {
    return Response.json(await findAllUsers());
}