import React from 'react';

import UserLeaderboardRow from "@/components/Users/UserLeaderboardRow";
import Points from "@/components/Utilities/Points";

import {RankedUserNotebookScore} from "@/types/score";

interface Props {
    userScore: RankedUserNotebookScore
}

const UserScoreLeaderboardRow: React.FC<Props> = ({ userScore }) => {
    return (
        <UserLeaderboardRow
            userScore={userScore}
            rightComponent={
                <Points
                    points={userScore.score}
                />
            }
        />
    );
};

export default UserScoreLeaderboardRow;
