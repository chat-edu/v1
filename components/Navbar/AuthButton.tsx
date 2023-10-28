import React from 'react'

import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Button, IconButton, useBreakpointValue
} from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'

import SignInWithGoogleButton from "@/components/Navbar/SignInWithGoogleButton";

import {CgProfile} from "react-icons/cg";

const AuthButton = () => {

    const isConnected = false;
    const onSignOut = () => {}


    const menuButton = useBreakpointValue({
        base: <MenuButton
            as={IconButton}
            icon={<CgProfile />}
            aria-label={"Profile"}
        />,
        md: <MenuButton
            as={Button}
            rightIcon={<ChevronDownIcon />}
        >
            User Name
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