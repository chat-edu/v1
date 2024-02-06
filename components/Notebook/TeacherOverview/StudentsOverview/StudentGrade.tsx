import React, {useMemo} from 'react';

import useUserSubmissions from "@/hooks/queries/submissions/useUserSubmissions";
import {User} from "@/types/User";
import {Notebook} from "@/types/Notebook";
import {Skeleton, Text} from "@chakra-ui/react";

interface Props {
    userId: User["id"],
    notebookId: Notebook["id"]
}

const StudentGrade: React.FC<Props> = ({ userId, notebookId }) => {

    const { loading, userSubmissions } = useUserSubmissions(userId, notebookId);

    const overallGrade = useMemo(() => {
        let total = 0;
        let count = 0;

        userSubmissions.forEach(userSubmission => userSubmission.submissions.forEach(submission => {
            total += submission.points !== null ? submission.points : 0;
            count++;
        }));

        if(count === 0) return 0;

        return total / count * 100;
    }, [userSubmissions]);

    if(loading) {
        return (
            <Skeleton
                w={'100px'}
                h={'20px'}
            />
        );
    }

    const gradeColor = overallGrade >= 85 ? 'brand.500' : overallGrade >= 70 ? 'yellow.500' : 'red.500';

    return (
        <Text
            fontSize={'lg'}
            fontWeight={'bold'}
            color={gradeColor}
        >
            {overallGrade.toFixed(2)}%
        </Text>
    );
};

export default StudentGrade;
