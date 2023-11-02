import {Message} from "ai";
import {AnswerCorrectness, Correctness} from "@/types/AnswerCorrectness";

export const answerCheckTag = 'Question Correctness';

export const correctTag = 'Correct';

export const incorrectTag = 'Incorrect';

export const explanationTag = 'Explanation';

export const parseAnswerCorrectness = (message: Message): AnswerCorrectness => {
    const content = message.content.split(`${answerCheckTag}: `)[1];
    let correct = Correctness.Unknown;
    let explanation = '';
    if(content) {
        const temp = content.split(`, ${explanationTag}: `);
        correct = temp[0] === correctTag ? Correctness.Correct : temp[0] === incorrectTag ? Correctness.Incorrect : Correctness.Unknown;
        explanation = temp[1];
    }
    return {
        correct,
        explanation
    }
}