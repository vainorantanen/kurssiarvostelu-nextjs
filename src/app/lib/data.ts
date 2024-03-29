"use server"

import prisma from '@/db';
import { getServerSession } from 'next-auth';
import { unstable_noStore as noStore } from 'next/cache';
import { authOptions } from '../api/auth/[...nextauth]/options';
import { redirect } from 'next/navigation';
import { Course, DegreeProgramme, Koulutusohjelma, School, SearchCoursesResultsWithTotal, SearchDegreeResultsWithTotal, SingleCourse, SingleDegreeProgramme } from '@/utils/types';

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

export async function getSearchCoursesPages(orgId: string, universityOrgId: string, query: string,
    orgRootId: string) {
    noStore()

    var textQuery = "";

    if (query && query.length > 0) {
        textQuery = `fullTextQuery=${query}&`
    }

    // form the org and org root search
    let organisationsQuery = "";
    if (orgId != 'none' && orgRootId != 'none') {
        organisationsQuery = `orgId=${orgId}`
    } else if (orgId != 'none' && orgRootId == 'none') {
        organisationsQuery = `orgId=${orgId}`
    } else if (orgId == 'none' && orgRootId != 'none') {
        organisationsQuery = `orgRootId=${orgRootId}`
    } else if (orgId == 'none' && orgRootId == 'none' && query.length >= 3) {
        // do nothing
    } else {
        return null
    }

    try {
        const res = await fetch(`https://sis-tuni.funidata.fi/kori/api/course-unit-search?${textQuery}limit=${itemsPerPage}&${organisationsQuery}&showMaxResults=false&start=0&uiLang=fi&universityOrgId=${universityOrgId}&validity=ONGOING_AND_FUTURE`)
        const resultData = await res.json()
        //console.log(resultData)
        const totalPages = Math.ceil(Number(resultData.total)/Number(resultData.limit))
        //console.log(totalPages)
        return totalPages
    } catch (error) {
        console.error('getSearchCoursePages error: ', error);
        throw new Error('Failed to fetch total pages');
    }
}

const itemsPerPage = 10

export async function getSearchCourses(orgId: string, universityOrgId: string,
    currentPage: number, query: string, orgRootId: string
    ){
    noStore()

    var textQuery = "";

    if (query && query.length > 0) {
        textQuery = `fullTextQuery=${query}&`
    }

    // form the org and org root search
    let organisationsQuery = "";
    if (orgId != 'none' && orgRootId != 'none') {
        organisationsQuery = `orgId=${orgId}`
    } else if (orgId != 'none' && orgRootId == 'none') {
        organisationsQuery = `orgId=${orgId}`
    } else if (orgId == 'none' && orgRootId != 'none') {
        organisationsQuery = `orgRootId=${orgRootId}`
    } else if (orgId == 'none' && orgRootId == 'none' && query.length >= 3) {
        // do nothing
    } else {
        return null
    }

    try {
        const res = await fetch(`https://sis-tuni.funidata.fi/kori/api/course-unit-search?${textQuery}limit=${itemsPerPage}&${organisationsQuery}&showMaxResults=false&start=${itemsPerPage*(currentPage-1)}&uiLang=fi&universityOrgId=${universityOrgId}&validity=ONGOING_AND_FUTURE`)
        const resultData = await res.json()
        //console.log(resultData)
        return resultData as SearchCoursesResultsWithTotal
    } catch (error) {
        console.error('getSearchCourses error: ', error);
        throw new Error('Failed to fetch courses');
    }
  }

// school = organisation

export async function getKoulutusOhjelmat(schoolId: string) {
    noStore()
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

  export async function getTiedekunnat(schoolId: string) {
    noStore()
    try {
        const res = await fetch(`https://sis-tuni.funidata.fi/kori/api/organisations/`)
    // käytetään koulutusohjelman tyyppiä koska se on sama kuin tiedekunnalla
        const data = await res.json() as Koulutusohjelma[]
    
    const tiedeKunnat = data
    .filter(d => d.universityOrgId === schoolId && d.parentId !== null && d.parentId === schoolId)
    .sort((a, b) => a.name.fi.localeCompare(b.name.fi));
    return tiedeKunnat
    } catch (error) {
        console.error('tiedeKunnat error: ', error);
        throw new Error('Failed to fetch tiedeKunnat');
    }
  }

export async function getSchools() {
    noStore()
    try {
        const res = await fetch("https://sis-tuni.funidata.fi/kori/api/organisations")
        const data = await res.json() as School[]
        
        const schools = data.filter(d => d.parentId == null)
        return schools
    } catch (error) {
        console.error('getSchools error: ', error);
        throw new Error('Failed to fetch koulut');
    }
    
  }

  export async function getReviewData(courseIds: string[]) {
    noStore()

    try {
        const res = await prisma.review.findMany({
            where: {
                courseSisuId: {
                  in: courseIds,
                },
              },
              select: {
                id: true,
                rating: true,
                courseSisuId: true
              },
    })
        return res
    } catch (error) {
        console.error('getReviewData error: ', error);
        throw new Error('Failed to fetch koulut');
    }

  }

  export async function getReviewsByCourse(courseSisuId: string) {
    
    noStore()
    try {
        const res = await prisma.review.findMany({ where: { courseSisuId } })
        return res
    } catch (error) {
        console.error('getReviews error: ', error);
        throw new Error('Failed to fetch reviews');
    }
  }
  
  export async function getUser(email: string) {
    return prisma.user.findUnique({ where: { email } })
  }

export async function getSearchDegreeProgrammes(schoolId: string, query: string,
    currentPage: number) {
    noStore()

    var textQuery = "";

    if (query && query.length > 0) {
        textQuery = `fullTextQuery=${query}&`
    }    

    try {
       const res = await fetch(`https://sis-tuni.funidata.fi/kori/api/module-search?${textQuery}limit=${itemsPerPage}&start=${itemsPerPage*(currentPage-1)}&universityOrgId=${schoolId}&moduleType=DegreeProgramme`)
       const data = await res.json()
       return data as SearchDegreeResultsWithTotal
    } catch (error) {
        throw new Error("Virhe haettaessa tietoja")
    }
}

export async function getSearchDegreeProgrammePages(schoolId: string, query: string) {

    noStore()

    var textQuery = "";

    if (query && query.length > 0) {
        textQuery = `fullTextQuery=${query}&`
    }

    try {
        const res = await fetch(`https://sis-tuni.funidata.fi/kori/api/module-search?${textQuery}limit=${itemsPerPage}&start=0&universityOrgId=${schoolId}&moduleType=DegreeProgramme`)
        const resultData = await res.json()
        //console.log(resultData)
        const totalPages = Math.ceil(Number(resultData.total)/Number(resultData.limit))
        //console.log(totalPages)
        return totalPages
    } catch (error) {
        console.error('getSearchCoursePages error: ', error);
        throw new Error('Failed to fetch total pages');
    }
}

export async function getDegree(degreeId: string) {
    noStore()

    try {
        const res = await fetch(`https://sis-tuni.funidata.fi/kori/api/modules?id=${degreeId}`)
        const data = await res.json()
        return data[0] as SingleDegreeProgramme
    } catch (error) {
        throw new Error("Failed fetching degree")
    }
}

export async function getReviewsByDegree(degreeId: string) {
    
    noStore()
    try {
        const res = await prisma.degreeReview.findMany({ where: { degreeId } })
        return res
    } catch (error) {
        console.error('getReviews error: ', error);
        throw new Error('Failed to fetch reviews');
    }
  }