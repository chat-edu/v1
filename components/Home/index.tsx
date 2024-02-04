import React from 'react';

import TeacherClassrooms from "@/components/NotebookGrids/TeacherClassrooms";
import HomeHeader from "@/components/Home/HomeHeader";
import Container from "@/components/Utilities/Container";
import useAuth from "@/hooks/useAuth";
import Overview from "@/components/Home/Overview";
import useUser from "@/hooks/queries/user/useUser";
import StudentClassrooms from "@/components/NotebookGrids/StudentClassrooms";

const Home = () => {

    const { user } = useAuth();

    const { isTeacher } = useUser(user?.id || '')

    return (
        <Container>
            <HomeHeader />
            {
                user ? (
                    isTeacher ? (
                        <TeacherClassrooms />
                    ) : (
                        <StudentClassrooms />
                    )

                ) : (
                    <Overview />
                )
            }

        </Container>
    );
};

export default Home;
