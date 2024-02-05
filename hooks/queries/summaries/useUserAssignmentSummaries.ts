import useContainerData from "@/hooks/queries/utilities/useContainerData";

import {transformUserAssignmentSummary} from "@/hooks/queries/summaries/transformer";

import {Assignment} from "@/types/assignment/Assignment";

const useUserAssignmentSummaries = (assignmentId: Assignment["id"]) => {
    const [summaries, loading, error, fetchData] = useContainerData(
        `/api/summaries/assignment/${assignmentId}/user`,
        transformUserAssignmentSummary
    );

    return {summaries, loading, error, fetchData};
}

export default useUserAssignmentSummaries;