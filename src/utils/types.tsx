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