import useContainerData from "@/hooks/queries/utilities/useContainerData";
import {transformRankedUserCreator} from "@/hooks/queries/scores/users/transformers";

const useCreatorsUsers = (limit?: number) => {
    const [creators, loading, error] = useContainerData(
        `/api/scores/creators${limit ? `?limit=${limit}` : ""}`,
        transformRankedUserCreator
    );

    return {
        creators,
        loading,
        error,
    }
}

export default useCreatorsUsers