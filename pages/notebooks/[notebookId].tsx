import Head from "next/head";

import Layout from "@/components/Layout";
import Notebook from "@/components/Notebook";

import {NextPage} from "next";
import {useRouter} from "next/router";
import Loading from "@/components/Utilities/Loading";

const NotebookPage: NextPage = () => {

    const router = useRouter();
    const { notebookId } = router.query;

    return (
        <>
            <Head>
                <title>Notebook</title>
                <meta name="description" content="Supercharge your learning with AI" />
                <meta name="viewport" content="width=device-width, height=device-height,  initial-scale=1.0, user-scalable=no, user-scalable=0;" />
                <meta property="og:image" content={`https://preview.chatedu.io/api/og/notebooks/${notebookId}`}/>
                <link rel="icon" href="/favicon.ico" />
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon-180x180.png" />
                <link rel="apple-touch-icon" sizes="192x192" href="/apple-touch-icon-192x192.png" />
            </Head>
            <Layout>
                <Loading
                    loading={!notebookId}
                    h={'100%'}
                >
                    <Notebook
                        notebookId={parseInt(notebookId as string)}
                    />
                </Loading>
            </Layout>
        </>
    )
}

export default NotebookPage