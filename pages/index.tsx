import Head from "next/head";

import Layout from "@/components/Layout";

import {NextPage} from "next";
import Home from "@/components/Home";

const HomePage: NextPage = () => {
  return (
      <>
          <Head>
              <title>ChatEDU</title>
              <meta name="description" content="Supercharge your learning with AI" />
              <meta name="viewport" content="width=device-width, initial-scale=1" />
              <link rel="icon" href="/favicon.ico" />
              <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon-180x180.png" />
              <link rel="apple-touch-icon" sizes="192x192" href="/apple-touch-icon-192x192.png" />
          </Head>
          <Layout
            authGate
          >
              <Home />
          </Layout>
      </>
  )
}

export default HomePage