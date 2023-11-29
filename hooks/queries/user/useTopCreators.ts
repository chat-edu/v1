import useContainerData from "@/hooks/queries/utilities/useContainerData";

import {transformRankedUserCreatorScore} from "@/hooks/queries/user/transformers";

const useTopUsers = (limit?: number) => {
    const [userNotebookScores, loading, error] = useContainerData(
        `/api/users/top/creators${limit ? `?limit=${limit}` : ""}`,
        transformRankedUserCreatorScore
    );

    return {
        userNotebookScores,
        loading,
        error,
    }
}

export default useTopUsers