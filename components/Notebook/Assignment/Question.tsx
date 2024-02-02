import React, {useState} from 'react';

import {Button, Flex} from "@chakra-ui/react";


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
                            mode === Modes.VIEW ? (
                                <Button
                                    onClick={() => setMode(Modes.EDIT)}
                                    size={'sm'}
                                >
                                    Edit
                                </Button>
                            ) : (
                                <Button
                                    size={'sm'}
                                    onClick={() => setMode(Modes.VIEW)}
                                >
                                    Cancel
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
