import Head from "next/head";

import {Text} from "@chakra-ui/react";

import Layout from "@/components/Layout";
import Loading from "@/components/Utilities/Loading";

import {NextPageContext} from "next";

const EditNotebookContentPage = ({ notebookId } : {notebookId: string}) => {

    return (
        <>
            <Head>
                <title>Notebook</title>
                <meta name="description" content="Supercharge your learning with AI" />
                <meta name="viewport" content="width=device-width, height=device-height,  initial-scale=1.0, user-scalable=no, user-scalable=0;" />
                <link rel="icon" href="/favicon.ico" />
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon-180x180.png" />
                <link rel="apple-touch-icon" sizes="192x192" href="/apple-touch-icon-192x192.png" />
            </Head>
            <Layout>
                <Loading
                    loading={!notebookId}
                    h={'100%'}
                >
                    <Text>
                        Edit Notebook {notebookId}
                    </Text>
                </Loading>
            </Layout>
        </>
    )
}

EditNotebookContentPage.getInitialProps = async (ctx: NextPageContext) => {
    return {
        notebookId: ctx.query.notebookId
    };
}

export default EditNotebookContentPage
