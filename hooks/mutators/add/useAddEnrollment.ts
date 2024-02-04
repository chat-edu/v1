import {useState} from "react";

import useAuth from "@/hooks/useAuth";

import {addEnrollment} from "@/services/enrollments";
import {useToast} from "@chakra-ui/react";

const useAddEnrollment = () => {

    const toast = useToast();

    const { user } = useAuth();

    const [accessCode, setAccessCode] = useState<string>("");
    const [accessCodeTouched, setAccessCodeTouched] = useState<boolean>(false);

    const updateAccessCode = (val: string) => {
        if(val.length > 6) return;
        setAccessCode(val);
    }

    const updateAccessCodeTouched = () => {
        setAccessCodeTouched(true);
    }

    const enroll = async () => {
        if(!user) return;
        const enrollmentRow = await addEnrollment({ userId: user.id, accessCode });
        if(enrollmentRow) {
            toast({
                title: "Enrolled",
                description: `You have enrolled in a class.`,
                status: "success",
                duration: 5000,
                isClosable: true,
            });
        } else {
            toast({
                title: "Enrollment Failed",
                description: `Failed to enroll in a class.`,
                status: "error",
                duration: 5000,
                isClosable: true,
            });

        }
    }

    return {
        accessCode,
        accessCodeTouched,
        updateAccessCode,
        updateAccessCodeTouched,
        enroll
    }
}

export default useAddEnrollment;