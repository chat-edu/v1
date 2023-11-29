import useContainerData from "@/hooks/queries/utilities/useContainerData";

import {UserNotebookScore} from "@/types/User";

const useUsedNotebooks = (userId: string) => {
    const [notebookScores, loading, error] = useContainerData<UserNotebookScore>(`/api/users/${userId}/scores`);

    return {
        notebookScores: notebookScores || [],
        loading,
        error,
    }
}

export default useUsedNotebooks;