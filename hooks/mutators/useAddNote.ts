import { useState, useEffect } from 'react';

import * as Yup from "yup";

import {useFormik} from "formik";

import { addNote } from "@/services/notes";

import useAuth from "@/hooks/auth/useAuth";

import {NoteInput} from "@/types/Note";
import {Notebook} from "@/types/Notebook";
import {emitNotesChangedEvent} from "@/eventEmitters/notesEventEmitter";

const NoteSchema: Yup.ObjectSchema<NoteInput> = Yup.object().shape({
    title: Yup.string()
        .required('Title is Required')
        .min(1, 'Title is Required'),
    content: Yup.string()
        .required('Content is Required')
        .min(1, 'Content is Required'),
    notebookId: Yup.string()
        .required('Notebook ID is Required')
        .min(1, 'Course ID is Required'),
});

const useAddNote = (initNotebook?: Notebook) => {

    const { user } = useAuth();

    const [notebook, setNotebook] = useState<Notebook | null>(initNotebook || null);

    useEffect(() => {
        setNotebook(initNotebook || null)
    }, [initNotebook])

    const {
        values,
        errors,
        touched,
        setFieldValue,
        setFieldTouched,
        submitForm,
        resetForm,
    } = useFormik<NoteInput>({
        initialValues: {
            title: '',
            content: '',
            notebookId: notebook?.id || '',
        },
        validationSchema: NoteSchema,
        onSubmit: async note => {
            if(!user) return;
            await addNote(note);
            emitNotesChangedEvent(note.notebookId);
            resetForm();
        },
    });

    useEffect(() => {
        setFieldValue('notebookId', notebook?.id || '');
    }, [setFieldValue, notebook]);

    const updateNotebook = (notebook: Notebook | null) => {
        setNotebook(notebook);
    }

    return {
        notebook,
        values,
        errors,
        touched,
        setFieldValue,
        setFieldTouched,
        submitForm,
        updateNotebook,
        resetForm,
        disabled: Object.keys(errors).length > 0,
    }
}

export default useAddNote;