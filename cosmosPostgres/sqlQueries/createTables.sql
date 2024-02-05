CREATE TABLE IF NOT EXISTS Users (
    id VARCHAR(255) PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    profile_picture_url VARCHAR(255),
    verified BOOLEAN DEFAULT FALSE,
    role VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS Notebooks (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    user_id VARCHAR(255),
    access_code VARCHAR(6) UNIQUE NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS Topics (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    notebook_id INT,
    order_position INT,
    parent_topic_id INT,
    FOREIGN KEY (notebook_id) REFERENCES Notebooks(id) ON DELETE CASCADE,
    FOREIGN KEY (parent_topic_id) REFERENCES Topics(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS Notes (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    content TEXT,
    notebook_id INT,
    topic_id INT,
    order_position INT,
    FOREIGN KEY (notebook_id) REFERENCES Notebooks(id) ON DELETE CASCADE,
    FOREIGN KEY (topic_id) REFERENCES Topics(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Scores (
    user_id VARCHAR(255),
    notebook_id INT,
    score INT,
    PRIMARY KEY (user_id, notebook_id),
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE,
    FOREIGN KEY (notebook_id) REFERENCES Notebooks(id) ON DELETE CASCADE
);

CREATE TABLE Assignments (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    topic_id INT REFERENCES topics(id)
);

CREATE TABLE FreeResponseQuestions (
    id SERIAL PRIMARY KEY,
    assignment_id INT,
    question TEXT NOT NULL,
    question_number INT NOT NULL,
    FOREIGN KEY (assignment_id) REFERENCES Assignments(id) ON DELETE CASCADE
);

CREATE TABLE MultipleChoiceQuestions (
    id SERIAL PRIMARY KEY,
    assignment_id INT,
    question TEXT NOT NULL,
    option_a TEXT,
    option_b TEXT,
    option_c TEXT,
    option_d TEXT,
    answer CHAR(1) CHECK(answer IN ('A', 'B', 'C', 'D')),
    question_number INT NOT NULL,
    FOREIGN KEY (assignment_id) REFERENCES Assignments(id) ON DELETE CASCADE
);

CREATE TABLE Enrollments (
    user_id VARCHAR(255),
    notebook_id INT,
    PRIMARY KEY (user_id, notebook_id),
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE,
    FOREIGN KEY (notebook_id) REFERENCES Notebooks(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS MultipleChoiceSubmissions (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(255),
    question_id INT,
    answer CHAR(1) CHECK(answer IN ('A', 'B', 'C', 'D')),
    points INT,
    grade_explanation TEXT,
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE,
    FOREIGN KEY (question_id) REFERENCES MultipleChoiceQuestions(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS FreeResponseSubmissions (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(255),
    question_id INT,
    answer TEXT,
    points INT,
    grade_explanation TEXT,
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE,
    FOREIGN KEY (question_id) REFERENCES FreeResponseQuestions(id) ON DELETE CASCADE
);

CREATE TABLE UserAssignmentSummaries (
    user_id VARCHAR(255),
    assignment_id INT,
    summary TEXT,
    PRIMARY KEY (user_id, assignment_id),
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE,
    FOREIGN KEY (assignment_id) REFERENCES Assignments(id) ON DELETE CASCADE
);

CREATE TABLE AssignmentSummaries (
    assignment_id INT,
    summary TEXT,
    PRIMARY KEY (assignment_id),
    FOREIGN KEY (assignment_id) REFERENCES Assignments(id) ON DELETE CASCADE
);

CREATE TABLE UserNotebookSummaries (
    user_id VARCHAR(255),
    notebook_id INT,
    summary TEXT,
    PRIMARY KEY (user_id, notebook_id),
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE,
    FOREIGN KEY (notebook_id) REFERENCES Notebooks(id) ON DELETE CASCADE
);

CREATE TABLE NotebookSummaries (
    notebook_id INT,
    summary TEXT,
    PRIMARY KEY (notebook_id),
    FOREIGN KEY (notebook_id) REFERENCES Notebooks(id) ON DELETE CASCADE
);

-- DROP ALL TABLES
DROP TABLE IF EXISTS Scores;
DROP TABLE IF EXISTS Topics;
DROP TABLE IF EXISTS Notes;
DROP TABLE IF EXISTS Notebooks;
DROP TABLE IF EXISTS Users;
DROP TABLE IF EXISTS Assignments;
DROP TABLE IF EXISTS FreeResponseQuestions;
DROP TABLE IF EXISTS MultipleChoiceQuestions;
DROP TABLE IF EXISTS Enrollments;
DROP TABLE IF EXISTS MultipleChoiceSubmissions;
DROP TABLE IF EXISTS FreeResponseSubmissions;
DROP TABLE IF EXISTS UserAssignmentSummaries;
DROP TABLE IF EXISTS AssignmentSummaries;
DROP TABLE IF EXISTS NotebookSummaries;
DROP TABLE IF EXISTS UserNotebookSummaries;