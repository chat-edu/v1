import React from 'react';

import {IconButton} from "@chakra-ui/react";
import {SmallCloseIcon} from "@chakra-ui/icons";

import useSubject from "@/hooks/mutators/useSubject";

import {Subject} from "@/types/Subject";

interface Props {
    subject: Subject
}

const DeleteSubject: React.FC<Props> = ({ subject }) => {

    const { deleteSubject } = useSubject(subject)

    return (
        <IconButton
            aria-label={'Delete Subject'}
            icon={<SmallCloseIcon />}
            onClick={deleteSubject}
            colorScheme={'red'}
            variant={'ghost'}
        />
    );
};

export default DeleteSubject;
