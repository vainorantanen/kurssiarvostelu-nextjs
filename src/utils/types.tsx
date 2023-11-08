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
  }

  type SingleCourseName = {
    en: string;
    fi: string;
  }