import React from 'react';

import {VStack, Text} from "@chakra-ui/react";

import UserLeaderboard from "@/components/UserLeaderboard";
import NotebookPoints from "@/components/Utilities/Points/NotebookPoints";

import useTopCreators from "@/hooks/queries/scores/users/useTopCreators";

interface Props {
    limit?: number
}


const CreatorLeaderboard: React.FC<Props> = ({ limit = 10 }) => {

    const { creators, loading } = useTopCreators(limit);

    return (
        <UserLeaderboard
            users={creators}
            loading={loading}
            rightComponent={(creator) => (
                <VStack
                    align={'end'}
                >
                    <NotebookPoints
                        points={creator.score}
                    />
                    <Text>
                        {creator.numNotebooks} notebook{creator.numNotebooks === 1 ? '' : 's'}
                    </Text>
                </VStack>
            )}
        />
    );
};

export default CreatorLeaderboard;
