import {UserRow, RankedUserRow, RankedUserTotalScoreRow, RankedUserCreatorScoreRow} from "@/azure/cosmos/types/user";

import {User, RankedUser, RankedUserTotalScore, RankedUserCreatorScore} from "@/types/User";

export const transformUser = (user: UserRow): User => ({
    id: user.id,
    name: user.name,
    email: user.email,
    username: user.username,
    profilePictureUrl: user.profile_picture_url || `https://api.multiavatar.com/${user.id}.png`,
    verified: user.verified
});

export const transformRankedUser = (user: RankedUserRow): RankedUser => ({
    ...transformUser(user),
    rank: parseInt(user.rank || '0'),
})

export const transformRankedUserTotalScore = (user: RankedUserTotalScoreRow): RankedUserTotalScore => ({
    ...transformRankedUser(user),
    totalScore: parseInt(user.total_score || '0'),
});

export const transformRankedUserCreatorScore = (user: RankedUserCreatorScoreRow): RankedUserCreatorScore => ({
    ...transformRankedUserTotalScore(user),
    numNotebooks: parseInt(user.num_notebooks || '0'),
});