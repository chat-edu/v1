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

-- DROP ALL TABLES
DROP TABLE IF EXISTS Scores;
DROP TABLE IF EXISTS Topics;
DROP TABLE IF EXISTS Notes;
DROP TABLE IF EXISTS Notebooks;
DROP TABLE IF EXISTS Users;