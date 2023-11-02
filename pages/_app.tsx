import { Analytics } from '@vercel/analytics/react';

import { ChakraProvider } from '@chakra-ui/react'

import '@fontsource/archivo-black'
import '@fontsource-variable/archivo'

import theme from "@/theme";

import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
      <>
              <ChakraProvider
                  theme={theme}
              >
                  <Component {...pageProps} />
              </ChakraProvider>
            <Analytics />
      </>
  )
}
