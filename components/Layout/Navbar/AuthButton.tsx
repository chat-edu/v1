import React from 'react'

import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Button,
    Avatar, IconButton
} from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'

import { signOut } from 'next-auth/react'

import AuthProviderIconButtons from "@/components/Utilities/AuthButtons/AuthProviderIconButtons";

import useAuth from "@/hooks/useAuth";

const AuthButton = () => {

    const { isConnected, user } = useAuth();

    if(!isConnected) {
        return (
            <AuthProviderIconButtons />
        )
    }

    if(isConnected) {
        return (
            <Menu>
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
                <MenuButton
                    display={{base: 'none', md: 'flex'}}
                    as={Button}
                    leftIcon={<Avatar
                        size={'sm'}
                        name={user?.name || ""}
                        src={user?.image || ""}
                    />}
                    rightIcon={<ChevronDownIcon />}

                >
                    {user?.name}
                </MenuButton>
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