import React from 'react';

import {Button, VStack} from "@chakra-ui/react";

import TextInput from "@/components/Utilities/FormUtilities/TextInput";
import MenuInput from "@/components/Utilities/FormUtilities/MenuInput";

import useAddNotebook from "@/hooks/mutators/useAddNotebook";

import {capitalize} from "@/lib/capitalize";

import {SchoolTagTypes, TopicTagTypes} from "@/types/Tags";

interface Props {
    onSuccess: () => void;
}

const AddNotebookForm: React.FC<Props> = ({ onSuccess }) => {

    const {
        setFieldTouched,
        setFieldValue,
        values,
        touched,
        errors,
        disabled,
        topicTag,
        schoolName,
        schoolTag,
        setSchoolTag,
        setSchoolName,
        setTopicTag,
        submitForm
    } = useAddNotebook();

    const onSubmit = async () => {
        await submitForm();
        onSuccess();
    }

    return (
        <VStack
            display={'flex'}
            flexDirection={'column'}
            gap={4}
            alignItems={'center'}
            w={'100%'}
        >
            <TextInput
                label={'Notebook Name'}
                placeholder={'Ex: CS 2201'}
                helperText={'Enter the name of the notebook'}
                value={values.name}
                onChange={(name) => setFieldValue('name', name)}
                onBlur={() => setFieldTouched('name')}
                error={touched.name && errors.name || undefined}
            />
            <MenuInput
                label={"School Type"}
                valueDisplay={schoolTag ? capitalize(schoolTag) : "Select a Type"}
                optionLabels={Object.values(SchoolTagTypes).map(capitalize)}
                options={Object.values(SchoolTagTypes) as SchoolTagTypes[]}
                onSelect={setSchoolTag}
                helperText={'What type of school is this notebook for?'}
            />
            {
                schoolTag && (
                    <TextInput
                        label={"School Name"}
                        placeholder={"Ex: Vanderbilt University"}
                        value={schoolName}
                        onChange={setSchoolName}
                        helperText={'What is the name of the school?'}
                    />
                )
            }
            <MenuInput
                label={"Topic"}
                valueDisplay={topicTag ? capitalize(topicTag) : "Select a Type"}
                optionLabels={Object.values(TopicTagTypes).map(capitalize)}
                options={Object.values(TopicTagTypes) as TopicTagTypes[]}
                onSelect={setTopicTag}
                helperText={'What are your notes about?'}
            />
            <Button
                colorScheme="brand"
                onClick={onSubmit}
                isDisabled={disabled}
                w={'100%'}
            >
                Add
            </Button>
        </VStack>
    );
};

export default AddNotebookForm;
