import {TopicRowInput} from "@/cosmosPostgres/types/topic";
import {Topic, TopicInput, TopicHierarchy} from "@/types/Topic";
import {Note} from "@/types/Note";
import {emitTopicsChangedEvent} from "@/cosmosPostgres/eventEmitters/topicsEventEmitter";

export const generateHierarchy = (topics: Topic[], notes: Note[], rootId: Topic["id"] | null): TopicHierarchy[] => {
    const rootTopics = topics.filter((topic) => topic.parentTopicId === rootId);
    return rootTopics.map((topic) => ({
        ...topic,
        notes: notes.filter((note) => note.topicId === topic.id),
        subTopics: generateHierarchy(
            topics.filter((subTopic) => subTopic.parentTopicId === topic.id),
            notes,
            topic.id
        ),
    }));
}

// CREATE

export const addTopic = async (topic: TopicInput): Promise<Topic | null> =>
    fetch(`/api/topics/add`, {
        method: "POST",
        body: JSON.stringify(transformTopicInput(topic)),
    })
        .then(async (res) => {
            const topicRes = await res.json();
            if (topicRes) {
                emitTopicsChangedEvent(topic.notebookId)
            }
            return topicRes;
        })
        .catch(null)

// DELETE

export const deleteTopic = async (id: number): Promise<void> =>
    fetch(`/api/topics/${id}/delete`, {
        method: "DELETE",
    })
        .then((res) => res.json())
        .catch(null)

// UPDATE

export const updateTopic = async (id: number, updatedFields: Partial<TopicInput>): Promise<Topic | null> =>
    fetch(`/api/topics/${id}/update`, {
        method: "PUT",
        body: JSON.stringify(transformPartialTopicInput(updatedFields)),
    })
        .then((res) => res.json())
        .catch(null)

const transformTopicInput = (topic: TopicInput): TopicRowInput => ({
    name: topic.name,
    notebook_id: topic.notebookId,
    parent_topic_id: topic.parentTopicId,
    order_position: topic.orderPosition,
})

const transformPartialTopicInput = (topic: Partial<TopicInput>): Partial<TopicRowInput> => ({
    name: topic.name,
    notebook_id: topic.notebookId,
    parent_topic_id: topic.parentTopicId,
    order_position: topic.orderPosition,
});