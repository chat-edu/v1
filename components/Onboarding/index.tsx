import React from 'react';

import OnboardingSteps from "@/components/Onboarding/OnboardingSteps";
import Container from "@/components/Utilities/Container";

import {User} from "next-auth";

interface Props {
    user: User
}

const Onboarding: React.FC<Props> = ({ user }) => {
    return (
        <Container
            h={'100%'}
            justifyContent={'center'}
        >
            <OnboardingSteps
                user={user}
            />
        </Container>
    );
};

export default Onboarding;
