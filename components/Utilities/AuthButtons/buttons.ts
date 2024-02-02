import {AuthProviderButton, AuthProviders} from "@/types/AuthProviderButton";
import {FaChalkboardTeacher} from "react-icons/fa";
import {PiStudentBold} from "react-icons/pi";

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
        icon: FaChalkboardTeacher,
        provider: AuthProviders.TEACHER
    },
    {
        title: "Demo as Student",
        icon: PiStudentBold,
        provider: AuthProviders.STUDENT
    }
]

export default authProviderButtons;