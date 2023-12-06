import React from 'react';

import Link from "next/link";

import {Button} from "@chakra-ui/react";

import OnboardingStep from "@/components/Onboarding/OnboardingStep";

const GetStarted = () => {
    return (
        <OnboardingStep
            title={"Start Learning"}
            description={"You have successfully created your first notebook. You can now interact with your personalized virtual tutor."}
        >
            <Link href={"/"}>
                <Button
                    colorScheme={'brand'}
                >
                    Get Started
                </Button>
            </Link>
        </OnboardingStep>
    );
};

export default GetStarted;
