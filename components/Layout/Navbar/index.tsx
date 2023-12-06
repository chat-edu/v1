import React from 'react'

import {Card, Flex, Heading, HStack, Text, Image, Box} from '@chakra-ui/react'

import Link from "next/link";

import AuthButton from '@/components/Layout/Navbar/AuthButton'
import ColorModeToggle from "@/components/Layout/Navbar/ColorModeToggle";
import NavLinks from "@/components/Layout/Navbar/NavLinks";
import SearchBar from "@/components/Layout/Navbar/SearchBar/SearchBar";

export const navbarHeight = 80;
export const mobileNavbarHeight = 60;

interface Props {
    isOnboarding?: boolean
}

const Navbar: React.FC<Props> = ({ isOnboarding }) => {
  return (
      <Card
        p={2}
        rounded={'none'}
        h={{
            base: `${mobileNavbarHeight}px`,
            md: `${navbarHeight}px`
        }}
        display={'flex'}
        justifyContent={'center'}
      >
        <Flex
            alignItems="center"
            w='100%'
            bg='navbar.500'
            rounded='md'
            px={{
                base: 2,
                md: 4
            }}
            gap={8}
            justifyContent={'space-between'}
        >
            <Link href={'/'}>
                <HStack
                    spacing={4}
                >
                    <Image
                        src={'/logo.png'}
                        alt="ChatEDU Logo"
                        boxSize={'40px'}
                    />
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
                </HStack>
            </Link>
            <Box
                display={{
                    base: 'none',
                    md: isOnboarding ? 'none' : 'flex'
                }}
                flexShrink={0}
            >
                <NavLinks />
            </Box>
            {
                !isOnboarding && (
                    <SearchBar />
                )
            }
            <HStack
                justify={'flex-end'}
            >
                <AuthButton />
                <ColorModeToggle />
            </HStack>
        </Flex>
      </Card>
  )
}

export default Navbar