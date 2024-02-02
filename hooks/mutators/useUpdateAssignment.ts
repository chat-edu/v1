import {useState} from "react";

import {updateAssignment as updateAssignmentService} from "@/services/assignments";

import {Assignment} from "@/types/assignment/Assignment";
import {useToast} from "@chakra-ui/react";

const useUpdateAssignment = (assignment: Assignment) => {

    const [name, setName] = useState(assignment.name);

    const toast = useToast();

    const updateAssignmentName = (val: string) => {
        setName(val);
    }

    const updateAssignment = async () => {
        const success = await updateAssignmentService(assignment.id, {
            name
        });
        if (success) {
            toast({
                title: "Assignment updated",
                status: "success",
                duration: 3000,
                isClosable: true
            });
        } else {
            toast({
                title: "Failed to update assignment",
                status: "error",
                duration: 3000,
                isClosable: true
            });
        }
        return success;
    }

    return {
        name,
        updateAssignmentName,
        updateAssignment
    }
}

export default useUpdateAssignment;