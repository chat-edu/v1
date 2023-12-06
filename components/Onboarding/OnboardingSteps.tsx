import React, {useEffect} from 'react';

import {
    Box, Button,
    Card,
    Step,
    StepIcon,
    StepIndicator,
    StepNumber,
    Stepper,
    StepSeparator,
    StepStatus,
    StepTitle, useBreakpointValue,
    useSteps,
    VStack
} from "@chakra-ui/react";

import CreateAccount from "@/components/Onboarding/CreateAccount";
import CreateNotebook from "@/components/Onboarding/CreateNotebook";
import CreateNote from "@/components/Onboarding/CreateNote";
import GetStarted from "@/components/Onboarding/GetStarted";

import useUserNotebooks from "@/hooks/queries/scores/notebooks/useUserNotebooks";
import useUser from "@/hooks/queries/user/useUser";

import {User} from "next-auth";

interface Props {
    user: User
}

const steps = [
    {
        title: 'Create an account',
    },
    {
        title: 'Create a Notebook',
    },
    {
        title: 'Create a Note',
    },
    {
        title: 'Get Started',
    }
]

const OnboardingSteps: React.FC<Props> = ({ user }) => {

    const orientation = useBreakpointValue({
        base: 'vertical',
        md: 'horizontal'
    });

    const { userData } = useUser(user.id);

    const { notebooks } = useUserNotebooks(user.id);

    const { activeStep, goToNext, setActiveStep } = useSteps({
        index: 0,
        count: steps.length,
    });

    useEffect(() => {
        if (userData && activeStep === 0) {
            goToNext();
        }
    }, [userData, goToNext, activeStep]);

    useEffect(() => {
        if (notebooks.length > 0 && activeStep === 1) {
            goToNext();
        }
    }, [notebooks, goToNext, activeStep]);

    return (
        <VStack
            w={'100%'}
            spacing={8}
            h={'100%'}
        >
            <Stepper
                index={activeStep}
                colorScheme={'brand'}
                w={'100%'}
                // @ts-ignore
                orientation={orientation}
            >
                {steps.map((step, index) => (
                    <Step key={index}>
                        <StepIndicator>
                            <StepStatus
                                complete={<StepIcon />}
                                incomplete={<StepNumber />}
                                active={<StepNumber />}
                            />
                        </StepIndicator>

                        <Box flexShrink='0'>
                            <StepTitle>{step.title}</StepTitle>
                        </Box>
                        <StepSeparator />
                    </Step>
                ))}
            </Stepper>
            <Card
                w={{
                    base: '100%',
                    md: '75%'
                }}
            >
                {
                    activeStep === 0 && (
                        <CreateAccount
                            nextStep={goToNext}
                        />
                    )
                }
                {
                    activeStep === 1 && (
                        <CreateNotebook
                            onNext={goToNext}
                        />
                    )
                }
                {
                    activeStep === 2 && (
                        <CreateNote
                            notebookId={notebooks[0]?.notebookId || 0}
                            onNext={goToNext}
                        />
                    )
                }
                {
                    activeStep === 3 && (
                        <GetStarted />
                    )
                }
            </Card>
            {
                (activeStep !== 0 && activeStep !== steps.length - 1) && (
                    <Button
                        variant={'ghost'}
                        onClick={() => setActiveStep(steps.length - 1)}
                    >
                        Skip
                    </Button>
                )
            }
            {
                activeStep === steps.length - 1 && (
                    <Button
                        variant={'ghost'}
                        onClick={() => setActiveStep(notebooks.length == 0 ? 1 : 2)}
                    >
                        Back
                    </Button>
                )
            }
        </VStack>
    )
};

export default OnboardingSteps;
