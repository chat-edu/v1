import React from 'react';

import {Skeleton} from "@chakra-ui/react";

import TeacherClassrooms from "@/components/NotebookGrids/TeacherClassrooms";
import HomeHeader from "@/components/Home/HomeHeader";
import Container from "@/components/Utilities/Container";
import Overview from "@/components/Home/Overview";
import StudentClassrooms from "@/components/NotebookGrids/StudentClassrooms";

import {useCurrentUser} from "@/contexts/CurrentUserContext";

const Home = () => {

    const { isTeacher, loading, user } = useCurrentUser();

    return (
        <Container>
            <HomeHeader />
            {
                loading ? (
                    <Skeleton />
                ) : (
                    user ? (
                        isTeacher ? (
                            <TeacherClassrooms />
                        ) : (
                            <StudentClassrooms />
                        )
                    ) : (
                        <Overview />
                    )
                )
            }

        </Container>
    );
};

export default Home;
