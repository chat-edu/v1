import {useEffect} from "react";

import * as Yup from 'yup';

import {useFormik} from "formik";

import {useToast} from "@chakra-ui/react";

import useAuth from "@/hooks/useAuth";

import { addNotebook } from "@/services/notebooks";

import {emitNotebooksChangedEvent} from "@/eventEmitters/notebooksEventEmitter";

import {NotebookInput} from "@/types/Notebook";

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

    const toast = useToast();

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
            userId: user?.id || '',
        },
        validationSchema: NotebookSchema,
        onSubmit: async notebook => {
            if(!user) return;
            const success = await addNotebook(notebook);
            if(success) {
                emitNotebooksChangedEvent(notebook.userId);
                toast({
                    title: "Notebook Created",
                    description: `Notebook ${notebook.name} was created.`,
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                });
            } else {
                toast({
                    title: "Notebook Creation Failed",
                    description: `Notebook ${notebook.name} could not be created.`,
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
            }
            resetForm();
        },
    });

    useEffect(() => {
        if(user) {
            setFieldValue('userId', user.id);
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