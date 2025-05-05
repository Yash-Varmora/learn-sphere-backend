const completedSession = (data) => {
    if (!data?.course?.sessions) return []
    
    return data.course.sessions.filter(session => {
        const lectures = session.lectures;
        if (lectures.length === 0) return true;

        const allLectureCompleted = lectures.every(lecture => lecture.completedLecture && lecture.completedLecture.length > 0)

        return allLectureCompleted
    })  
}

export default completedSession;