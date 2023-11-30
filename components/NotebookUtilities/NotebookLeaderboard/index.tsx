import React from 'react';

import {Text, VStack} from "@chakra-ui/react";

import NotebookLeaderboardRow from "@/components/NotebookUtilities/NotebookLeaderboard/NotebookLeaderboardRow";
import Loading from "@/components/Utilities/Loading";

import useNotebookLeaderboard from "@/hooks/queries/scores/users/useNotebookLeaderboard";

import {Notebook} from "@/types/Notebook";

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
                <Loading
                    loading={loading}
                    h={'50px'}
                >
                    {
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
                    }
                </Loading>
            </VStack>
        </VStack>
    );
};

export default NotebookLeaderboard;
