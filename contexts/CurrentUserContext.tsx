import {createContext, FC, ReactNode, useContext} from "react"

import useAuth from "@/hooks/useAuth";
import useUser from "@/hooks/queries/user/useUser";

import {User, UserRoles} from "@/types/User";

interface ContextType {
    user: User | null | undefined;
    isTeacher: boolean;
    loading: boolean;
}
export const UserContext = createContext<ContextType>({
    user: null,
    isTeacher: false,
    loading: true
});

export const useCurrentUser = () => useContext(UserContext);

interface UserContextProps {
    children: ReactNode;
}

export const CurrentUserProvider : FC<UserContextProps> = ({ children }) => {

    const { user } = useAuth();

    const { userData, loading } = useUser(user?.id || '');


    return (

        <UserContext.Provider
            value={{
                user: userData,
                isTeacher: userData?.role === UserRoles.TEACHER,
                loading
            }}
        >
            {children}
        </UserContext.Provider>
    )
}