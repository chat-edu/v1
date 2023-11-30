import React from 'react';

import UserLeaderboard from "@/components/UserLeaderboard";
import UserPoints from "@/components/Utilities/Points/UserPoints";

import useTopUsers from "@/hooks/queries/scores/users/useTopUsers";

interface Props {
    limit?: number
}

const UserScoreLeaderboard: React.FC<Props> = ({ limit }) => {

    const { userScores, loading } = useTopUsers(limit);

    return (
        <UserLeaderboard
            users={userScores}
            loading={loading}
            rightComponent={(userScore) => (
                <UserPoints
                    points={userScore.score}
                />
            )}
        />
    )
};

export default UserScoreLeaderboard;
