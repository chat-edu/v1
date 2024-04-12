import {addTopicNode} from "@/cosmosPostgres/services/knowledgeGraph";

export const POST = async (req: Request) => {
    const body = await req.json();

    if(!body.topicId) {
        return Response.json({error: "topicId is required"}, {status: 400})
    }

    return Response.json(addTopicNode({
        topic_id: body.topicId,
        x: body.x,
        y: body.y
    }));
}