import React from 'react'

import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Button, IconButton, useBreakpointValue, Avatar
} from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'

import {CgProfile} from "react-icons/cg";

import SignInWithGoogleButton from "@/components/Navbar/SignInWithGoogleButton";

import useAuth from "@/hooks/auth/useAuth";

const AuthButton = () => {

    const { isConnected, user, onSignOut } = useAuth();

    const menuButton = useBreakpointValue({
        base: <MenuButton
            as={IconButton}
            icon={<CgProfile />}
            aria-label={"Profile"}
        />,
        md: <MenuButton
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
    })

    if(!isConnected) {
        return (
            <SignInWithGoogleButton />
        )
    }

    if(isConnected) {
        return (
            <Menu>
                {menuButton}
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