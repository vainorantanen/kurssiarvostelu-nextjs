"use server"

export async function getCourse(courseId: string) {
    try {
        const res = await fetch(`https://sis-tuni.funidata.fi/kori/api/course-units/v1/${courseId}`)
        const resultData = await res.json()
        return resultData as SingleCourse
    } catch (error) {
        console.error('getCourse error: ', error);
        throw new Error('Failed to fetch course');
    }
  }

export async function getSchool(schoolId: string) {
    try {
        const res = await fetch(`https://sis-tuni.funidata.fi/kori/api/organisations/${schoolId}`)
        const data = await res.json() as School
        
        return data
    } catch (error) {
        console.error('getSchool error: ', error);
        throw new Error('Failed to fetch school');
    }
    
  }