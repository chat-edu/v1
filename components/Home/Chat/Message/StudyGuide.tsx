import React from 'react'

import Markdown from "@/components/Utilities/Markdown";

import {StudyGuide as StudyGuideType} from "@/types/StudyGuide";

interface Props {
    studyGuide: StudyGuideType
}

const StudyGuide: React.FC<Props> = ({ studyGuide}) => {
    return (
        <Markdown
            content={studyGuide.content}
        />
    );
};

export default StudyGuide;
