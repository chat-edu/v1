import {IconType} from "react-icons";

export enum AuthProviders {
    TEACHER = "teacher",
    STUDENT = "student",
}

export interface AuthProviderButton {
    title: string,
    icon: IconType,
    provider: AuthProviders
}