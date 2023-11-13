type Course = {
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
  
  type Credits = {
    min: number;
    max: number;
  };

  type SingleCourse = {
    id: string;
    name: SingleCourseName;
    code: string
    credits: Credits
    groupId: string;
    universityOrgIds: string[];
  }

  type SingleCourseName = {
    en: string;
    fi: string;
  }

  type School = {
    id: string;
    name: SchoolName;
    parentId: string | null;
    code: string;
  };

  type Koulutusohjelma = {
    id: string;
    parentId: string;
    name: SchoolName;
    code: string;
    universityOrgId: string
  }

type SchoolName = {
  en: string;
  fi: string
}

