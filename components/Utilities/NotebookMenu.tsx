import React from 'react';

import AutoCompleteMenu from "@/components/Utilities/AutoCompleteMenu";

import useNotebooks from "@/hooks/queries/useNotebooks";

import { Notebook } from "@/types/Notebook";

interface Props {
    label: string;
    notebook: Notebook | null,
    setNotebook: (notebook: Notebook | null) => void,
    onBlur?: () => void,
    error?: string,
    closeButton?: boolean,
    placeholder?: string
}

const NotebookMenu: React.FC<Props> = ({ label, notebook, placeholder, setNotebook, onBlur, error, closeButton }) => {

    const { notebooks } = useNotebooks();

    return (
        <AutoCompleteMenu
            label={label}
            value={notebook}
            initInputValue={notebook?.name || undefined}
            placeholder={placeholder}
            optionLabels={(notebooks || []).map(notebook => notebook.name)}
            options={notebooks || []}
            onSelect={setNotebook}
            onBlur={onBlur}
            error={error}
            helperText={"Select a notebook"}
            closeButton={closeButton}
        />
    );
};

export default NotebookMenu;