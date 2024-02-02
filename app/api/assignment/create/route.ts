import {addAssignment} from "@/cosmosPostgres/services/assignments";

export const POST = async (req: Request) => {
    const body = await req.json();

    const { name, topic_id } = body;
    if(!name) return Response.json({message: "Missing name"});
    if(!topic_id) return Response.json({message: "Missing topic_id"});

    const topicRow = await addAssignment({name, topic_id});

    return Response.json(topicRow);
}