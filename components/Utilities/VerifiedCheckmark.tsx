import React from 'react';

import {Flex, Icon, IconProps, Tooltip} from "@chakra-ui/react";
import {MdVerified} from "react-icons/md";

const VerifiedCheckmark: React.FC<IconProps> = (props) => {
    return (
        <Tooltip label='Verified'>
            <Flex
                align={'center'}
            >
                <Icon
                    as={MdVerified}
                    color={'brand.500'}
                    p={0}
                    boxSize={{
                        base: 4,
                        md: 5
                    }}
                    {...props}
                />
            </Flex>
        </Tooltip>
    );
};

export default VerifiedCheckmark;
