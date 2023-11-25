import React from 'react';

import {useRouter} from "next/router";

import Head from "next/head";

import Layout from "@/components/Layout";
import User from "@/components/User";

import {NextPage} from "next";

const UserPage: NextPage = () => {
    const router = useRouter();
    const { userId } = router.query;

    return (
        <>
            <Head>
                <title>User</title>
                <meta name="description" content="Supercharge your learning with AI" />
                <meta name="viewport" content="width=device-width, height=device-height,  initial-scale=1.0, user-scalable=no, user-scalable=0;" />
                <link rel="icon" href="/favicon.ico" />
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon-180x180.png" />
                <link rel="apple-touch-icon" sizes="192x192" href="/apple-touch-icon-192x192.png" />
            </Head>
            <Layout>
                <User
                    userId={userId as string}
                />
            </Layout>
        </>
    )
};

export default UserPage;
