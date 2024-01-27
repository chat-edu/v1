import {AuthProviderButton, AuthProviders} from "@/types/AuthProviderButton";

const authProviderButtons: AuthProviderButton[] = [
    // {
    //     title: "Sign in with Microsoft",
    //     imageSrc: "/icons/microsoft.png",
    //     provider: AuthProviders.MICROSOFT
    // },
    // {
    //     title: "Sign in with Google",
    //     imageSrc: "/icons/google.png",
    //     provider: AuthProviders.GOOGLE
    // },
    {
        title: "Demo as Teacher",
        imageSrc: "/icons/google.png",
        provider: AuthProviders.TEACHER
    },
    {
        title: "Demo as Student",
        imageSrc: "/icons/microsoft.png",
        provider: AuthProviders.STUDENT
    }
]

export default authProviderButtons;