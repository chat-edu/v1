import React from 'react';

import OnboardingStep from "@/components/Onboarding/OnboardingStep";
import AddNoteForm from "@/components/AddModals/AddNote/AddNoteForm";

interface Props {
    notebookId: number,
    onNext: () => void;
}

const CreateNote: React.FC<Props> = ({ notebookId, onNext }) => {
    return (
        <OnboardingStep
            title={'Create Notes'}
            description={'A note is an individual piece of content within a notebook, such as a text excerpt, a summary, or a user-uploaded document. We automatically clean your notes to optimize your virtual tutor'}
        >
            <AddNoteForm
                onDone={onNext}
                notebookId={notebookId}
            />
        </OnboardingStep>
    );
};

export default CreateNote;
