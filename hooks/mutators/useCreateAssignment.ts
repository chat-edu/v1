import {Topic} from "@/types/Topic";
import {addAssignment} from "@/services/assignments";
import {useState} from "react";
import {useToast} from "@chakra-ui/react";

const useCreateAssignment = (topicId: Topic["id"]) => {

    const toast = useToast();

    const [assignmentName, setAssignmentName] = useState<string>("");
    const [assignmentNameTouched, setAssignmentNameTouched] = useState<boolean>(false);

    const updateAssignmentName = (newName: string) => {
        setAssignmentName(newName);
    }

    const updateAssignmentNameTouched = (touched: boolean) => {
        setAssignmentNameTouched(touched);
    }

    const createAssignment = async () => {
        const assignment = await addAssignment({
            name: "New Assignment",
            topicId,
        });
        if(assignment) {
            toast({
                title: "Assignment created",
                status: "success",
                duration: 3000,
                isClosable: true,
            })
        } else {
            toast({
                title: "Assignment creation failed",
                status: "error",
                duration: 3000,
                isClosable: true,
            })
        }
    }

    return {
        assignmentName,
        assignmentNameTouched,
        updateAssignmentName,
        updateAssignmentNameTouched,
        createAssignment
    }
}

export default useCreateAssignment;