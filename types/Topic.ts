import {Notebook} from "@/types/Notebook";
import {Note} from "@/types/Note";

export interface TopicInput {
    notebookId: Notebook["id"];
    name: string;
    orderPosition: number;
    parentTopicId?: number;
}

export interface Topic extends TopicInput {
    id: number;
}

export interface TopicHierarchy extends Topic {
    notes: Note[];
    subTopics: TopicHierarchy[];
}