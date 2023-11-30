import useContainerData from "@/hooks/queries/utilities/useContainerData";
import {transformRankedUserCreatorScore} from "@/hooks/queries/scores/users/transformers";

const useCreatorsUsers = (limit?: number) => {
    const [creators, loading, error] = useContainerData(
        `/api/scores/creators${limit ? `?limit=${limit}` : ""}`,
        transformRankedUserCreatorScore
    );

    return {
        creators,
        loading,
        error,
    }
}

export default useCreatorsUsers