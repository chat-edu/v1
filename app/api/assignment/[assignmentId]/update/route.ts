import {AssignmentIdParams} from "@/app/api/assignment/[assignmentId]/AssignmentIdParams";
import {updateAssignment} from "@/cosmosPostgres/services/assignments";

export const PATCH = async (req: Request, {params}: {params: AssignmentIdParams}) => {
    const body = await req.json();
    const { name } = body;
    return Response.json(await updateAssignment(params.assignmentId, {name}));
}