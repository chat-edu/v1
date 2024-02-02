import React from 'react';

import {
    Avatar,
    Button, HStack,
    IconButton, Menu,
    MenuButton,
    MenuItem,
    MenuList,
    useBreakpointValue
} from "@chakra-ui/react";
import {ChevronDownIcon} from "@chakra-ui/icons";

import {signOut} from "next-auth/react";

import Loading from "@/components/Utilities/Loading";

import useUser from "@/hooks/queries/user/useUser";

import {User} from "next-auth";

interface Props {
    user: User
}

const Profile: React.FC<Props> = ({ user }) => {

    const { userData, loading } = useUser(user.id)

    const menuButton = useBreakpointValue({
        base: (
            <MenuButton
                display={{base: 'flex', md: 'none'}}
                as={IconButton}
                aria-label={'Profile '}
                icon={
                    <Avatar
                        size={'sm'}
                        name={userData?.name || user.name || ""}
                        src={userData?.profilePictureUrl || ""}
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
                        name={userData?.name || ""}
                        src={userData?.profilePictureUrl || ""}
                    />
                }
            >
                {
                    userData ? (
                        `@${userData?.username}`
                    ) : (
                        user.name
                    )
                }
            </MenuButton>
        )
    })

    return (
        <Loading
            loading={loading}
            h={'40px'}
            w={'60px'}
        >
            <HStack
                align={'end'}
            >
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
            </HStack>
        </Loading>
    );
};

export default Profile;
