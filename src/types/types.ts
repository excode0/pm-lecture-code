interface ILecturer {
  id: number;
  fullName: string;
  email: string;
  nidn: string; // National Lecturer ID
  department: string;
  faculty: string;
  position: string; // e.g., "Professor", "Associate Professor"
  status: 'active' | 'inactive';
  nationality: string;
  passportNumber: string;
  visaStatus: string; // e.g., "Work Visa", "Research Visa"
  institutionOrigin: string; // University/Institution of origin
  // profilePicture: string;
  languageProficiency: string[]; // List of spoken languages
  education: {
    degree: string;
    major: string;
    university: string;
    graduationYear: number;
  }[];
  experience: {
    position: string;
    institution: string;
    startDate: Date;
    endDate?: Date; // Undefined if still active
  }[];
  researchInterest?: string; // Optional research focus
  publications?: {
    title: string;
    journal: string;
    year: number;
    doi?: string;
  }[];
  projects?: {
    title: string;
    fundingAgency: string;
    budget: number;
    duration: string; // e.g., "2021-2024"
    role: string; // e.g., "Principal Investigator"
  }[];
  awards?: {
    title: string;
    year: number;
    institution: string;
  }[];
  coursesTaught?: {
    courseCode: string;
    courseName: string;
    semester: string;
  }[];
  createdAt: Date;
  updatedAt: Date;
}
