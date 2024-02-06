import React, {useEffect, useState} from 'react';

import {VStack, Text} from "@chakra-ui/react";

import '@/components/Utilities/TypewriterAnimation/TypeWriterAnimation.css';

interface Props {
    subtexts: string[]
}

const TypewriterAnimation: React.FC<Props> = ({subtexts}) => {

    const [subtextIndex, setSubtextIndex] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
            setSubtextIndex(Math.floor(Math.random() * subtexts.length));
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <VStack
            pt={6}
        >
            <div className="typewriter">
                <div className="slide"><i></i></div>
                <div className="paper"></div>
                <div className="keyboard"></div>
            </div>
            <Text
                mt={6}
            >
                {subtexts[subtextIndex]}
            </Text>
        </VStack>
    );
};

export default TypewriterAnimation;
