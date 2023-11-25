import useContainerData from "@/hooks/queries/utilities/useContainerData";

import {UserScore} from "@/types/User";

const useTopUsers = (limit?: number) => {
    const [userScores, loading, error] = useContainerData<UserScore>(`/api/users/top${limit ? `?limit=${limit}` : ""}`);

    return {
        userScores,
        loading,
        error,
    }
}

export default useTopUsers