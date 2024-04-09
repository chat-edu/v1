import {addTopicEdge} from "@/cosmosPostgres/services/knowledgeGraph";

export const POST = async (req: Request) => {
    const body = await req.json();

    if(!body.source_topic_id || !body.target_topic_id) {
        return Response.json({ error: "source_topic_id and target_topic_id are required" }, { status: 400 })
    }

    return Response.json(await addTopicEdge({
        source_topic_id: body.source_topic_id,
        target_topic_id: body.target_topic_id
    }));
}