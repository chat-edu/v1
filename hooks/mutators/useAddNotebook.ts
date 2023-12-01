import {useEffect, useState} from "react";

import * as Yup from 'yup';

import {useFormik} from "formik";

import {useToast} from "@chakra-ui/react";

import useAuth from "@/hooks/useAuth";

import {addNotebook} from "@/services/notebooks";

import {emitNotebooksChangedEvent} from "@/cosmosPostgres/eventEmitters/notebooksEventEmitter";

import {NotebookInput} from "@/types/Notebook";
import {TopicTagTypes, SchoolTagTypes, TagTypes} from "@/types/Tags";
import {TagRow} from "@/cosmosPostgres/types/tag";
import {addTag} from "@/services/tags";

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
            const notebookRow = await addNotebook(notebook);
            if(notebookRow) {
                toast({
                    title: "Notebook Created",
                    description: `Notebook ${notebook.name} was created.`,
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                });
                let tags: TagRow[] = [];
                if(schoolTag && schoolName) {
                    tags.push({
                        tag: schoolName,
                        tag_type_name: schoolTag,
                        notebook_id: notebookRow.id
                    });
                }
                if(topicTag) {
                    tags.push({
                        tag: topicTag,
                        tag_type_name: TagTypes.TOPIC,
                        notebook_id: notebookRow.id
                    });
                }
                if(tags.length > 0) {
                    const successes = await Promise.all(tags.map(tag => addTag(tag)));
                    if(successes.every(Boolean)) {
                        toast({
                            title: "Tags Created",
                            description: `Tags were created.`,
                            status: "success",
                            duration: 5000,
                            isClosable: true,
                        });
                    } else {
                        toast({
                            title: "Tags Creation Failed",
                            description: `Tags could not be created.`,
                            status: "error",
                            duration: 5000,
                            isClosable: true,
                        });
                    }
                }
                emitNotebooksChangedEvent(notebook.userId);
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


    const [schoolTag, setSchoolTag] = useState<SchoolTagTypes | null>(null);
    const [schoolName, setSchoolName] = useState<string>("");
    const [topicTag, setTopicTag] = useState<TopicTagTypes | null>(null);


    return {
        values,
        errors,
        touched,
        setFieldValue,
        setFieldTouched,
        schoolTag,
        schoolName,
        topicTag,
        setSchoolTag,
        setSchoolName,
        setTopicTag,
        submitForm,
        disabled: Object.keys(errors).length > 0
    }
}

export default useAddNotebook;