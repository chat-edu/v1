import useContainerData from "@/hooks/queries/utilities/useContainerData";

import {UserScore} from "@/types/User";

const useTopUsers = () => {
    const [userScores, loading, error] = useContainerData<UserScore>('/api/users/top');

    return {
        userScores,
        loading,
        error,
    }
}

export default useTopUsers