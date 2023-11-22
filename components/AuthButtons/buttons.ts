import {AuthProviderButton, AuthProviders} from "@/types/AuthProviderButton";

const authProviderButtons: AuthProviderButton[] = [
    {
        title: "Sign in with Microsoft",
        imageSrc: "/icons/microsoft.png",
        provider: AuthProviders.MICROSOFT
    },
    {
        title: "Sign in with Google",
        imageSrc: "/icons/google.png",
        provider: AuthProviders.GOOGLE
    }
]

export default authProviderButtons;