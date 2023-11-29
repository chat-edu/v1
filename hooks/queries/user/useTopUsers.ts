import useContainerData from "@/hooks/queries/utilities/useContainerData";

import {transformRankedUserTotalScore} from "@/hooks/queries/user/transformers";

const useTopUsers = (limit?: number) => {
    const [userScores, loading, error] = useContainerData(
        `/api/users/top/scorers${limit ? `?limit=${limit}` : ""}`,
        transformRankedUserTotalScore
    );

    return {
        userScores,
        loading,
        error,
    }
}

export default useTopUsers