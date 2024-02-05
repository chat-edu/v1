import useItemData from "@/hooks/queries/utilities/useItemData";

import {transformSummary} from "@/hooks/queries/summaries/transformer";

import {User} from "@/types/User";
import {Assignment} from "@/types/assignment/Assignment";

const useUserAssignmentSummary = (userId: User["id"], assignmentId: Assignment["id"]) => {
    const [summary, loading, error, fetchData] = useItemData(
        `/api/summaries/assignment/${assignmentId}/student/${userId}`,
        transformSummary
    );

    return {summary, loading, error, fetchData};
}

export default useUserAssignmentSummary;