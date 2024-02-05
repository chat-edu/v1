import React from 'react';

import Edit from "@/components/Notebook/Assignment/Questions/MultipleChoiceQuestion/Edit";
import View from "@/components/Notebook/Assignment/Questions/MultipleChoiceQuestion/View";
import Question from "@/components/Notebook/Assignment/Questions/Question";

import {MultipleChoiceQuestion as MultipleChoiceQuestionType} from "@/types/assignment/MultipleChoiceQuestion";

interface Props {
    question: MultipleChoiceQuestionType,
    onConfirm?: () => Promise<void>;
    setAnswer: (answer: string) => void;
}

const MultipleChoiceQuestion: React.FC<Props> = ({ question, onConfirm, setAnswer }) => {
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

export default MultipleChoiceQuestion;
