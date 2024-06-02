import React, {ChangeEvent, useState} from 'react';

import {Box, InputGroup, InputLeftElement, useColorModeValue} from "@chakra-ui/react";
import {Search2Icon} from "@chakra-ui/icons";

import {
    AutoComplete,
    AutoCompleteGroup,
    AutoCompleteGroupTitle,
    AutoCompleteInput,
    AutoCompleteItem,
    AutoCompleteList
} from "@choc-ui/chakra-autocomplete";

import UserHit from "@/components/Layout/Navbar/SearchBar/UserHit";

import useUsersSearch from "@/hooks/queries/search/useUsersSearch";
import useNotebooksSearch from "@/hooks/queries/search/useNotebooksSearch";
import NotebookHit from "@/components/Layout/Navbar/SearchBar/NotebookHit";

const SearchBar = () => {

    const [input, setInput] = useState<string>('');

    const { results: userResults } = useUsersSearch(input);

    const { results: notebookResults } = useNotebooksSearch(input);

    const menuBackground = useColorModeValue('white', '#2D2D2D');
    const menuBorderColor = useColorModeValue("gray.200", "whiteAlpha.300");

    return (
        <Box
            flex={1}
            display={{
                base: 'none',
                lg: 'block'
            }}
        >
        <AutoComplete
            disableFilter
        >
            <InputGroup>
                <InputLeftElement>
                    <Search2Icon
                        color={'brand.500'}
                    />
                </InputLeftElement>
                <AutoCompleteInput
                    placeholder={'Search'}
                    flex={1}
                    variant={'outline'}
                    focusBorderColor={'brand.500'}
                    value={input}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
                />
            </InputGroup>
            {
                input.length > 0 && (
                    <AutoCompleteList
                        bg={menuBackground}
                        p={0}
                        border='1px solid'
                        borderColor={menuBorderColor}
                        position={'absolute'}
                    >
                        <AutoCompleteGroup title={'Users'}>
                            <AutoCompleteGroupTitle>
                                Users
                            </AutoCompleteGroupTitle>
                            {userResults.map((user) => (
                                <AutoCompleteItem
                                    key={user.username}
                                    value={user.username + user.name}
                                    m={0}
                                    onClick={() => {}}
                                >
                                    <UserHit
                                        userIndexRow={user}
                                    />
                                </AutoCompleteItem>
                            ))}
                        </AutoCompleteGroup>
                        <AutoCompleteGroup title={'Courses'}>
                            <AutoCompleteGroupTitle>
                                Courses
                            </AutoCompleteGroupTitle>
                                {notebookResults.map((notebook) => (
                                    <AutoCompleteItem
                                        key={notebook.id}
                                        value={notebook.name + notebook.id}
                                        m={0}
                                        onClick={() => {}}
                                    >
                                        <NotebookHit
                                            notebookIndexRow={notebook}
                                        />
                                    </AutoCompleteItem>
                                ))}
                        </AutoCompleteGroup>
                    </AutoCompleteList>
                )
            }
        </AutoComplete>
        </Box>
    );
};

export default SearchBar;
