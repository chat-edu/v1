import useContainerData from "@/hooks/queries/utilities/useContainerData";

import {transformSummary} from "@/hooks/queries/summaries/transformer";

import {User} from "@/types/User";

const useUserSummaries = (userId: User["id"]) => {
    const [summaries, loading, error, fetchData] = useContainerData(
        `/api/summaries/user/${userId}`,
        transformSummary
    );

    return {summaries, loading, error, fetchData};
}

export default useUserSummaries;