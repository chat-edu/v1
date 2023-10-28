import Head from "next/head";

import {NextPage} from "next";
import {Box, Text} from "@chakra-ui/react";

const HomePage: NextPage = () => {
  return (
      <>
        <Head>
          <title>ChatEDU</title>
          <meta name="description" content="Supercharge your learning with AI" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Box>
            <Text>
                Hello World
            </Text>
        </Box>
      </>
  )
}

export default HomePage