export type Course = {
    id: string;
    name: string;
    code: string
    credits: Credits
    groupId: string;
    universityOrgIds: string[]; // Assuming it's an array of strings
    organisations: string[]; // Assuming it's an array of strings
    lang: string;
    activityPeriods: any[]; // Replace 'any' with the appropriate type
  };
  
 export type Credits = {
    min: number;
    max: number;
  };

export  type SingleCourse = {
    id: string;
    name: SingleCourseName;
    code: string
    credits: Credits
    groupId: string;
    universityOrgIds: string[];
  }

export  type SingleCourseName = {
    en: string;
    fi: string;
  }

export  type School = {
    id: string;
    name: SchoolName;
    parentId: string | null;
    code: string;
  };

export  type Koulutusohjelma = {
    id: string;
    parentId: string;
    name: SchoolName;
    code: string;
    universityOrgId: string
  }

export type SchoolName = {
  en: string;
  fi: string
}

export type SearchCoursesResultsWithTotal = {
  total: number,
  searchResults: Course[]
}

export type SearchDegreeResultsWithTotal = {
  total: number,
  searchResults: DegreeProgramme[]
}

export type DegreeProgramme = {
  id: string,
  code: string,
  name: string,
  credits: Credits
}

export type SingleDegreeProgramme = {
  id: string,
  name: SchoolName,
  documentState: string,
  groupId: string,
  code: string
  contentDescription: DegreeText,
  learningOutcomes: DegreeText,
  targetCredits: Credits
}

export type DegreeText = {
  fi: string
}

export enum GradingCriteria {
  Läsnäolopainotteinen = 'Läsnäolopainotteinen',
  Osallistumispainotteinen = 'Osallistumispainotteinen',
  Tehtäväpainotteinen = 'Tehtäväpainotteinen',
  Esseepainotteinen = 'Esseepainotteinen',
  Projektipainotteinen = 'Projektipainotteinen',
  Koepainotteinen = 'Koepainotteinen',
}

export enum DeliveryMethod {
  Läsnäolo = 'Läsnäolo',
  Etä = 'Etä',
  Hybridi = 'Hybridi',
  EiValintaa = 'Ei valintaa',
}

export enum Workload {
  TodellaKevyt = 'Todella kevyt',
  Kevyt = 'Kevyt',
  Sopiva = 'Sopiva',
  Suuri = 'Suuri',
  LiianSuuri = 'Liian suuri',
}

export enum UserGrade {
  Zero = '0',
  One = '1',
  Two = '2',
  Three = '3',
  Four = '4',
  Five = '5',
  NotWannaSay = 'En halua kertoa'
}

export enum UserYear {
  VUONNA_1 = '1. vuonna',
  VUONNA_2 = '2. vuonna',
  VUONNA_3 = '3. vuonna',
  VUONNA_4 = '4. vuonna',
  VUONNA_5 = '5. vuonna',
  VUONNA_6 = '6. vuonna',
  VUONNA_N = 'N. vuonna',
  EN_HALUA_KERTOA = 'En halua kertoa',
}

export enum WriterEmploymentStatus {
  Working = "Työllistynyt",
  NotWorking = "Työtön",
  DoNotTell = 'En halua kertoa'
}