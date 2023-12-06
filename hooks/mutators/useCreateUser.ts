import { useEffect } from 'react';

import {useToast} from "@chakra-ui/react";

import * as Yup from "yup";

import {useFormik} from "formik";

import { addUser } from "@/services/user";

import useAuth from "@/hooks/useAuth";

import {UserInput} from "@/types/User";

const UserSchema: Yup.ObjectSchema<UserInput> = Yup.object().shape({
    name: Yup.string()
        .required('Name is Required')
        .min(1, 'Name is Required'),
    email: Yup.string()
        .required('Email is Required')
        .min(1, 'Email is Required'),
    username: Yup.string()
        .required('Username is Required')
        .min(1, 'Username is Required'),
    id: Yup.string()
        .required('ID is Required')
        .min(1, 'ID is Required'),
    profilePictureUrl: Yup.string()
        .required('Profile Picture URL is Required')
        .min(1, 'Profile Picture URL is Required'),
});

const useAddUser = () => {
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
    } = useFormik<UserInput>({
        initialValues: {
            name: user?.name || '',
            email: user?.email || '',
            username: '',
            id: user?.id || '',
            profilePictureUrl: `https://api.multiavatar.com/${user?.id || 'default'}.png`,
        },
        validationSchema: UserSchema,
        onSubmit: async user => {
            if(!user) return;
            const success = await addUser(user);
            if(success) {
                toast({
                    title: "User Added",
                    description: "Your user has been added.",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                });
                return true;
            } else {
                toast({
                    title: "User Not Added",
                    description: "Your user has not been added.",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
                return false;
            }
        }
    });

    useEffect(() => {
        if (user) {
            setFieldValue('name', user.name);
            setFieldValue('email', user.email);
            setFieldValue('id', user.id);
            setFieldValue('profilePictureUrl', `https://api.multiavatar.com/${user.id}.png`);
        }
    }, [setFieldValue, user]);


    return {
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

export default useAddUser;
