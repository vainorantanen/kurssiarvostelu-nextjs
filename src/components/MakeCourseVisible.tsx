"use client"

type CourseVisibleProps = {
    id: string
    makeCourseVisible: (courseId: string) => void
}

export default function MakeCourseVisible({ id, makeCourseVisible }: CourseVisibleProps) {

    return (
        <button onClick={() => makeCourseVisible(id)}>
            Approve
        </button>
    )
}