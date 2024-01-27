import React from "react";

import {Heading, ListItem, Text, UnorderedList} from "@chakra-ui/react";

import {Components} from "react-markdown";

const markdownTheme: Components = {
    p: (props: {children?: React.ReactNode}) => {
        const { children } = props;
        return (
            <Text
                fontSize={{
                    base: 'xs',
                    md: 'md'
                }}
                my={1}
            >
                {children}
            </Text>
        );
    },
    h1: (props: {children?: React.ReactNode}) => {
        const { children } = props;
        return (
            <Heading
                size={{
                    base: 'md',
                    md: 'lg'
                }}
                my={4}
            >
                {children}
            </Heading>
        )
    },
    h2: (props: {children?: React.ReactNode}) => {
        const { children } = props;
        return (
            <Heading
                size={{
                    base: 'sm',
                    md: 'md'
                }}
                my={2}
            >
                {children}
            </Heading>
        )
    },
    h3: (props: {children?: React.ReactNode}) => {
        const { children } = props;
        return (
            <Heading
                size={{
                    base: 'sm',
                    md: 'xs'
                }}
                my={1}
            >
                {children}
            </Heading>
        )
    },
    li: (props: {children?: React.ReactNode}) => {
        const { children } = props;
        return (
            <ListItem
                mb={2}
                fontSize={{
                    base: 'xs',
                    md: 'md'
                }}
            >
                {children}
            </ListItem>
        );
    },
    ul: (props: {children?: React.ReactNode}) => {
        const { children } = props;
        return (
            <UnorderedList
                my={2}
                ml={8}
            >
                {children}
            </UnorderedList>
        );
    },
};

export default markdownTheme;