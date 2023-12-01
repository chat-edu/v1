import {useState} from "react";
import {getTopics} from "@/services/topics";

const useGenerateTopics = (text: string) => {

    const [generatedTopicsLoading, setGeneratedTopicsLoading] = useState<boolean>(false);
    const [generatedTopics, setGeneratedTopics] = useState<string[]>([]);

    const [selectedTopics, setSelectedTopics] = useState<string[]>([]);

    const generateTopics = async () => {
        setGeneratedTopicsLoading(true);
        setGeneratedTopics(await getTopics(text));
        setGeneratedTopicsLoading(false);
    }

    const resetGeneratedTopics = () => {
        setGeneratedTopics([]);
        setSelectedTopics([])
    }

    const selectTopic = (topic: string) => {
        setSelectedTopics([...selectedTopics, topic]);
    }

    const unselectTopic = (topic: string) => {
        setSelectedTopics(selectedTopics.filter(t => t !== topic));
    }

    return {
        generatedTopicsLoading,
        generatedTopics,
        selectedTopics,
        generateTopics,
        resetGeneratedTopics,
        selectTopic,
        unselectTopic,
    }
}

export default useGenerateTopics;