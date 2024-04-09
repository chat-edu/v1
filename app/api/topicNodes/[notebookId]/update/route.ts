import {updateTopicNode} from "@/cosmosPostgres/services/knowledgeGraph";

export const PATCH = async (req: Request) => {
    const body = await req.json();

    if(!body.topicId || !body.x || !body.y) {
        return Response.json({error: "topicId, x, and y are required"}, {status: 400})
    }

    return Response.json(await updateTopicNode(body.topicId,{
        x: body.x,
        y: body.y
    }));
}