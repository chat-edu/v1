import React from 'react'

import {Card, Flex, HStack, Text} from '@chakra-ui/react'

import AuthButton from '@/components/Navbar/AuthButton'
import ColorModeToggle from "@/components/Navbar/ColorModeToggle";

export const navbarHeight = '80px'

const Navbar = () => {
  return (
      <Card
        p={2}
        rounded={'none'}
        h={navbarHeight}
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
            <Text
                fontSize='2xl'
                fontWeight='bold'
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
            </Text>
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