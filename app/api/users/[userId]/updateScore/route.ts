import {updateUserScore} from "@/cosmos/services/user"

import {UserIdParams} from "@/app/api/users/[userId]/UserIdParams";

export async function POST(request: Request, {params}: {params: UserIdParams}) {
    const { changeAmount } = await request.json();
    return Response.json(await updateUserScore(params.userId, changeAmount));
}