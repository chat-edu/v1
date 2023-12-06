import {updateNotebook} from "@/cosmosPostgres/services/notebooks";

import {NotebookIdParams} from "@/app/api/notebooks/[notebookId]/NotebookIdParams";

import {NotebookRowInput} from "@/cosmosPostgres/types";

export const PATCH = async (request: Request, {params}: {params: NotebookIdParams}) => {
    const body = await request.json();

    if(!body) Response.json({error: "No body provided"});

    const updatedFields: Partial<NotebookRowInput> = {};
    if(body.name) updatedFields.name = body.name;
    if(Object.keys(updatedFields).length === 0) Response.json({error: "No fields provided"});

    return Response.json(await updateNotebook(params.notebookId, updatedFields));
}