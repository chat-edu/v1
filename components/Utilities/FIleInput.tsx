import React, {useRef} from 'react';

import {Button, Icon} from "@chakra-ui/react";

import {FiFile} from "react-icons/fi";

interface Props {
    accept?: string;
    setFile: (file: File) => void;
    text: string;
}

const FileInput: React.FC<Props> = ({ accept, setFile, text }) => {

    const inputRef = useRef<HTMLInputElement | null>(null);

    const handleClick = () => inputRef.current?.click()

    return (
        <form
            style={{
                width: '100%',
                flex: 1,
                overflow: 'hidden'
            }}
            action={'/api/notes/upload'}
        >
            <input
                type={'file'}
                hidden
                accept={accept}
                ref={inputRef}
                onChange={(e) => {
                    if (e.target.files && e.target.files.length > 0) {
                        setFile(e.target.files[0])
                    }
                }
                }
            />
            <Button
                onClick={handleClick}
                leftIcon={
                    <Icon as={FiFile} />
                }
                w={'100%'}
            >
                {text}
            </Button>
        </form>
    );
};

export default FileInput;
