import {addTopicCompletion, addTopicNode, findTopicNodesByNotebookId} from "@/cosmosPostgres/services/knowledgeGraph";

import {NotebookIdParams} from "@/app/api/topicNodes/[notebookId]/NotebookIdParams";
import {findTopicsByNotebookId} from "@/cosmosPostgres/services/topic";
import {findEnrolledUsersByNotebookId} from "@/cosmosPostgres/services/user";
import {findAssignmentsByTopicId} from "@/cosmosPostgres/services/assignments";
import {findUserSubmissionsByAssignment} from "@/cosmosPostgres/services/submissions";
import {QuestionTypes} from "@/types/assignment/Question";

export const GET = async (req: Request, {params}: {params: NotebookIdParams}) => {
    return Response.json(await findTopicNodesByNotebookId(params.notebookId));
}

export const POST = async (req: Request, {params}: {params: NotebookIdParams}) => {
    const topics = await findTopicsByNotebookId(params.notebookId);
    const users = await findEnrolledUsersByNotebookId(params.notebookId);
    await Promise.all(topics.map(async (topic, index) => {
        await addTopicNode({
            topic_id: topic.id,
            x: 0,
            y: index * 50
        });
        const assignments = await findAssignmentsByTopicId(topic.id);
        await Promise.all(users.map(async user => {
            const grades = await Promise.all(assignments.map(async assignment => {
                const [freeResponseSubmissions, multipleChoiceSubmissions] = await Promise.all([
                    findUserSubmissionsByAssignment(user.id, assignment.id, QuestionTypes.FreeResponse),
                    findUserSubmissionsByAssignment(user.id, assignment.id, QuestionTypes.MultipleChoice)
                ]);
                const freeResponseGrade = freeResponseSubmissions.reduce((acc, submission) => acc + (submission.points || 0), 0);
                const multipleChoiceGrade = multipleChoiceSubmissions.reduce((acc, submission) => acc + (submission.points || 0), 0);
                const numQuestions = freeResponseSubmissions.length + multipleChoiceSubmissions.length;
                const totalGrade = freeResponseGrade + multipleChoiceGrade;
                if(numQuestions === 0) {
                    return 0;
                } else {
                    return totalGrade / numQuestions;
                }
            }));
            await addTopicCompletion({
                topic_id: topic.id,
                completion_percentage: grades.reduce((acc, grade) => acc + grade, 0) / grades.length,
                user_id: user.id
            })
        }));
    }));
    return Response.json({success: true});
}