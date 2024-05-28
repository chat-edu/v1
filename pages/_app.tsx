import {Analytics} from "@vercel/analytics/react";

import { ChakraProvider } from '@chakra-ui/react'

import { SessionProvider } from "next-auth/react"

import theme from "@/theme";

import type { AppProps } from 'next/app'

import posthog from "posthog-js"
import { PostHogProvider } from 'posthog-js/react'

if (typeof window !== 'undefined') { // checks that we are client-side
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY as string, {
        api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com',
        loaded: (posthog) => {
            if (process.env.NODE_ENV === 'development') posthog.debug() // debug mode in development
        },
    })
}

export default function App({ Component, pageProps }: AppProps) {
  return (
      <SessionProvider
        session={pageProps.session}
      >
          <ChakraProvider
              theme={theme}
          >
              <Analytics />
              <PostHogProvider client={posthog}>
                <Component {...pageProps} />
              </PostHogProvider>
          </ChakraProvider>
      </SessionProvider>
  )
}
