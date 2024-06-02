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
                label={'Course Name'}
                placeholder={'Ex: Chemistry 101'}
                helperText={'Enter the name of your course'}
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
                helperText={'What level of school are you?'}
            />
            {
                schoolTag && (
                    <TextInput
                        label={"School Name"}
                        placeholder={"Ex: Vanderbilt University"}
                        value={schoolName}
                        onChange={setSchoolName}
                        helperText={'What is the name of your school?'}
                    />
                )
            }
            <MenuInput
                label={"Subject"}
                valueDisplay={topicTag ? capitalize(topicTag) : "Select a Type"}
                optionLabels={Object.values(TopicTagTypes).map(capitalize)}
                options={Object.values(TopicTagTypes) as TopicTagTypes[]}
                onSelect={setTopicTag}
                helperText={'What is the subject of your course?'}
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
