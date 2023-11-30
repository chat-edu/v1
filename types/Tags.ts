// used on the client side to display a tag's type
export interface TagType {
    name: string,
    parentTagTypeName: string | null,
}

// used on the client side to display a tag on a notebook
export interface Tag {
    tag: string,
    tagType: TagType
}

// enumerates the top-level tag types
export enum TagTypes {
    SCHOOL = 'school',
    TOPIC = 'topic',
}

// enumerates the types of school tags
export enum SchoolTagTypes {
    UNIVERSITY = 'university',
    HIGH_SCHOOL = 'high school',
    MIDDLE_SCHOOL = 'middle school',
    ELEMENTARY_SCHOOL = 'elementary school',
}

// enumerates the types of topic tags
export enum TopicTagTypes {
    SAT = 'SAT',
    ACT = 'ACT',
    MATH = 'math',
    SCIENCE = 'science',
    ENGLISH = 'english',
    HISTORY = 'history',
    COMPUTER_SCIENCE = 'computer science',
    ECONOMICS = 'economics',
    FOREIGN_LANGUAGE = 'foreign language',
    ART = 'art',
    MUSIC = 'music',
    AZURE = 'azure',
}