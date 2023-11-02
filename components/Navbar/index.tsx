import React from 'react'

import {Card, Flex, Heading, HStack, Text} from '@chakra-ui/react'

import AuthButton from '@/components/Navbar/AuthButton'
import ColorModeToggle from "@/components/Navbar/ColorModeToggle";

import Image from 'next/image';

export const navbarHeight = 80;

const Navbar = () => {
  return (
      <Card
        p={2}
        rounded={'none'}
        h={`${navbarHeight}px`}
        display={'flex'}
        justifyContent={'center'}
      >
        <Flex
            alignItems="center"
            w='100%'
            gap={4}
            bg='navbar.500'
            rounded='md'
            px={4}
        >
            <Image src="/logo.png" alt="ChatEDU Logo" width={40} height={40} />
            <Heading
                size='md'
            >
                <Text
                    as='span'
                >
                    Chat
                </Text>
                <Text
                    as='span'
                    color='brand.500'
                >
                    EDU
                </Text>
            </Heading>
            <HStack
                ml={'auto'}
            >
                <ColorModeToggle />
                <AuthButton />
            </HStack>
        </Flex>
      </Card>
  )
}

export default Navbar