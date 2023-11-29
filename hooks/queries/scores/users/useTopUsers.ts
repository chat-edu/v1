import useContainerData from "@/hooks/queries/utilities/useContainerData";
import {transformRankedUserNotebook} from "@/hooks/queries/scores/users/transformers";


const useTopUsers = (limit?: number) => {
    const [userScores, loading, error] = useContainerData(
        `/api/scores/users${limit ? `?limit=${limit}` : ""}`,
        transformRankedUserNotebook
    );

    return {
        userScores,
        loading,
        error,
    }
}

export default useTopUsers