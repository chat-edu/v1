import { add, del, find, update } from "@/cosmosPostgres/services/base";

import {TOPIC_EDGES_TABLE, TOPIC_NODES_TABLE, TOPIC_COMPLETIONS_TABLE} from "@/cosmosPostgres/constants/tables";

import {
    TopicNodeRow,
    TopicNodeWithNameAndCompletionRow,
    UserTopicNodeWithNameAndCompletionRow
} from "@/cosmosPostgres/types/topicNode";
import {TopicEdgeRow} from "@/cosmosPostgres/types/topicEdge";
import {TopicCompletionRow} from "@/cosmosPostgres/types/topicCompletion";
import {NotebookRow, UserRow} from "@/cosmosPostgres/types";

// CREATE

export const addTopicNode = async (topicNode: TopicNodeRow) => {
    return add<TopicNodeRow, TopicNodeRow>(TOPIC_NODES_TABLE, topicNode);
};

export const addTopicEdge = async (topicEdge: TopicEdgeRow) => {
    return add<TopicEdgeRow, TopicEdgeRow>(TOPIC_EDGES_TABLE, topicEdge);
}

export const addTopicCompletion = async (topicCompletion: TopicCompletionRow) => {
    return add<TopicCompletionRow, TopicCompletionRow>(TOPIC_COMPLETIONS_TABLE, topicCompletion);
}

// READ

export const findUserTopicNodesByNotebookId = async (
    userId: UserRow["id"],
    notebookId: NotebookRow["id"]
) => {
    const queryText = `
        SELECT
            tn.topic_id,
            tn.x,
            tn.y,
            tc.completion_percentage,
            t.name,
            tc.user_id
        FROM TopicNodes tn
        JOIN Topics t ON tn.topic_id = t.id
        JOIN TopicCompletions tc ON tn.topic_id = tc.topic_id
        WHERE t.notebook_id = $1 AND tc.user_id = $2;
    `;
    return find<UserTopicNodeWithNameAndCompletionRow>(queryText, [notebookId, userId]);
};

export const findTopicNodesByNotebookId = (notebookId: NotebookRow["id"]) => {
    const query = `
        SELECT 
            tn.topic_id,
            tn.x,
            tn.y,
            AVG(tc.completion_percentage) as completion_percentage,
            t.name
        FROM TopicNodes tn
        JOIN Topics t ON tn.topic_id = t.id
        JOIN TopicCompletions tc ON tn.topic_id = tc.topic_id
        WHERE t.notebook_id = $1
        GROUP BY t.notebook_id, tn.topic_id, t.name;
    `
    return find<TopicNodeWithNameAndCompletionRow>(query, [notebookId]);
}

export const findTopicEdgesByNotebookId = (notebookId: NotebookRow["id"]) => {
    const query = `
        SELECT
            te.source_topic_id,
            te.target_topic_id
        FROM TopicEdges te
        JOIN Topics t ON te.source_topic_id = t.id
        WHERE t.notebook_id = $1;
    `
    return find<TopicEdgeRow>(query, [notebookId]);
}

// UPDATE

export const updateUserTopicCompletion = async (
    userId: UserRow["id"],
    topicId: TopicNodeRow["topic_id"],
    completionPercentage: TopicCompletionRow["completion_percentage"]
) => {
    return update<TopicCompletionRow, TopicCompletionRow>(
        TOPIC_COMPLETIONS_TABLE,
        [userId, topicId],
        { completion_percentage: completionPercentage },
        ['user_id', 'topic_id']
    );
}

export const updateTopicNode = async (
    topicId: TopicNodeRow["topic_id"],
    position: Omit<TopicNodeRow, "topic_id">
) => {
    return update<TopicNodeRow, TopicNodeRow>(
        TOPIC_NODES_TABLE,
        [topicId],
        position,
        ['topic_id']
    );
}

// DELETE

export const deleteTopicEdge = async (
    source_topic_id: TopicEdgeRow["source_topic_id"],
    target_topic_id: TopicEdgeRow["target_topic_id"]
) => {
    return del(
        TOPIC_EDGES_TABLE,
        [source_topic_id, target_topic_id],
        ['source_topic_id', 'target_topic_id']
    );
}

export const deleteTopicNode = async (topicId: TopicNodeRow["topic_id"]) => {
    return del(TOPIC_NODES_TABLE, [topicId], ['topic_id']);
}