import React from 'react';

import {FaSeedling} from "react-icons/fa6";

import Points from "@/components/Utilities/Points/Points";

interface Props {
    points: number
}

const NotebookPoints: React.FC<Props> = ({ points }) => {
    return (
        <Points
            points={points}
            pointsType={'Notebook'}
            icon={FaSeedling}
        />
    );
};

export default NotebookPoints;
