-- Insert the parent 'school' tag type
INSERT INTO TagTypes(name) VALUES ('school');

-- Insert child tag types with 'school' as their parent
INSERT INTO TagTypes(name, parent_type_name) VALUES ('university', 'school');
INSERT INTO TagTypes(name, parent_type_name) VALUES ('high school', 'school');
INSERT INTO TagTypes(name, parent_type_name) VALUES ('middle school', 'school');
INSERT INTO TagTypes(name, parent_type_name) VALUES ('elementary school', 'school');

-- Insert 'courses' and 'seminars' tag types with 'university' as their parent
INSERT INTO TagTypes(name, parent_type_name) VALUES ('course', 'university');
INSERT INTO TagTypes(name, parent_type_name) VALUES ('seminar', 'university');

-- Insert the 'topic' tag type
INSERT INTO TagTypes(name) VALUES ('topic');
