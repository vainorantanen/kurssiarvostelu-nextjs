"use client"

type DeleteCourseProps = {
    id: string
    deleteCourse: (id: string) => void
  }

export default function DeleteCourseButton({ id, deleteCourse }: DeleteCourseProps) {
  return (
    <div>
      <button onClick={() => deleteCourse(id)}>Poista</button>
    </div>
  )
}