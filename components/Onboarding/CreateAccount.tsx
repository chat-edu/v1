import React from 'react';

import {Button} from "@chakra-ui/react";

import TextInput from "@/components/Utilities/FormUtilities/TextInput";
import OnboardingStep from "@/components/Onboarding/OnboardingStep";

import useCreateUser from "@/hooks/mutators/useCreateUser";

interface Props {
    nextStep: () => void
}

const CreateAccount: React.FC<Props> = ({ nextStep }) => {

    const {
        values,
        errors,
        touched,
        setFieldTouched,
        setFieldValue,
        submitForm,
        disabled
    } = useCreateUser();

    const handleSubmit = async () => {
        const success = await submitForm();
        if (success) {
            nextStep();
        }
    }

    return (
        <OnboardingStep
            title={"Create Account"}
            description={"Your account holds all of your notes and notebooks. Get started by setting your username."}
        >
            <TextInput
                label={'Username'}
                placeholder={'Username'}
                value={values.username}
                onChange={(value) => setFieldValue('username', value)}
                onBlur={() => setFieldTouched('username')}
                error={touched.username ? errors.username : undefined}
            />
            <Button
                colorScheme={'brand'}
                onClick={handleSubmit}
                isDisabled={disabled}
            >
                Create Account
            </Button>
        </OnboardingStep>
    );
};

export default CreateAccount;
