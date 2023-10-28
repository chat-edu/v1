import React from 'react';

import AutoCompleteMenu from "@/components/Utilities/AutoCompleteMenu";

import useSubjects from "@/hooks/queries/useSubjects";

import {Subject} from "@/types/Subject";

interface Props {
    label: string;
    course: Subject | null,
    setCourse: (course: Subject | null) => void,
    onBlur?: () => void,
    error?: string,
    closeButton?: boolean,
    placeholder?: string
}

const SubjectMenu: React.FC<Props> = ({ label, course, placeholder, setCourse, onBlur, error, closeButton }) => {

    const { subjects } = useSubjects();

    return (
        <AutoCompleteMenu
            label={label}
            value={course}
            placeholder={placeholder}
            optionLabels={(subjects || []).map(subject => subject.name)}
            options={subjects || []}
            onSelect={setCourse}
            onBlur={onBlur}
            error={error}
            closeButton={closeButton}
        />
    );
};

export default SubjectMenu;