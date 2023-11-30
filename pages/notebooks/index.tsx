import Head from "next/head";

import {Box} from "@chakra-ui/react";

import Layout from "@/components/Layout";

import {NextPage} from "next";

const NotebooksPage: NextPage = () => {
    return (
        <>
            <Head>
                <title>Notebooks</title>
                <meta name="description" content="Supercharge your learning with AI" />
                <meta name="viewport" content="width=device-width, height=device-height,  initial-scale=1.0, user-scalable=no, user-scalable=0;" />
                <link rel="icon" href="/favicon.ico" />
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon-180x180.png" />
                <link rel="apple-touch-icon" sizes="192x192" href="/apple-touch-icon-192x192.png" />
            </Head>
            <Layout>
                <Box>
                    AAA
                </Box>
            </Layout>
        </>
    )
}

export default NotebooksPage