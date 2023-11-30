import React from 'react';
import Points from "@/components/Utilities/Points/Points";
import {GiAcorn} from "react-icons/gi";

interface Props {
    points: number
}

const UserPoints: React.FC<Props> = ({ points }) => {
    return (
        <Points
            points={points}
            icon={GiAcorn}
        />
    );
};

export default UserPoints;
