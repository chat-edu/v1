import React, {ChangeEvent} from 'react';

import {HStack, Tag, VStack} from "@chakra-ui/react";

import {
    AutoComplete,
    AutoCompleteInput,
    AutoCompleteTag
} from "@choc-ui/chakra-autocomplete";

import FormElement from "@/components/Utilities/FormUtilities/FormElement";

interface Props {
    label: string;
    tagOptions: string[];
    selectedTags: string[];
    selectTag: (tag: string) => void;
    unselectTag: (tag: string) => void;
}

const MultipleTagInput: React.FC<Props> = ({ tagOptions, label, selectedTags, selectTag, unselectTag }) => {

    const [inputValue, setInputValue] = React.useState<string>('');

    return (
        <FormElement
            label={label}
        >
            <VStack
                spacing={4}
            >
                <AutoComplete
                    multiple
                    value={selectedTags}
                    creatable
                    onChange={() => {
                        selectTag(inputValue);
                        setInputValue('');
                    }}
                >
                    <AutoCompleteInput
                        variant="outline"
                        focusBorderColor={'brand.500'}
                        value={inputValue}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
                    >
                        {
                            selectedTags.map((selectedTag) => (
                                <AutoCompleteTag
                                    key={selectedTag}
                                    label={selectedTag}
                                    onRemove={() => unselectTag(selectedTag)}
                                    colorScheme={'brand'}
                                />
                            ))
                        }
                    </AutoCompleteInput>
                </AutoComplete>
                <HStack
                    flexWrap="wrap"
                >
                    {
                        tagOptions.filter(tag => !selectedTags.includes(tag)).map((tag: string) => (
                            <Tag
                                key={tag}
                                onClick={() => selectTag(tag)}
                                cursor="pointer"
                                colorScheme={'brand'}
                                transition={'all 0.2s ease-in-out'}
                                _hover={{
                                    opacity: 0.8
                                }}
                            >
                                {tag}
                            </Tag>
                        ))
                    }
                </HStack>
            </VStack>
        </FormElement>
    );
};

export default MultipleTagInput;
