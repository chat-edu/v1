import React from 'react';

import {IconButton, IconButtonProps, Tooltip} from "@chakra-ui/react";

interface Props extends IconButtonProps {}

const TooltipIconButton: React.FC<Props> = (props) => {
    return (
        <Tooltip
            label={props['aria-label']}
        >
            <IconButton
                {...props}
                onClick={(e) => {
                    e.stopPropagation();
                    props.onClick && props.onClick(e);
                }}
            />
        </Tooltip>
    );
};

export default TooltipIconButton;
