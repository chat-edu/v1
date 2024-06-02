import React from 'react';

import Head from "next/head";

import Layout from "@/components/Layout";
import Users from "@/components/Users";

import {NextPage} from "next";

const UsersPage: NextPage = () => {
    return (
        <>
            <Head>
                <title>Users</title>
                <meta name="description" content="Your AI-Powered Learning Copilot" />
                <meta name="viewport" content="width=device-width, height=device-height,  initial-scale=1.0, user-scalable=no, user-scalable=0;" />
                <meta property="og:image" content="https://www.chatedu.tech/api/og/users"/>
                <link rel="icon" href="/favicon.ico" />
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon-180x180.png" />
                <link rel="apple-touch-icon" sizes="192x192" href="/apple-touch-icon-192x192.png" />
            </Head>
            <Layout>
                <Users />
            </Layout>
        </>
    )
};

export default UsersPage;
