import Head from "next/head";

import {Box, Text} from "@chakra-ui/react";

import Layout from "@/components/Layout";

import {NextPage} from "next";


const HomePage: NextPage = () => {
  return (
      <>
          <Head>
              <title>ChatEDU</title>
              <meta name="description" content="Supercharge your learning with AI" />
              <meta name="viewport" content="width=device-width, initial-scale=1" />
              <link rel="icon" href="/favicon.ico" />
          </Head>
          <Layout
            authGate
          >
              <Box>
                  <Text>
                      Hello World
                  </Text>
              </Box>
          </Layout>
      </>
  )
}

export default HomePage