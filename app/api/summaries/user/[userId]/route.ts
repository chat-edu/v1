import {findSummariesByUserId} from "@/cosmosPostgres/services/summaries";
import {UserIdParams} from "@/app/api/summaries/user/[userId]/UserIdParams";

export const GET = async (req: Request, { params }: { params: UserIdParams }) => {
    return Response.json(await findSummariesByUserId(params.userId));
}