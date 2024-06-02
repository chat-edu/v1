import Head from "next/head";

import Layout from "@/components/Layout";
import Notebook from "@/components/Notebook";

import {NextPageContext} from "next";
import Loading from "@/components/Utilities/Loading";
import {useSearchParams} from "next/navigation";

const NotebookPage = ({ notebookId } : {notebookId: string}) => {

    const params = useSearchParams();

    return (
        <>
            <Head>
                <title>Notebook</title>
                <meta name="description" content="Your AI-Powered Learning Copilot" />
                <meta name="viewport" content="width=device-width, height=device-height,  initial-scale=1.0, user-scalable=no, user-scalable=0;" />
                <meta property="og:image" content={`https://www.chatedu.tech/api/og/notebooks/${notebookId}`}/>
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
                        initialNoteId={params?.get('noteId') ? parseInt(params.get('noteId') as string) : undefined}
                    />
                </Loading>
            </Layout>
        </>
    )
}

NotebookPage.getInitialProps = async (ctx: NextPageContext) => {
    return {
        notebookId: ctx.query.notebookId
    };
}

export default NotebookPage
