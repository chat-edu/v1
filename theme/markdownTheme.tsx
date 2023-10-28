import React from "react";

import {Heading, ListItem, Text, UnorderedList} from "@chakra-ui/react";

import {Components} from "react-markdown";

const markdownTheme: Components = {
    p: (props: {children?: React.ReactNode}) => {
        const { children } = props;
        return (
            <Text>
                {children}
            </Text>
        );
    },
    h1: (props: {children?: React.ReactNode}) => {
        const { children } = props;
        return (
            <Heading
                size={'lg'}
            >
                {children}
            </Heading>
        )
    },
    h2: (props: {children?: React.ReactNode}) => {
        const { children } = props;
        return (
            <Heading
                size={'md'}
            >
                {children}
            </Heading>
        )
    },
    h3: (props: {children?: React.ReactNode}) => {
        const { children } = props;
        return (
            <Heading
                size={'sm'}
            >
                {children}
            </Heading>
        )
    },
    li: (props: {children?: React.ReactNode}) => {
        const { children } = props;
        return (
            <ListItem>
                {children}
            </ListItem>
        );
    },
    ul: (props: {children?: React.ReactNode}) => {
        const { children } = props;
        return (
            <UnorderedList>
                {children}
            </UnorderedList>
        );
    },
};

export default markdownTheme;