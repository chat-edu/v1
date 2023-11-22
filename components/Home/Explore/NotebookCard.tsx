import React from 'react';

import Link from "next/link";

import ClickableCard from "@/components/Utilities/ClickableCard";

import {Notebook} from "@/types/Notebook";

interface Props {
    notebook: Notebook
}

const NotebookCard: React.FC<Props> = ({ notebook }) => {
    return (
        <Link
            href={`/notebook/${notebook.id}`}
            style={{
                width: '100%'
            }}
        >
            <ClickableCard
                onClick={() => {}}
                flex={1}
                w={'100%'}
            >
                {notebook.name}
            </ClickableCard>
        </Link>
    );
};

export default NotebookCard;
