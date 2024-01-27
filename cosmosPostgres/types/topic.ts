import {NotebookRow} from "@/cosmosPostgres/types/notebook";

// used on the server side to create a new topic
export interface TopicRowInput {
    name: string;
    order_position: number;
    notebook_id: NotebookRow["id"];
    parent_topic_id?: TopicRow["id"];
}

// returned from the database when querying for a topic
export interface TopicRow extends TopicRowInput {
    id: number;
}