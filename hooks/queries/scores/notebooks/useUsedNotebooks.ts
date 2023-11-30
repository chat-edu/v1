import useContainerData from "@/hooks/queries/utilities/useContainerData";

import {transformNotebookScore} from "@/hooks/queries/scores/notebooks/transformers";

const useUsedNotebooks = (userId: string) => {
    const [notebookScores, loading, error] = useContainerData(
        `/api/scores/notebooks/user/${userId}`,
        transformNotebookScore
    );

    return {
        notebookScores: notebookScores || [],
        loading,
        error,
    }
}

export default useUsedNotebooks;