export enum AuthProviders {
    GOOGLE = "google",
    MICROSOFT = "azure-ad",
}

export interface AuthProviderButton {
    title: string,
    imageSrc: string,
    provider: AuthProviders
}