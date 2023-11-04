"use client"

type CourseVisibleProps = {
    id: string
    makeCourseVisible: (courseId: string) => void
}

export default function MakeCourseVisible({ id, makeCourseVisible }: CourseVisibleProps) {

    return (
        <button
        className="bg-blue-500 hover:underline hover:bg-blue-800 py-2 px-2"
        onClick={() => makeCourseVisible(id)}>
            Approve
        </button>
    )
}