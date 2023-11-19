"use server"

import { unstable_noStore as noStore } from 'next/cache';

export async function getCourse(courseId: string) {
    noStore()
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
    noStore()
    try {
        const res = await fetch(`https://sis-tuni.funidata.fi/kori/api/organisations/${schoolId}`)
        const data = await res.json() as School
        
        return data
    } catch (error) {
        console.error('getSchool error: ', error);
        throw new Error('Failed to fetch school');
    }
}

export async function getSearchCoursesPages(orgId: string, universityOrgId: string) {
    noStore()
    try {
        const res = await fetch(`https://sis-tuni.funidata.fi/kori/api/course-unit-search?limit=10&orgId=${orgId}&showMaxResults=false&start=0&uiLang=fi&universityOrgId=${universityOrgId}&validity=ONGOING_AND_FUTURE`)
        const resultData = await res.json()
        console.log(resultData)
        const totalPages = Math.ceil(Number(resultData.total)/Number(resultData.limit))
        console.log(totalPages)
        return totalPages
    } catch (error) {
        console.error('getSearchCoursePages error: ', error);
        throw new Error('Failed to fetch total pages');
    }
}

const itemsPerPage = 10

export async function getSearchCourses(orgId: string, universityOrgId: string,
    currentPage: number
    ){
    noStore()
  
    try {
        const res = await fetch(`https://sis-tuni.funidata.fi/kori/api/course-unit-search?limit=${itemsPerPage}&orgId=${orgId}&showMaxResults=false&start=${itemsPerPage*(currentPage-1)}&uiLang=fi&universityOrgId=${universityOrgId}&validity=ONGOING_AND_FUTURE`)
        const resultData = await res.json()
        return resultData.searchResults as Course[]
    } catch (error) {
        console.error('getSearchCourses error: ', error);
        throw new Error('Failed to fetch courses');
    }
  }

// school = organisation

export async function getKoulutusOhjelmat(schoolId: string) {
    try {
        const res = await fetch(`https://sis-tuni.funidata.fi/kori/api/organisations/`)
    const data = await res.json() as Koulutusohjelma[]
    
    const koulutusOhjelmat = data
    .filter(d => d.universityOrgId === schoolId && d.parentId !== null && d.parentId !== schoolId)
    .sort((a, b) => a.name.fi.localeCompare(b.name.fi));
    return koulutusOhjelmat
    } catch (error) {
        console.error('getkoulutusOhjelmat error: ', error);
        throw new Error('Failed to fetch koulutusohjelmat');
    }
  }