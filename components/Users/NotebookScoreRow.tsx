import React from 'react';

import UserLeaderboardRow from "@/components/Users/UserLeaderboardRow";

import {RankedUserNotebookScore} from "@/types/User";
import Points from "@/components/Utilities/Points";

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
