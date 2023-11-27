import React from 'react'

import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Button,
    Avatar, IconButton, useBreakpointValue
} from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'

import { signOut } from 'next-auth/react'

import AuthProviderIconButtons from "@/components/Utilities/AuthButtons/AuthProviderIconButtons";

import useAuth from "@/hooks/useAuth";

const AuthButton = () => {

    const { isConnected, user } = useAuth();

    const menuButton = useBreakpointValue({
        base: (
            <MenuButton
                display={{base: 'flex', md: 'none'}}
                as={IconButton}
                aria-label={'Profile '}
                icon={
                    <Avatar
                        size={'sm'}
                        name={user?.name || ""}
                        src={user?.image || ""}
                    />
                }
            />
        ),
        md: (
            <MenuButton
                as={Button}
                rightIcon={<ChevronDownIcon />}
                leftIcon={
                    <Avatar
                        size={'sm'}
                        name={user?.name || ""}
                        src={user?.image || ""}
                    />
                }
            >
                {user?.name}
            </MenuButton>
        )
    })

    if(!isConnected) {
        return (
            <AuthProviderIconButtons />
        )
    }

    if(isConnected) {
        return (
            <Menu>
                {menuButton}
                <MenuList>
                    <MenuItem
                        onClick={() => signOut()}
                    >
                        Sign Out
                    </MenuItem>
                </MenuList>
            </Menu>
        )
    }
}

export default AuthButton