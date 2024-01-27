import React from 'react';

import {mobileNavbarHeight, navbarHeight} from "@/components/Layout/Navbar";
import {mobileHeaderHeight} from "@/components/Notebook/NotebookMenu/MobileHeader";

import {Note} from "@/types/Note";
import {Container, Heading} from "@chakra-ui/react";
import useViewportDimensions from "@/hooks/utilities/useViewportDimensions";
import ChatLanding from "@/components/Chat/ChatLanding";
import Markdown from "@/components/Utilities/Markdown";

interface Props {
    selectedLesson: Note | null
}

const Lesson: React.FC<Props> = ({ selectedLesson }) => {

    const { height } = useViewportDimensions();

    if(!selectedLesson) return (
        <ChatLanding />
    )

    return (
        <Container
            w={'100%'}
            maxW={'6xl'}
            p={4}
            h={{
                base: height - mobileNavbarHeight - mobileHeaderHeight,
                md: height - navbarHeight
            }}
        >
            <Heading>
                {selectedLesson.name}
            </Heading>
            <Markdown>
                {selectedLesson.content}
            </Markdown>
        </Container>
    );
};

export default Lesson;
