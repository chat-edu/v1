import * as Yup from 'yup';

import {useFormik} from "formik";

import { addSubject } from "@/services/subjects";

import useAuth from "@/hooks/auth/useAuth";

import {SubjectInput} from "@/types/Subject";

const SubjectSchema: Yup.ObjectSchema<SubjectInput> = Yup.object().shape({
    name: Yup.string()
        .required('Name is Required')
        .min(1, 'Name is Required'),
});

const useAddSubject = () => {

    const { user } = useAuth();

    const {
        values,
        errors,
        touched,
        setFieldValue,
        setFieldTouched,
        submitForm,
        resetForm
    } = useFormik<SubjectInput>({
        initialValues: {
            name: '',
        },
        validationSchema: SubjectSchema,
        onSubmit: async subject => {
            if(!user) return;
            await addSubject(user.uid, subject)
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
    }
}

export default useAddSubject;