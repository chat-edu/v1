import {findNotebooksByTeacherId} from "@/cosmosPostgres/services/notebooks";

import {TeacherIdParams} from "@/app/api/notebooks/teacher/[teacherId]/TeacherIdParams";

export const GET = async (req: Request, { params }: { params: TeacherIdParams }) => {
    return Response.json(await findNotebooksByTeacherId(params.teacherId));
}