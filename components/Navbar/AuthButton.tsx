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

import AuthProviderIconButtons from "@/components/AuthButtons/AuthProviderIconButtons";

import useAuth from "@/hooks/auth/useAuth";

const AuthButton = () => {

    const { isConnected, user, onSignOut } = useAuth();

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
                        onClick={() => onSignOut()}
                    >
                        Sign Out
                    </MenuItem>
                </MenuList>
            </Menu>
        )
    }
}

export default AuthButton