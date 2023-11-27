import React, {useState, ChangeEvent, useEffect} from 'react';

import {
    Icon,
    InputGroup,
    InputRightElement,
    HStack,
    useColorModeValue,
    IconButton
} from "@chakra-ui/react";

import {AutoComplete, AutoCompleteInput, AutoCompleteItem, AutoCompleteList} from "@choc-ui/chakra-autocomplete";

import {FiChevronDown, FiChevronRight, FiX} from "react-icons/fi";

import FormElement from "@/components/Utilities/FormUtilities/FormElement";

interface Props<T> {
    label: string;
    value: T | null;
    optionLabels: string[];
    options: T[];
    onSelect: (value: T | null) => void;
    initInputValue?: string;
    onBlur?: () => void;
    error?: string;
    helperText?: string;
    placeholder?: string;
    closeButton?: boolean;
}

const AutoCompleteMenu = <T,>({ label, value, initInputValue, optionLabels, options, onSelect, onBlur, error, helperText, placeholder, closeButton }: Props<T>) => {

    const menuBackground = useColorModeValue('white', '#2D2D2D');
    const menuBorderColor = useColorModeValue("gray.200", "whiteAlpha.300");

    const [inputValue, setInputValue] = useState(initInputValue);

    useEffect(() => {
        setInputValue(initInputValue);
    }, [initInputValue])

    return (
        <FormElement
            label={label}
            error={error}
            helperText={helperText}
        >
            <AutoComplete
                openOnFocus
                restoreOnBlurIfEmpty={false}
            >
                {({ isOpen }: { isOpen: boolean }) => (
                    <HStack>
                        <InputGroup>
                            <AutoCompleteInput
                                variant="outline"
                                value={inputValue}
                                placeholder={placeholder}
                                focusBorderColor="brand.500"
                                onBlur={onBlur}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                    if (e.target.value === "") {
                                        onSelect(null);
                                    }
                                    setInputValue(e.target.value);
                                }}
                            />
                            <InputRightElement>
                                <Icon as={isOpen ? FiChevronRight : FiChevronDown} />
                            </InputRightElement>
                        </InputGroup>
                        <AutoCompleteList
                            bg={menuBackground}
                            p={0}
                            border='1px solid'
                            borderColor={menuBorderColor}
                            position={'absolute'}
                        >
                            {options.map((option, id) => (
                                <AutoCompleteItem
                                    key={`option-${id}`}
                                    value={optionLabels[id]}
                                    textTransform="capitalize"
                                    m={0}
                                    onClick={() => {
                                        setInputValue(optionLabels[id]);
                                        onSelect(option)
                                    }}

                                >
                                    {optionLabels[id]}
                                </AutoCompleteItem>
                            ))}
                        </AutoCompleteList>
                        {
                            (closeButton && value != null) && (
                                <IconButton
                                    aria-label={'clear'}
                                    icon={<Icon as={FiX} />}
                                    onClick={() => {
                                        onSelect(null);
                                        setInputValue("");
                                    }}
                                />
                            )
                        }

                    </HStack>
                )}
            </AutoComplete>
        </FormElement>
    );
};

export default AutoCompleteMenu;