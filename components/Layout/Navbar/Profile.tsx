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

import UserPoints from "@/components/Utilities/Points/UserPoints";
import Loading from "@/components/Utilities/Loading";

import useUserScore from "@/hooks/queries/scores/users/useUserScore";

import {User} from "next-auth";

interface Props {
    user: User
}

const Profile: React.FC<Props> = ({ user }) => {

    const { userScore, loading } = useUserScore(user.id)

    const menuButton = useBreakpointValue({
        base: (
            <MenuButton
                display={{base: 'flex', md: 'none'}}
                as={IconButton}
                aria-label={'Profile '}
                icon={
                    <Avatar
                        size={'sm'}
                        name={userScore?.name || user.name || ""}
                        src={userScore?.profilePictureUrl || ""}
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
                        name={userScore?.name || ""}
                        src={userScore?.profilePictureUrl || ""}
                    />
                }
            >
                {
                    userScore ? (
                        `@${userScore?.username}`
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
                {
                    userScore && (
                        <UserPoints
                            points={userScore?.score || 0}
                        />
                    )
                }
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
