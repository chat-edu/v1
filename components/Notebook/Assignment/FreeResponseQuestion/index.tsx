import React from 'react';

import {FreeResponseQuestion as FreeResponseQuestionType} from "@/types/assignment/FreeResponseQuestion";
import Question from "@/components/Notebook/Assignment/Question";
import View from "@/components/Notebook/Assignment/FreeResponseQuestion/View";
import Edit from "@/components/Notebook/Assignment/FreeResponseQuestion/Edit";

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
