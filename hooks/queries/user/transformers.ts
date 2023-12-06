import {UserRow,} from "@/cosmosPostgres/types/user";
import {User} from "@/types/User";

export const transformUser = (user: UserRow): User => ({
    id: user.id,
    name: user.name,
    email: user.email,
    username: user.username,
    profilePictureUrl: user.profile_picture_url || `https://api.multiavatar.com/${user.id}.png`,
    verified: user.verified,
    isOnboarded: user.is_onboarded
});