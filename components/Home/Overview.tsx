import React from 'react';
import {Text, Image, VStack} from "@chakra-ui/react";
import BoldText from "@/components/Utilities/BoldText";

const Overview = () => {
    return (
        <VStack
            w={'100%'}
            flex={1}
        >
            <Image
                alt={'Overview'}
                src={'diagrams/overview.png'}
                maxW={'600px'}
            />
            <Text>
                <BoldText color={'brand.500'}>ChatEDU</BoldText> is a <BoldText color={'brand.500'}>Multi-agent AI Education Framework</BoldText> that uses an <BoldText>adaptive feedback loop</BoldText> to enhance traditional in-class learning. Students interact with <BoldText color={'brand.500'}>Personalized Virtual Tutors</BoldText>, which tailor content and lessons to their skill level using materials provided by the instructor. <BoldText color={'brand.500'}>Supervising Teaching Assistants</BoldText> analyze students’ performance and provide teachers with actionable insights, such as which topics to revisit in class.
            </Text>
            <Image
                alt={'Virtual Tutor'}
                src={'diagrams/virtual_tutor.png'}
                maxW={'600px'}
            />
            <Text>
                Personalized Virtual Tutors (PVTs) are learning agents that dynamically adapt to individual learning styles. Teachers initialize PVTs by uploading their course materials, such as their slide decks and worksheets, and ChatEDU modularizes the course topics into portable chunks. Students then engage with interactive Q&A and custom examples, making learning at home easier than ever. Progress tracking and knowledge graphs guide students along personalized educational pathways, while gamified achievements and media-rich content keep motivation high.
            </Text>
            <Image
                alt={'Knowledge Graph'}
                src={'diagrams/knowledge_graph.png'}
                maxW={'600px'}
            />
            <Text>
                Knowledge Graphs visually outline conceptual connections and personalized learning paths that adapt to each student`&apos;s performance. These graphs are generated using accredited learning standards, and present educators with detailed insights into students`&apos; strengths and learning gaps. These clear, visual indicators of student performance enable teachers to implement targeted, individualized teaching approaches. Students benefit from a structured, goal-oriented learning journey tailored to their unique abilities and pace. Dynamically maintained by PVTs, Knowledge Graphs ensure a clear and adaptive educational experience, steering away from a one-size-fits-all approach and reinforcing achievement of learning objectives.
            </Text>
            <Image
                alt={'Content Assignments'}
                src={'diagrams/content_assignments.png'}
                maxW={'600px'}
            />
            <Text>
                Interactive Content Modules and Comprehension Assignments complement PVTs by delivering custom educational materials and assessments. Student interactions with these modules dynamically refine each student`&apos;s Knowledge Graph and learning trajectory. This cohesive system ensures that content delivery and comprehension tasks are continuously adapted to individual progress, driving effective and personalized educational pathways.
            </Text>
            <Image
                alt={'Teaching Agent'}
                src={'diagrams/teaching_agent.png'}
                maxW={'600px'}
            />
            <Text>
                ChatEDU`&apos;s Supervising Teaching Assistants serve as a conduit between personalized student tutoring and broader classroom insights, equipping educators with synthesized data on student performance and learning gaps. This integration allows for targeted teaching interventions and informed lesson planning, ensuring a tailored educational approach that evolves with student needs.
            </Text>
        </VStack>
    );
};

export default Overview;
