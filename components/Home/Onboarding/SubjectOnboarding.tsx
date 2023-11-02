import React from 'react';

import {Heading, HStack, Text, VStack} from "@chakra-ui/react";

import AddSubjectButton from "@/components/Home/AddSubject/AddSubjectButton";

import {Subject} from "@/types/Subject";
import {CheckIcon} from "@chakra-ui/icons";

interface Props {
    subject: Subject | null
}

const SubjectOnboarding: React.FC<Props> = ({ subject }) => {
    return (
        <VStack>
            <Heading
                size={{
                    base: 'sm',
                    md: 'md'
                }}
            >
                Subjects
            </Heading>
            <Text
                fontSize={{
                    base: 'sm',
                    md: 'md'
                }}
            >
                Your notes are organized by Subject - get started by adding a subject now:
            </Text>
            {
                subject === null ? (
                    <AddSubjectButton />
                ) : (
                    <HStack
                        spacing={2}
                        borderRadius={'md'}
                        borderWidth={2}
                        borderColor={'brand.500'}
                        p={2}
                        color={'brand.500'}
                    >
                        <CheckIcon />
                        <Text
                            fontWeight={'bold'}
                        >
                            {subject.name} Created
                        </Text>
                    </HStack>
                )
            }

        </VStack>
    );
};

export default SubjectOnboarding;
