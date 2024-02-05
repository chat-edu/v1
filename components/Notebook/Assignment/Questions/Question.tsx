import React, {useState} from 'react';

import {Button, Flex} from "@chakra-ui/react";
import useAuth from "@/hooks/useAuth";
import useUser from "@/hooks/queries/user/useUser";


interface EditComponentProps {
    changeMode: () => void
}

interface Props {
    viewComponent: React.FC,
    editComponent: React.FC<EditComponentProps>,
    onConfirm?: () => Promise<void>,
}

enum Modes {
    VIEW,
    EDIT
}

const Question: React.FC<Props> = ({ viewComponent, editComponent, onConfirm }) => {

    const { user } = useAuth();
    const { isTeacher } = useUser(user?.id || '')

    const [isHovering, setIsHovering] = useState<boolean>(false)
    const [mode, setMode] = useState<Modes>(Modes.VIEW)

    return (
        <Flex
            w={'100%'}
            direction={'column'}
            gap={4}
            borderWidth={1}
            rounded={'md'}
            p={4}
            position={'relative'}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            {
                !onConfirm && (
                    <Flex
                        position={'absolute'}
                        top={4}
                        right={4}
                        display={isHovering ? 'flex' : 'none'}
                        zIndex={1}
                    >
                        {
                            isTeacher && (
                                <Button
                                    size={'sm'}
                                    onClick={() => setMode(mode === Modes.VIEW ? Modes.EDIT : Modes.VIEW)}
                                >
                                    {mode === Modes.VIEW ? 'Edit' : 'Cancel'}
                                </Button>
                            )
                        }
                    </Flex>
                )
            }
            {
                mode === Modes.VIEW
                    ? viewComponent({})
                    : editComponent({ changeMode: () => setMode(Modes.VIEW) })
            }
            {
                onConfirm && (
                    <Button
                        size={'sm'}
                        onClick={onConfirm}
                        variant={'outline'}
                        colorScheme={'brand'}
                    >
                        Confirm
                    </Button>
                )
            }
        </Flex>
    );
};

export default Question;
