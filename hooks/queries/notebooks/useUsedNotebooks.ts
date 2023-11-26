import useContainerData from "@/hooks/queries/utilities/useContainerData";

import {NotebookScore} from "@/types/Notebook";

const useUsedNotebooks = (userId: string) => {
    const [notebookScores, loading, error] = useContainerData<NotebookScore>(`/api/users/${userId}/scores`);

    return {
        notebookScores: notebookScores || [],
        loading,
        error,
    }
}

export default useUsedNotebooks;