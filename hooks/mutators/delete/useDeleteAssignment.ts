import {useToast} from "@chakra-ui/react";

import { deleteAssignment as deleteAssignmentService } from "@/services/assignments";


import {Assignment} from "@/types/assignment/Assignment";

const useDeleteAssignment = (assignment: Assignment) => {

    const toast = useToast();

    const deleteAssignment = async () => {
        const success = await deleteAssignmentService(assignment.id, assignment.topicId);
        if(success) {
            toast({
                title: "Assignment Deleted",
                status: "success",
                duration: 5000,
                isClosable: true,
            });
        } else {
            toast({
                title: "Assignment Deletion Failed",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
    }

    return {
        deleteAssignment
    }
}

export default useDeleteAssignment;