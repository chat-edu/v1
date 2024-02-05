import React, {useState} from 'react';

import {Button, Heading, HStack} from "@chakra-ui/react";

import TextInput from "@/components/Utilities/FormUtilities/TextInput";

import useUpdateAssignment from "@/hooks/mutators/update/useUpdateAssignment";

import {Assignment} from "@/types/assignment/Assignment";

interface Props {
    assignment: Assignment;
    isTeacher: boolean;
}

enum Modes {
    VIEW,
    EDIT
}

const AssignmentHeader: React.FC<Props> = ({ assignment, isTeacher}) => {

    const [mode, setMode] = useState<Modes>(Modes.VIEW);

    const { name, updateAssignmentName, updateAssignment } = useUpdateAssignment(assignment);

    const onSave = async () => {
        const success = await updateAssignment();
        if(success) {
            setMode(Modes.VIEW);
        }
    }

    return (
        <HStack
            w={'100%'}
            justifyContent={'space-between'}
            alignItems={mode === Modes.EDIT ? 'flex-end' : 'center'}
        >
            {
                mode === Modes.EDIT ? (
                    <TextInput
                        label={"Assignment Name"}
                        placeholder={"Assignment Name"}
                        value={name}
                        onChange={updateAssignmentName}
                    />
                ) : (
                    <Heading>
                        {assignment.name}
                    </Heading>
                )
            }
            {
                isTeacher && (
                    mode === Modes.VIEW ? (
                        <Button
                            onClick={() => setMode(Modes.EDIT)}
                        >
                            Edit
                        </Button>
                    ) : (
                        <HStack>
                            <Button
                                onClick={onSave}
                            >
                                Save
                            </Button>
                            <Button
                                onClick={() => setMode(Modes.VIEW)}
                            >
                                Cancel
                            </Button>
                        </HStack>
                    )
                )
            }
        </HStack>
    );
};

export default AssignmentHeader;
