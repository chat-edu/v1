import { useEffect } from 'react';

import * as Yup from "yup";

import {useFormik} from "formik";

import { addNote } from "@/services/notes";

import useAuth from "@/hooks/useAuth";
import {useToast} from "@chakra-ui/react";

import {NoteInput} from "@/types/Note";
import {getTopics} from "@/services/topics";

const NoteSchema: Yup.ObjectSchema<NoteInput> = Yup.object().shape({
    name: Yup.string()
        .required('Title is Required')
        .min(1, 'Title is Required'),
    content: Yup.string()
        .required('Content is Required')
        .min(1, 'Content is Required'),
    notebookId: Yup.number()
        .required('Notebook ID is Required')
        .min(1, 'Course ID is Required'),
});

const useAddNote = (notebookId: number) => {

    const { user } = useAuth();

    const toast = useToast();

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
            name: '',
            content: '',
            notebookId: notebookId || 0,
        },
        validationSchema: NoteSchema,
        onSubmit: async note => {
            if(!user) return;
            const topics = await getTopics(note.content);
            console.log(topics);
            // const success = await addNote(note);
            // if(success) {
            //     toast({
            //         title: "Note Added",
            //         description: "Your note has been added.",
            //         status: "success",
            //         duration: 5000,
            //         isClosable: true,
            //     })
            // } else {
            //     toast({
            //         title: "Error",
            //         description: "There was an error adding your note.",
            //         status: "error",
            //         duration: 5000,
            //         isClosable: true,
            //     })
            // }
            resetForm();
        },
    });

    useEffect(() => {
        setFieldValue('notebookId', notebookId || 0);
    }, [setFieldValue, notebookId]);

    return {
        notebookId,
        values,
        errors,
        touched,
        setFieldValue,
        setFieldTouched,
        submitForm,
        resetForm,
        disabled: Object.keys(errors).length > 0,
    }
}

export default useAddNote;