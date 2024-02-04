import {UserIdParams} from "@/app/api/notebooks/enrolled/[userId]/UserIdParams";
import {findEnrolledNotebooksByUserId} from "@/cosmosPostgres/services/notebooks";

export const GET = async (req: Request, { params }: { params: UserIdParams}) => {
    return Response.json(await findEnrolledNotebooksByUserId(params.userId));
}