import React, {useEffect, useState} from 'react';

import {VStack, Text} from "@chakra-ui/react";

import '@/components/Utilities/TypewriterAnimation/TypeWriterAnimation.css';

const subtexts = [
    "Typing up your masterpieces...",
    "Clacking away at your ideas...",
    "Composing pages of wisdom...",
    "Inking your thoughts into reality...",
    "Your words, our paper...",
    "Setting the stage for your stories...",
    "Crafting your digital manuscript...",
    "From keys to knowledge...",
    "Aligning the margins of your mind...",
    "Carriage returning your insights..."
];

const TypewriterAnimation: React.FC = ({}) => {

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
