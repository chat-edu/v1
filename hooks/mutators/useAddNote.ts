import * as Yup from "yup";

import {useFormik} from "formik";

import { addNote } from "@/services/notes";

import useAuth from "@/hooks/auth/useAuth";

import {NoteInput} from "@/types/Note";

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

const useAddNote = () => {

    const { user } = useAuth();

    const {
        values,
        errors,
        touched,
        setFieldValue,
        setFieldTouched,
        submitForm,
        resetForm
    } = useFormik<NoteInput>({
        initialValues: {
            title: '',
            content: '',
            courseId: '',
        },
        validationSchema: NoteSchema,
        onSubmit: async note => {
            if(!user) return;
            await addNote(user.uid, note);
            resetForm();
        },
    });

    return {
        values,
        errors,
        touched,
        setFieldValue,
        setFieldTouched,
        submitForm,
        resetForm
    }
}

export default useAddNote;