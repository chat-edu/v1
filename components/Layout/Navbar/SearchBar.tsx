import React from 'react';

import {Search2Icon} from "@chakra-ui/icons";
import {Input, InputGroup, InputLeftElement} from "@chakra-ui/react";

const SearchBar = () => {
    return (
        <InputGroup
            flex={1}
            display={{
                base: 'none',
                lg: 'block'
            }}
        >
            <InputLeftElement>
                <Search2Icon
                    color={'brand.500'}
                />
            </InputLeftElement>
            <Input
                placeholder={'Search'}
                flex={1}
                variant={'outline'}
                focusBorderColor={'brand.500'}
            />
        </InputGroup>
    );
};

export default SearchBar;
