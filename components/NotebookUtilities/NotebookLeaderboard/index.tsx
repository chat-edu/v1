import React from 'react';

import useNotebookLeaderboard from "@/hooks/queries/notebook/useNotebookLeaderboard";
import {Notebook} from "@/types/Notebook";
import {Skeleton, Text, VStack} from "@chakra-ui/react";
import NotebookLeaderboardRow from "@/components/NotebookUtilities/NotebookLeaderboard/NotebookLeaderboardRow";

interface Props {
    notebookId: Notebook["id"]
}

const NotebookLeaderboard: React.FC<Props> = ({ notebookId }) => {

    const { userScores, loading } = useNotebookLeaderboard(notebookId);

    return (
        <VStack
            w={'100%'}
            align={'start'}
        >
            <Text
                fontWeight={'bold'}
            >
                Leaderboard
            </Text>
            <VStack
                w={'100%'}
                align={'start'}
            >
                {
                    loading ? (
                        <Skeleton />
                    ) : (
                        userScores.length > 0 ? (
                            userScores.map((userScore, index) => (
                                <NotebookLeaderboardRow
                                    key={userScore.userId}
                                    userScore={userScore}
                                    rank={index + 1}
                                />
                            ))
                        ) : (
                            <Text>
                                No one has used this notebook yet
                            </Text>
                        )
                    )
                }
            </VStack>
        </VStack>
    );
};

export default NotebookLeaderboard;
