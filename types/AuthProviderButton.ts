export enum AuthProviders {
    GOOGLE = "google",
    MICROSOFT = "azure-ad",
    TEACHER = "teacher",
    STUDENT = "student",
}

export interface AuthProviderButton {
    title: string,
    imageSrc: string,
    provider: AuthProviders
}