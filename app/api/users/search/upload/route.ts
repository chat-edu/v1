import {NextRequest} from "next/server";

import {uploadUserRows} from "@/search/users/upload";
import {UserIndexRow} from "@/search/types/UserIndex";

export const POST = async (req: NextRequest) => {
    const { users } = await req.json();
    await uploadUserRows(users.map((user: UserIndexRow) => ({
        id: user.id,
        profile_picture_url: user.profile_picture_url,
        name: user.name,
        username: user.username
    })))
    return Response.json({ message: 'success'})
}