import * as Yup from 'yup';

import {useFormik} from "formik";

import { addNotebook } from "@/services/notebooks";

import useAuth from "@/hooks/auth/useAuth";

import {NotebookInput} from "@/types/Notebook";
import {useEffect} from "react";
import {emitNotebooksChangedEvent} from "@/eventEmitters/notebooksEventEmitter";

const NotebookSchema: Yup.ObjectSchema<NotebookInput> = Yup.object().shape({
    name: Yup.string()
        .required('Name is Required')
        .min(1, 'Name is Required'),
    userId: Yup.string()
        .required('User ID is Required')
        .min(1, 'User ID is Required'),
});

const useAddNotebook = () => {

    const { user } = useAuth();

    const {
        values,
        errors,
        touched,
        setFieldValue,
        setFieldTouched,
        submitForm,
        resetForm
    } = useFormik<NotebookInput>({
        initialValues: {
            name: '',
            userId: user?.uid || '',
        },
        validationSchema: NotebookSchema,
        onSubmit: async notebook => {
            if(!user) return;
            await addNotebook(notebook);
            emitNotebooksChangedEvent(notebook.userId);
            resetForm();
        },
    });

    useEffect(() => {
        if(user) {
            setFieldValue('userId', user.uid);
        }
    }, [setFieldValue, user]);


    return {
        values,
        errors,
        touched,
        setFieldValue,
        setFieldTouched,
        submitForm,
        disabled: Object.keys(errors).length > 0
    }
}

export default useAddNotebook;