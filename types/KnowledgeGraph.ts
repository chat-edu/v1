import {Topic} from "@/types/Topic";
import {User} from "@/types/User";

export interface KnowledgeGraph {
    nodes: TopicNode[];
    edges: TopicEdge[];
}

export interface TopicNode {
    id: Topic["id"];
    name: Topic["name"];
    x: number;
    y: number;
    completionPercentage: number;
}

export interface UserTopicNode extends TopicNode {
    userId: User["id"];
}

export interface TopicEdge {
    sourceTopicId: Topic["id"];
    targetTopicId: Topic["id"];
}