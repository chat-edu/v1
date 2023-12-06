import React from 'react';

import AddNotebookForm from "@/components/AddModals/AddNotebook/AddNotebookForm";
import OnboardingStep from "@/components/Onboarding/OnboardingStep";

interface Props {
    onNext: () => void;
}

const CreateNotebook: React.FC<Props> = ({ onNext }) => {
    return (
        <OnboardingStep
            title={'Create Notebook'}
            description={'A notebook refers to a personalized digital space where you can create and manage your educational content. Create a notebook to kick off your educational journey'}
        >
            <AddNotebookForm
                onSuccess={onNext}
            />
        </OnboardingStep>
    );
};

export default CreateNotebook;
