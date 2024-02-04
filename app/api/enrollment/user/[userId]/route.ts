import {findEnrollmentsByUserId} from "@/cosmosPostgres/services/enrollments";
import {UserIdParams} from "@/app/api/enrollment/user/[userId]/UserIdParams";

export const GET = async (req: Request, { params }: {params: UserIdParams}) => {
    return Response.json(await findEnrollmentsByUserId(params.userId));
}