export const grades = [
    {
        grade: "F",
        cutoff: 59
    },
    {
        grade: "D",
        cutoff: 69
    },
    {
        grade: "C",
        cutoff: 79
    },
    {
        grade: "B",
        cutoff: 89
    },
    {
        grade: "A",
        cutoff: 100
    }
]

export const calculateGrade = (points: number, totalPoints: number) => {
    const percentage = (points / totalPoints) * 100
    for (const grade of grades) {
        if (percentage < grade.cutoff) {
            return grade.grade
        }
    }
    return "A"
}