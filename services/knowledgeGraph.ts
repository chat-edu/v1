import {Topic} from "@/types/Topic";

export const addTopicEdge = async (sourceTopicId: Topic["id"], targetTopicId: Topic["id"]) => {
    const res = await fetch(`/api/topicEdges/${sourceTopicId}/add`, {
        method: "POST",
        body: JSON.stringify({
            source_topic_id: sourceTopicId,
            target_topic_id: targetTopicId
        }),
        headers: {
            "Content-Type": "application/json"
        }
    });

    return await res.json();
}

export const deleteTopicEdge = async (sourceTopicId: Topic["id"], targetTopicId: Topic["id"]) => {
    const res = await fetch(`/api/topicEdges/${sourceTopicId}/delete`, {
        method: "DELETE",
        body: JSON.stringify({
            source_topic_id: sourceTopicId,
            target_topic_id: targetTopicId
        }),
        headers: {
            "Content-Type": "application/json"
        }
    });

    return await res.json();
}

export const addTopicNode = async (topicId: Topic["id"], x: number, y: number) => {
    const res = await fetch(`/api/topicNodes/${topicId}/add`, {
        method: "POST",
        body: JSON.stringify({
            topicId,
            x,
            y
        }),
        headers: {
            "Content-Type": "application/json"
        }
    });

    return await res.json();

}

export const updateTopicNode = async (topicId: Topic["id"], x: number, y: number) => {
    const res = await fetch(`/api/topicNodes/${topicId}/update`, {
        method: "PATCH",
        body: JSON.stringify({
            topicId,
            x: Math.round(x),
            y: Math.round(y)
        }),
        headers: {
            "Content-Type": "application/json"
        }
    });

    return await res.json();
}