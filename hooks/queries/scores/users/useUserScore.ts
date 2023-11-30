import useItemData from "@/hooks/queries/utilities/useItemData";

import {transformRankedUserCreatorScore} from "@/hooks/queries/scores/users/transformers";

const useUserScore = (userId: string) => {
    const [userScore, loading, error] = useItemData(
        `/api/scores/users/user/${userId}`,
        transformRankedUserCreatorScore
    );

    return {
        userScore,
        loading,
        error,
    }
}

export default useUserScore;