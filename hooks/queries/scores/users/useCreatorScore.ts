import useItemData from "@/hooks/queries/utilities/useItemData";

import {transformRankedUserCreatorScore} from "@/hooks/queries/scores/users/transformers";

const useCreatorScore = (creatorId: string) => {
    const [creatorScore, loading, error] = useItemData(
        `/api/scores/creators/${creatorId}`,
        transformRankedUserCreatorScore
    );

    return {
        creatorScore,
        loading,
        error,
    }
}

export default useCreatorScore;