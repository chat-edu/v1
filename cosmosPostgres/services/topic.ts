import { add, del, find, get, update } from "@/cosmosPostgres/services/base";

import { TOPICS_TABLE } from "@/cosmosPostgres/constants/tables";

import { TopicRow, TopicRowInput } from "@/cosmosPostgres/types/topic";

// CREATE

export const addTopic = async (topic: TopicRowInput) => {
    return add<TopicRowInput, TopicRow>(TOPICS_TABLE, topic);
};

// READ

export const getTopic = async (id: number): Promise<TopicRow | null> => {
    const query = 'SELECT * FROM Topics WHERE id = $1;';
    return get(query, [id]);
};

// Find Topics by Notebook ID
export const findTopicsByNotebookId = async (notebookId: number): Promise<TopicRow[]> => {
    const queryText = 'SELECT * FROM Topics WHERE notebook_id = $1;';
    return find<TopicRow>(queryText, [notebookId]);
};

// UPDATE

export const updateTopic = async (id: number, updatedFields: Partial<TopicRowInput>): Promise<boolean> => {
    return update<Partial<TopicRowInput>, TopicRow>(TOPICS_TABLE, [id], updatedFields);
};

// DELETE

export const deleteTopic = async (id: number) => {
    return del(TOPICS_TABLE, [id]);
};