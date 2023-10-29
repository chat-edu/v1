import React from 'react'

import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Button,
    Avatar
} from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'

import SignInWithGoogleButton from "@/components/Navbar/SignInWithGoogleButton";

import useAuth from "@/hooks/auth/useAuth";

const AuthButton = () => {

    const { isConnected, user, onSignOut } = useAuth();

    if(!isConnected) {
        return (
            <SignInWithGoogleButton />
        )
    }

    if(isConnected) {
        return (
            <Menu>
                <MenuButton
                    as={Button}
                    leftIcon={<Avatar
                        size={'sm'}
                        name={user?.displayName || ""}
                        src={user?.photoURL || ""}
                    />}
                    rightIcon={<ChevronDownIcon />}
                >
                    {user?.displayName}
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