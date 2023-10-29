import { useState, useEffect } from 'react';

import * as Yup from "yup";

import {useFormik} from "formik";

import { addNote } from "@/services/notes";

import useAuth from "@/hooks/auth/useAuth";

import {NoteInput} from "@/types/Note";
import {Subject} from "@/types/Subject";

const NoteSchema: Yup.ObjectSchema<NoteInput> = Yup.object().shape({
    title: Yup.string()
        .required('Title is Required')
        .min(1, 'Title is Required'),
    content: Yup.string()
        .required('Content is Required')
        .min(1, 'Content is Required'),
    courseId: Yup.string()
        .required('Course ID is Required')
        .min(1, 'Course ID is Required'),
});

const useAddNote = (initSubject?: Subject) => {

    const { user } = useAuth();

    const [subject, setSubject] = useState<Subject | null>(initSubject || null);

    useEffect(() => {
        setSubject(initSubject || null)
    }, [initSubject])

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
            courseId: subject?.id || '',
        },
        validationSchema: NoteSchema,
        onSubmit: async note => {
            if(!user) return;
            await addNote(user.uid, note);
            resetForm();
        },
    });

    useEffect(() => {
        setFieldValue('courseId', subject?.id || '');
    }, [setFieldValue, subject]);

    const updateSubject = (subject: Subject | null) => {
        setSubject(subject);
    }

    return {
        subject,
        values,
        errors,
        touched,
        setFieldValue,
        setFieldTouched,
        submitForm,
        updateSubject,
        resetForm,
        disabled: Object.keys(errors).length > 0 || Object.keys(touched).length === 0,
    }
}

export default useAddNote;