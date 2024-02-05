import React from 'react';

import {FreeResponseQuestion as FreeResponseQuestionType} from "@/types/assignment/FreeResponseQuestion";
import Question from "@/components/Notebook/Assignment/Questions/Question";
import View from "@/components/Notebook/Assignment/Questions/FreeResponseQuestion/View";
import Edit from "@/components/Notebook/Assignment/Questions/FreeResponseQuestion/Edit";

interface Props {
    question: FreeResponseQuestionType,
    onConfirm?: () => Promise<void>;
    setAnswer: (answer: string) => void;
}

const FreeResponseQuestion: React.FC<Props> = ({ question, onConfirm, setAnswer }) => {
    return (
        <Question
            viewComponent={() =>
                <View
                    question={question}
                    setAnswer={setAnswer}
                />
        }
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
