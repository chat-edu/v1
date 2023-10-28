import React from 'react';

import {Button} from "@chakra-ui/react";

import {BiUpload} from "react-icons/bi";

interface Props {
    onClick: () => void;
}

const UploadButton: React.FC<Props> = ({ onClick }) => {
    return (
        <Button
            colorScheme={'brand'}
            leftIcon={<BiUpload />}
            onClick={onClick}
        >
            Upload your Notes
        </Button>
    );
};

export default UploadButton;
