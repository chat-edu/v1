import useContainerData from "@/hooks/queries/utilities/useContainerData";

import {transformSummary} from "@/hooks/queries/summaries/transformer";

import {Assignment} from "@/types/assignment/Assignment";

const useAssignmentSummaries = (assignmentId: Assignment["id"]) => {
    const [summaries, loading, error, fetchData] = useContainerData(
        `/api/summaries/assignment/${assignmentId}`,
        transformSummary
    );

    return {summaries, loading, error, fetchData};
}

export default useAssignmentSummaries;