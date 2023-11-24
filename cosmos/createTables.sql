CREATE TABLE IF NOT EXISTS ${USER_TABLE} (
    id VARCHAR(255) PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(255),
    email VARCHAR(255) UNIQUE
);

CREATE TABLE IF NOT EXISTS ${NOTEBOOK_TABLE} (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    user_id VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES ${USER_TABLE}(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS ${NOTE_TABLE} (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    content TEXT,
    notebook_id INT,
    FOREIGN KEY (notebook_id) REFERENCES ${NOTEBOOK_TABLE}(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS ${SCORE_TABLE} (
    user_id VARCHAR(255),
    notebook_id INT,
    score INT,
    PRIMARY KEY (user_id, notebook_id),
    FOREIGN KEY (user_id) REFERENCES ${USER_TABLE}(id) ON DELETE CASCADE,
    FOREIGN KEY (notebook_id) REFERENCES ${NOTEBOOK_TABLE}(id) ON DELETE CASCADE
);

SELECT
    n.id AS notebookId,
    n.name AS notebookName,
    u.name AS userName,
    SUM(s.score) AS totalScore,
    COUNT(nt.id) AS numNotes
FROM Notebooks n
         JOIN Users u ON n.user_id = u.id
         LEFT JOIN Scores s ON n.id = s.notebook_id
         LEFT JOIN Notes nt ON n.id = nt.notebook_id
GROUP BY n.id, u.name
ORDER BY totalScore DESC, numNotes DESC
LIMIT 10;