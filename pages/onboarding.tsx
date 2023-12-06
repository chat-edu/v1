import React from 'react';

import {Card, Text, VStack} from "@chakra-ui/react";

import Head from "next/head";
import useAuth from "@/hooks/useAuth";

import Layout from "@/components/Layout";
import Loading from "@/components/Utilities/Loading";
import Onboarding from "@/components/Onboarding";
import AuthProviderButtons from "@/components/Utilities/AuthButtons/AuthProviderButtons";
import Welcome from "@/components/Welcome";

import {NextPage} from "next";

const OnboardingPage: NextPage = () => {

    const { user, loading } = useAuth();

    return (
        <>
            <Head>
                <title>ChatEDU - Onboarding</title>
                <meta name="description" content="Supercharge your learning with AI" />
                <meta name="viewport" content="width=device-width, height=device-height,  initial-scale=1.0, user-scalable=no, user-scalable=0;" />
                <meta property="og:image" content="https://www.chatedu.tech/api/og"/>
                <link rel="icon" href="/favicon.ico" />
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon-180x180.png" />
                <link rel="apple-touch-icon" sizes="192x192" href="/apple-touch-icon-192x192.png" />
            </Head>
            <Layout
                isOnboarding
            >
                <Loading loading={loading}>
                    {
                        user ? (
                            <Onboarding
                                user={user}
                            />
                        ) : (
                            <VStack
                                w="100%"
                                h="100%"
                                alignItems={'center'}
                                justifyContent={'center'}
                            >
                                <Card
                                    alignItems={'center'}
                                    justifyContent={'center'}
                                    gap={4}
                                    p={8}
                                >
                                    <Welcome />
                                    <Text>
                                        Please sign in to continue onboarding.
                                    </Text>
                                    <AuthProviderButtons />
                                </Card>
                            </VStack>
                        )
                    }
                </Loading>
            </Layout>
        </>

    );
};

export default OnboardingPage;
