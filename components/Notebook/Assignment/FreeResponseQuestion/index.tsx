import React from 'react';

import {FreeResponseQuestion as FreeResponseQuestionType} from "@/types/assignment/FreeResponseQuestion";
import Question from "@/components/Notebook/Assignment/Question";
import View from "@/components/Notebook/Assignment/FreeResponseQuestion/View";
import Edit from "@/components/Notebook/Assignment/FreeResponseQuestion/Edit";

interface Props {
    question: FreeResponseQuestionType,
    onConfirm?: () => Promise<void>;
}

const FreeResponseQuestion: React.FC<Props> = ({ question, onConfirm }) => {
    return (
        <Question
            viewComponent={() =>
                <View question={question}/>}
            editComponent={({changeMode}) =>
                <Edit
                    question={question}
                    changeMode={changeMode}
                />
            }
            onConfirm={onConfirm}
        />
    );
};

export default FreeResponseQuestion;
