import {useState} from "react";

import {useToast} from "@chakra-ui/react";

import {generateAssignment as generateAssignmentService} from "@/services/assignments";
import {addFreeResponseQuestion, addMultipleChoiceQuestion} from "@/services/questions";

import {Question, QuestionTypes} from "@/types/assignment/Question";
import {MultipleChoiceQuestion} from "@/types/commands/MultipleChoiceQuestion";
import {TextBasedQuestion} from "@/types/commands/TextBasedQuestion";
import {Assignment} from "@/types/assignment/Assignment";

const useGenerateAssignmentQuestions = (assignmentId: Assignment["id"]) => {

    const toast = useToast();

    const [loading, setLoading] = useState<boolean>(false);
    const [generatedQuestions, setGeneratedQuestions] = useState<Question<MultipleChoiceQuestion | TextBasedQuestion>[]>([]);

    const generateQuestions = async () => {
        setLoading(true);
        const generatedAssignment = await generateAssignmentService(assignmentId);
        console.log(generatedAssignment);
        setGeneratedQuestions(generatedAssignment.questions);
        setLoading(false);
    }

    const addQuestionToAssignment = async (index: number, questionNumber: number) => {
        const question = generatedQuestions[index];
        if(question.tag === QuestionTypes.MultipleChoice) {
            const mcqRow = await addMultipleChoiceQuestion({
                assignmentId,
                questionNumber,
                ...question.question as MultipleChoiceQuestion
            });
            if(mcqRow) {
                setGeneratedQuestions(generatedQuestions.filter((_, i) => i !== index));
                toast({
                    title: "Question added",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                })
            } else {
                toast({
                    title: "Question failed to add",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                })
            }
        } else {
            const frqRow = await addFreeResponseQuestion({
                assignmentId,
                questionNumber,
                ...question.question as TextBasedQuestion
            });
            if(frqRow) {
                setGeneratedQuestions(generatedQuestions.filter((_, i) => i !== index));
                toast({
                    title: "Question added",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                })
            } else {
                toast({
                    title: "Question failed to add",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                })
            }
        }
    }

    return {
        loading,
        generatedQuestions,
        generateQuestions,
        addQuestionToAssignment
    }
}

export default useGenerateAssignmentQuestions;