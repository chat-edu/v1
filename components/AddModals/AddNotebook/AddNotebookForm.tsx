import React from 'react';

import {Button, VStack} from "@chakra-ui/react";

import TextInput from "@/components/Utilities/FormUtilities/TextInput";

import useAddNotebook from "@/hooks/mutators/add/useAddNotebook";

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
                label={'Classroom Name'}
                placeholder={'Ex: Computer Science'}
                helperText={'Enter the name of your Classroom'}
                value={values.name}
                onChange={(name) => setFieldValue('name', name)}
                onBlur={() => setFieldTouched('name')}
                error={touched.name && errors.name || undefined}
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
