import {createContext, FC, ReactNode, useContext, useState} from "react"

import useAuth from "@/hooks/useAuth";
import useUser from "@/hooks/queries/user/useUser";

import {UserRoles} from "@/types/User";
import {Model} from "@/types/Model";

interface ContextType {
    model: Model,
    setModel: (model: Model) => void;
}
export const ModelContext = createContext<ContextType>({
    model: Model.OPENAI,
    setModel: () => {}
});

export const useModel = () => useContext(ModelContext);

interface UserContextProps {
    children: ReactNode;
}

export const ModelProvider : FC<UserContextProps> = ({ children }) => {

    const [model, setModel] = useState<Model>(Model.OPENAI);


    return (
        <ModelContext.Provider
            value={{
                model,
                setModel
            }}
        >
            {children}
        </ModelContext.Provider>
    )
}