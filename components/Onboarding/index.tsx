import React from 'react';

import Container from "@/components/Utilities/Container";

import {User} from "next-auth";
import CreateAccount from "@/components/Onboarding/CreateAccount";

interface Props {
    user: User
}

const Onboarding: React.FC<Props> = () => {
    return (
        <Container
            h={'100%'}
            justifyContent={'center'}
            maxW={'2xl'}
        >
            <CreateAccount />
        </Container>
    );
};

export default Onboarding;
