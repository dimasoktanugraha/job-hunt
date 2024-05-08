export type categoryJobType = {
  id: string;
  name: string;
  totalJobs: number;
};

export type JobType = {
  id: string;
  image: string;
  jobType: string;
  name: string;
  type: string;
  location: string;
  desc: string;
  category: categoryJobType;
  needs: number;
  applicants: number;
  skills: string[];
};

export type optionType = {
  id: string;
  label: string;
};

export type filterFormType = {
  label: string;
  name: string;
  items: optionType[];
};

export type companyTeamType = {
  id: string;
  name: string;
  position: string;
  instagram: string;
  linkedin: string;
};
export type companySocmedType = {
  id: string;
  instagram: string;
  linkedin: string;
  twitter: string;
  youtube: string;
  facebook: string;
};

export type companyType = {
  id: string;
  image: string;
  name: string;
  totalJobs: number;
  description: string;
  website: string;
  location: string;
  industry: string;
  employee: string;
  dateFounded: Date;
  techStack: string[];
  teams: companyTeamType[];
  socmed: companySocmedType;
};
