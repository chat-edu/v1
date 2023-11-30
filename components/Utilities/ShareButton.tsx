import React from 'react';

import {IconButton, IconButtonProps, ResponsiveValue, useClipboard, useToast} from "@chakra-ui/react";
import {GoShare} from "react-icons/go";

import {Notebook} from "@/types/Notebook";

interface Props {
    notebookId: Notebook['id'],
    variant?: 'outline' | 'solid' | 'ghost' | 'link' | 'unstyled' | undefined,
    size?: ResponsiveValue<string> | string,
    position?: IconButtonProps['position'],
    top?: IconButtonProps['top'],
    right?: IconButtonProps['right'],
    bottom?: IconButtonProps['bottom'],
    left?: IconButtonProps['left'],
}

const ShareButton: React.FC<Props> = ({ notebookId, variant, size, ...rest }) => {

    const toast = useToast();

    const { onCopy } = useClipboard(`https://www.chatedu.tech/notebooks/${notebookId}`);

    const onClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();
        onCopy();
        toast({
            title: 'Link copied to clipboard',
            status: 'success',
            duration: 2000,
            isClosable: true
        });
    }

    return (
        <IconButton
            aria-label={'Share'}
            icon={<GoShare />}
            onClick={onClick}
            variant={variant}
            size={size}
            p={0}
            {...rest}
        />
    );
};

export default ShareButton;
