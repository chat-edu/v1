import React from 'react';

import {Stack} from "@chakra-ui/react";

import {FaLeaf} from "react-icons/fa";
import {MdQuestionAnswer} from "react-icons/md";
import {SlOptionsVertical} from "react-icons/sl";

import Action from "@/components/Home/Chat/Action";


const Actions = () => {
    return (
        <Stack
            w={'100%'}
            spacing={4}
            flexDirection={{ base: "column", md: "row" }}
        >
            <Action
                label={"Study Guide"}
                description={"Generate a study guide based on your notes"}
                icon={FaLeaf}
                onClick={() => {}}
            />
            <Action
                label={"Multiple Choice"}
                description={"Test your knowledge with multiple choice questions"}
                icon={SlOptionsVertical}
                onClick={() => {}}
            />
            <Action
                label={"Free-form Questions"}
                description={"Test your knowledge with free-form questions"}
                icon={MdQuestionAnswer}
                onClick={() => {}}
            />
            {/*<Flex*/}
            {/*    as={Card}*/}
            {/*    maxW='sm'*/}
            {/*    flexDirection="column"*/}
            {/*    alignItems="center"*/}
            {/*    justifyContent="center"*/}
            {/*    padding="1em" // Add some padding for aesthetics*/}
            {/*>*/}
            {/*    <CardBody>*/}
            {/*        <Heading size='md' textAlign="center">Learn with EduGPT</Heading>*/}
            {/*        <Image*/}
            {/*            src='https://www.clipartbest.com/cliparts/9iR/gdy/9iRgdyE4T.png'*/}
            {/*            alt='Green double couch with wooden legs'*/}
            {/*            borderRadius='lg'*/}
            {/*        />*/}
            {/*        <Text textAlign="center">*/}
            {/*            This sofa is perfect for modern tropical spaces, baroque inspired*/}
            {/*            spaces, earthy toned spaces and for people who love a chic design with a*/}
            {/*            sprinkle of vintage design.*/}
            {/*        </Text>*/}
            {/*    </CardBody>*/}
            {/*    <Divider />*/}
            {/*    <Box as={CardFooter} width="100%" display="flex" justifyContent="flex-end">*/}
            {/*        <Button*/}
            {/*            flex={1}*/}
            {/*            colorScheme="brand"*/}
            {/*            backgroundColor={'brand.500'}*/}
            {/*            color={'white'}*/}
            {/*            borderRadius="3xl"*/}
            {/*            _hover={{*/}
            {/*                backgroundColor: 'brand.700'*/}
            {/*            }}*/}
            {/*        >*/}
            {/*            Learn  */}
            {/*        </Button>*/}
            {/*    </Box>*/}
            {/*</Flex>*/}
            {/*    <MultipleChoice*/}
            {/*        notes={notes}*/}
            {/*    />*/}
            {/*    <Flex*/}
            {/*    as={Card}*/}
            {/*    maxW='sm'*/}
            {/*    flexDirection="column"*/}
            {/*    alignItems="center"*/}
            {/*    justifyContent="center"*/}
            {/*    padding="1em" // Add some padding for aesthetics*/}
            {/*>*/}
            {/*    <CardBody>*/}
            {/*        <Heading size='md' textAlign="center">Quiz yourself using Short Answers</Heading>*/}
            {/*        <Image*/}
            {/*            src='https://www.clipartbest.com/cliparts/9iR/gdy/9iRgdyE4T.png'*/}
            {/*            alt='Green double couch with wooden legs'*/}
            {/*            borderRadius='lg'*/}
            {/*        />*/}
            {/*        <Text textAlign="center">*/}
            {/*            This sofa is perfect for modern tropical spaces, baroque inspired*/}
            {/*            spaces, earthy toned spaces and for people who love a chic design with a*/}
            {/*            sprinkle of vintage design.*/}
            {/*        </Text>*/}
            {/*    </CardBody>*/}
            {/*    <Divider />*/}
            {/*    <Box as={CardFooter} width="100%" display="flex" justifyContent="flex-end">*/}
            {/*        <Button*/}
            {/*            flex={1}*/}
            {/*            colorScheme="brand"*/}
            {/*            backgroundColor={'brand.500'}*/}
            {/*            color={'white'}*/}
            {/*            borderRadius="3xl"*/}
            {/*            _hover={{*/}
            {/*                backgroundColor: 'brand.700'*/}
            {/*            }}*/}
            {/*        >*/}
            {/*            Short Answer  */}
            {/*        </Button>*/}
            {/*    </Box>*/}
            {/*</Flex>*/}
        </Stack>
    );
};

export default Actions;
