import {updateUser} from "@/cosmosPostgres/services/user"

import {UserIdParams} from "@/app/api/users/[userId]/UserIdParams";

import {UserRowInput} from "@/cosmosPostgres/types/user";

export const PATCH = async (request: Request, {params}: {params: UserIdParams}) => {
    const body = await request.json();

    let updatedFields: Partial<UserRowInput> = {};
    if (body.name) updatedFields.name = body.name;
    if (body.email) updatedFields.email = body.email;
    if (body.username) updatedFields.username = body.username;
    if (body.profile_picture_url) updatedFields.profile_picture_url = body.profile_picture_url;

    if(Object.keys(updatedFields).length === 0) return Response.json(true);

    const updatedUser = await updateUser(params.userId, updatedFields);

    return Response.json(updatedUser);
}