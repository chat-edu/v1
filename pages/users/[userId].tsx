import React from 'react';

import Head from "next/head";

import Layout from "@/components/Layout";
import User from "@/components/User";

import {NextPageContext} from "next";

const UserPage = ({ userId} : { userId: string}) => {
    return (
        <>
            <Head>
                <title>User</title>
                <meta name="description" content="Your AI-Powered Learning Copilot" />
                <meta name="viewport" content="width=device-width, height=device-height,  initial-scale=1.0, user-scalable=no, user-scalable=0;" />
                <meta property="og:image" content={`https://www.chatedu.tech/api/og/users/${userId}`}/>
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

UserPage.getInitialProps = async (ctx: NextPageContext) => {
    return {
        userId: ctx.query.userId
    }
}

export default UserPage;
