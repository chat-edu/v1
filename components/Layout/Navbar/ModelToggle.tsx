import React from 'react';
import {useModel} from "@/contexts/ModelContext";
import {
    Avatar,
    Button,
    HStack,
    IconButton, Image,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    useBreakpointValue
} from "@chakra-ui/react";
import {ChevronDownIcon} from "@chakra-ui/icons";
import Loading from "@/components/Utilities/Loading";
import {signOut} from "next-auth/react";
import {Model} from "@/types/Model";

const getModelLogo = (model: Model) => {
    switch (model) {
        case Model.OPENAI:
            return '/icons/openai.png';
        case Model.ANTHROPIC:
            return '/icons/anthropic.png';
        case Model.GOOGLE:
            return '/icons/google.png';
        default:
            return '';
    }
}

const ModelToggle = () => {

    const { model, setModel } = useModel();

    const menuButton = useBreakpointValue({
        base: (
            <MenuButton
                display={{base: 'flex', md: 'none'}}
                as={IconButton}
                aria-label={'Profile '}
                icon={
                    <Avatar
                        size={'sm'}
                        name={model}
                        // src={userData?.profilePictureUrl || ""}
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
                        name={model}
                        src={getModelLogo(model)}
                    />
                }
            >
                {
                    model
                }
            </MenuButton>
        )
    })

    return (
        <Menu>
            {menuButton}
            <MenuList>
                <MenuItem
                    key={Model.OPENAI}
                    onClick={() => setModel(Model.OPENAI)}
                    icon={<Avatar
                        size={'sm'}
                        name={model}
                        src={getModelLogo(Model.OPENAI)}
                    />}
                >
                    {Model.OPENAI}
                </MenuItem>
                <MenuItem
                    key={Model.ANTHROPIC}
                    onClick={() => setModel(Model.ANTHROPIC)}
                    icon={<Avatar
                        size={'sm'}
                        name={model}
                        src={getModelLogo(Model.ANTHROPIC)}
                    />}
                >
                    {Model.ANTHROPIC}
                </MenuItem>
                <MenuItem
                    key={Model.GOOGLE}
                    onClick={() => setModel(Model.GOOGLE)}
                    icon={<Avatar
                        size={'sm'}
                        name={model}
                        src={getModelLogo(Model.GOOGLE)}
                    />}
                >
                    {Model.GOOGLE}
                </MenuItem>
            </MenuList>
        </Menu>
    );
};

export default ModelToggle;
