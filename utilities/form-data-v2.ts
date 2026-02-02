// Form field configurations with program-specific visibility and tooltip info

export interface FormFieldConfig {
  id: number;
  name: string;
  type: string;
  label: string;
  placeholder?: string;
  required: boolean;
  pattern?: string;
  errorMessage?: string;
  info?: string; // Tooltip/help text
  programs?: ("btech" | "mca" | "mtech")[]; // undefined = all programs
  admissionTypes?: ("regular" | "lateral" | "nri" | "management")[]; // undefined = all types
  dependsOn?: string; // Field this depends on for visibility
  dependsOnValue?: string | string[]; // Value(s) that trigger visibility
  options?: { value: string; label: string }[]; // Options for select/radio
}

// Personal Information Fields
export const personalInfoFields: FormFieldConfig[] = [
  {
    id: 1,
    name: "name",
    type: "text",
    label: "Full Name",
    required: true,
    pattern: "^[A-Za-z\\s]{3,}$",
    errorMessage:
      "Name must be at least 3 characters and contain only letters.",
    info: "Enter your full name as it appears in official documents.",
  },
  {
    id: 2,
    name: "dateOfBirth",
    type: "date",
    label: "Date of Birth",
    required: true,
    errorMessage: "Date of Birth is required.",
    info: "Must be between 17-35 years old.",
  },
  {
    id: 3,
    name: "gender",
    type: "select",
    label: "Gender",
    required: true,
    errorMessage: "Gender is required.",
    info: "Select your gender identity.",
  },
  {
    id: 4,
    name: "bloodGroup",
    type: "select",
    label: "Blood Group",
    required: false,
    info: "Your blood group helps in medical emergencies at the college.",
  },
  {
    id: 5,
    name: "religion",
    type: "text",
    label: "Religion",
    required: true,
    info: "Specify your religion (e.g., Hindu, Muslim, Christian). Used for statistical purposes.",
  },
  {
    id: 6,
    name: "motherTongue",
    type: "text",
    label: "Mother Tongue",
    required: true,
    info: "Your primary language spoken at home.",
  },
  {
    id: 7,
    name: "nationality",
    type: "text",
    label: "Nationality",
    required: true,
    pattern: "^[A-Za-z ]+$",
    errorMessage: "Nationality must contain only letters.",
    info: "Your country of citizenship. For Indian nationals, enter 'Indian'.",
  },
  {
    id: 8,
    name: "email",
    type: "email",
    label: "Email Address",
    required: true,
    pattern: "^[\\w.-]+@[\\w.-]+\\.\\w{2,}$",
    errorMessage: "Enter a valid email address.",
    info: "Use an email you check regularly. We'll send admission updates here.",
  },
  {
    id: 9,
    name: "phone",
    type: "tel",
    label: "Phone Number",
    required: true,
    pattern: "^[6-9]\\d{9}$",
    errorMessage: "Enter a valid 10-digit Indian phone number.",
    info: "Your mobile number for contact and admission-related communications.",
  },
  {
    id: 10,
    name: "aadhaar",
    type: "text",
    label: "Aadhaar Number",
    required: true,
    pattern: "^[2-9]{1}[0-9]{11}$",
    errorMessage: "Enter a valid 12-digit Aadhaar number.",
    info: "Your unique 12-digit Aadhaar ID. This is kept confidential and used for verification.",
  },
  {
    id: 11,
    name: "category",
    type: "select",
    label: "Category",
    required: true,
    errorMessage: "Category is required.",
    info: "Select your category: General, OBC (Other Backward Class), SC (Scheduled Caste), or ST (Scheduled Tribe). OBC applicants must have valid OBC certificate.",
  },
  {
    id: 12,
    name: "preferredDepartment",
    type: "select",
    label: "Preferred Department/Branch",
    required: true,
    errorMessage: "Please select your preferred department.",
    info: "Select the department/branch you wish to join. This will be considered during class assignment after approval.",
    // Note: Options will be loaded dynamically from the database
  },
];

// Parent/Guardian Information Fields
export const parentInfoFields: FormFieldConfig[] = [
  {
    id: 20,
    name: "fatherName",
    type: "text",
    label: "Father's Name",
    required: true,
    pattern: "^[A-Za-z\\s]{3,}$",
    errorMessage: "Father's name must be at least 3 characters.",
    info: "Full name of your father.",
  },
  {
    id: 21,
    name: "fatherPhone",
    type: "tel",
    label: "Father's Phone",
    required: false,
    pattern: "^[6-9]\\d{9}$",
    errorMessage: "Enter a valid 10-digit phone number.",
    info: "Father's mobile number for important college communications.",
  },
  {
    id: 22,
    name: "motherName",
    type: "text",
    label: "Mother's Name",
    required: true,
    pattern: "^[A-Za-z\\s]{3,}$",
    errorMessage: "Mother's name must be at least 3 characters.",
    info: "Full name of your mother.",
  },
  {
    id: 23,
    name: "motherPhone",
    type: "tel",
    label: "Mother's Phone",
    required: false,
    pattern: "^[6-9]\\d{9}$",
    errorMessage: "Enter a valid 10-digit phone number.",
    info: "Mother's mobile number for important college communications.",
  },
  {
    id: 24,
    name: "parentEmail",
    type: "email",
    label: "Parent's Email",
    required: false,
    pattern: "^[\\w.-]+@[\\w.-]+\\.\\w{2,}$",
    errorMessage: "Enter a valid email address.",
    info: "Email for official communications with parents/guardians.",
  },
  {
    id: 25,
    name: "annualFamilyIncome",
    type: "text",
    label: "Annual Family Income (₹)",
    required: true,
    pattern: "^[0-9]+$",
    errorMessage: "Enter a valid amount in rupees.",
    info: "Total annual income of the family. Used for fee concession eligibility assessment.",
  },
  {
    id: 26,
    name: "guardianName",
    type: "text",
    label: "Guardian Name (if applicable)",
    required: false,
    pattern: "^[A-Za-z\\s]{3,}$",
    errorMessage: "Guardian's name must be at least 3 characters.",
    info: "Name of your legal guardian if you have one other than parents.",
  },
  {
    id: 27,
    name: "guardianRelationship",
    type: "text",
    label: "Guardian Relationship",
    required: false,
    info: "Relationship to the student (e.g., Uncle, Aunt, Grandfather, etc.)",
  },
];

// Address Information Fields
export const addressInfoFields: FormFieldConfig[] = [
  {
    id: 40,
    name: "permanentAddress",
    type: "textarea",
    label: "Permanent Address",
    required: true,
    placeholder: "Door/House Number, Street, Village, Taluk, District",
    errorMessage: "Permanent address is required.",
    info: "Your official residential address from official documents (e.g., Aadhaar, ID proof).",
  },
  {
    id: 41,
    name: "permanentAddressState",
    type: "text",
    label: "Permanent Address - State",
    required: true,
    errorMessage: "State is required.",
    info: "State where your permanent address is located.",
  },
  {
    id: 42,
    name: "contactAddress",
    type: "textarea",
    label: "Contact Address (Current)",
    required: true,
    placeholder: "Door/House Number, Street, Village, Taluk, District",
    errorMessage: "Contact address is required.",
    info: "Your current address where college can contact you. If same as permanent, enter 'Same as permanent address'.",
  },
  {
    id: 43,
    name: "contactAddressState",
    type: "text",
    label: "Contact Address - State",
    required: true,
    errorMessage: "State is required.",
    info: "State where your current address is located.",
  },

  {
    id: 45,
    name: "localGuardianName",
    type: "text",
    label: "Local Guardian Name",
    required: false,
    pattern: "^[A-Za-z\\s]{3,}$",
    errorMessage: "Local guardian's name must be at least 3 characters.",
    info: "Name of a local contact person (relative/friend) in the college area for day scholars and hostellers.",
  },
  {
    id: 46,
    name: "localGuardianAddress",
    type: "textarea",
    label: "Local Guardian Address",
    required: false,
    placeholder: "Door/House Number, Street, Area/Colony, City",
    info: "Address of local guardian where you can be contacted in case of emergency.",
  },
  {
    id: 47,
    name: "localGuardianPhone",
    type: "tel",
    label: "Local Guardian Phone",
    required: false,
    pattern: "^[6-9]\\d{9}$",
    errorMessage: "Enter a valid 10-digit phone number.",
    info: "Phone number of local guardian for emergency contact.",
  },
];

// Education Information Fields - Common
export const educationInfoFieldsCommon: FormFieldConfig[] = [
  {
    id: 60,
    name: "qualifyingExam",
    type: "select",
    label: "Qualifying Exam",

    required: true,
    errorMessage: "Qualifying exam is required.",
    info: "The final exam of your previous level of education.",
  },
  {
    id: 61,
    name: "qualifyingExamRegisterNo",
    type: "text",
    label: "Exam Register Number",
    required: true,
    errorMessage: "Register number is required.",
    info: "Your roll number or registration number in the qualifying exam.",
  },
  {
    id: 62,
    name: "qualifyingExamInstitute",
    type: "text",
    label: "Exam Conducted By",
    required: true,
    errorMessage: "Institution name is required.",
    info: "Name of the institution/board that conducted your qualifying exam (e.g., CBSE, ICSE, State Board).",
  },
  {
    id: 63,
    name: "qualifyingExamPassoutYear",
    type: "number",
    label: "Year of Passing",
    required: true,
    errorMessage: "Year of passing is required.",
    info: "Year when you passed your qualifying exam.",
  },
];

// Education Fields - B.Tech Regular/NRI
export const educationInfoFieldsBTechRegular: FormFieldConfig[] = [
  {
    id: 70,
    name: "physicsScore",
    type: "number",
    label: "Physics Score (Plus Two)",
    required: true,
    pattern: "^([0-9]{1,2}|1[0-9]{2}|200)(\\.\\d{1,2})?$",
    errorMessage: "Enter a valid physics score (0-200).",
    info: "Your score in Physics from Plus Two/12th standard. Important for engineering foundation.",
    programs: ["btech"],
    admissionTypes: ["regular", "nri"],
  },
  {
    id: 71,
    name: "chemistryScore",
    type: "number",
    label: "Chemistry Score (Plus Two)",
    required: true,
    pattern: "^([0-9]{1,2}|1[0-9]{2}|200)(\\.\\d{1,2})?$",
    errorMessage: "Enter a valid chemistry score (0-200).",
    info: "Your score in Chemistry from Plus Two/12th standard.",
    programs: ["btech"],
    admissionTypes: ["regular", "nri"],
  },
  {
    id: 72,
    name: "mathsScore",
    type: "number",
    label: "Mathematics Score (Plus Two)",
    required: true,
    pattern: "^([0-9]{1,2}|1[0-9]{2}|200)(\\.\\d{1,2})?$",
    errorMessage: "Enter a valid mathematics score (0-200).",
    info: "Your score in Mathematics from Plus Two/12th standard. Essential for engineering courses.",
    programs: ["btech"],
    admissionTypes: ["regular", "nri"],
  },
  {
    id: 73,
    name: "totalPercentage",
    type: "number",
    label: "Total Percentage (Plus Two)",
    required: true,
    pattern: "^([0-9]{1,2}|100)(\\.\\d{1,2})?$",
    errorMessage: "Enter a valid percentage (0-100).",
    info: "Your overall percentage/CGPA in Plus Two/12th standard.",
    programs: ["btech"],
    admissionTypes: ["regular", "nri"],
  },
];

// Education Fields - B.Tech Lateral Entry (Polytechnic)
export const educationInfoFieldsBTechLateral: FormFieldConfig[] = [
  {
    id: 74,
    name: "polytechnicInstitute",
    type: "text",
    label: "Polytechnic Institute Name",
    required: true,
    errorMessage: "Institute name is required.",
    info: "Name of your polytechnic college.",
    programs: ["btech"],
    admissionTypes: ["lateral"],
  },
  {
    id: 75,
    name: "polytechnicSemestersCompleted",
    type: "number",
    label: "Semesters Completed",
    required: true,
    errorMessage: "Number of semesters is required.",
    info: "Total semesters completed in polytechnic (usually 4-6 semesters for lateral entry).",
    programs: ["btech"],
    admissionTypes: ["lateral"],
  },
  {
    id: 76,
    name: "polytechnicCGPA",
    type: "number",
    label: "CGPA in Polytechnic",
    required: true,
    pattern: "^([0-9]|10)(\\.\\d{1,2})?$",
    errorMessage: "Enter a valid CGPA (0-10).",
    info: "Your cumulative GPA in polytechnic. Based on this, you'll be placed in appropriate semester.",
    programs: ["btech"],
    admissionTypes: ["lateral"],
  },
  {
    id: 77,
    name: "polytechnicBranch",
    type: "text",
    label: "Branch/Stream in Polytechnic",
    required: true,
    errorMessage: "Branch is required.",
    info: "Your specialization in polytechnic (e.g., Civil, Mechanical, Electrical, Computer Science).",
    programs: ["btech"],
    admissionTypes: ["lateral"],
  },
  {
    id: 78,
    name: "polytechnicPassoutYear",
    type: "number",
    label: "Year of Passing Polytechnic",
    required: true,
    errorMessage: "Year is required.",
    info: "Year when you completed polytechnic education.",
    programs: ["btech"],
    admissionTypes: ["lateral"],
  },
];

// TC and Transfer Certificate Fields
export const tcFields: FormFieldConfig[] = [
  {
    id: 85,
    name: "tcNumber",
    type: "text",
    label: "Transfer Certificate (TC) Number",
    required: true,
    errorMessage: "TC number is required.",
    info: "Your TC/Migration Certificate number from previous institution.",
  },
  {
    id: 86,
    name: "tcDate",
    type: "date",
    label: "TC Issue Date",
    required: true,
    errorMessage: "TC date is required.",
    info: "Date when TC was issued by your previous institution.",
  },
  {
    id: 87,
    name: "tcIssuedBy",
    type: "text",
    label: "TC Issued By",
    required: true,
    errorMessage: "Institution name is required.",
    info: "Name of the institution that issued your TC.",
  },
];

// Entrance Exam Fields - B.Tech Regular
export const entranceExamFieldsBTechRegular: FormFieldConfig[] = [
  {
    id: 90,
    name: "entranceExamType",
    type: "select",
    label: "Entrance Exam Type",
    required: true,
    errorMessage: "Entrance exam type is required.",
    info: "Type of entrance exam you appeared for (KEAM for Kerala, JEE Main, CUET, etc.)",
    programs: ["btech"],
    admissionTypes: ["regular", "nri"],
  },
  {
    id: 91,
    name: "entranceExamRollNumber",
    type: "text",
    label: "Entrance Exam Roll Number",
    required: true,
    errorMessage: "Roll number is required.",
    info: "Your roll number/registration number in the entrance exam.",
    programs: ["btech"],
    admissionTypes: ["regular", "nri"],
  },
  {
    id: 92,
    name: "entranceRank",
    type: "number",
    label: "Entrance Exam Rank",
    required: true,
    pattern: "^[0-9]+$",
    errorMessage: "Rank must be numeric.",
    info: "Your rank in the entrance exam.",
    programs: ["btech"],
    admissionTypes: ["regular", "nri"],
  },
  {
    id: 93,
    name: "entranceExamScore",
    type: "number",
    label: "Entrance Exam Score",
    required: true,
    pattern: "^([0-9]{1,3}|1000)(\\.\\d{1,2})?$",
    errorMessage: "Enter a valid score.",
    info: "Your total score in the entrance exam.",
    programs: ["btech"],
    admissionTypes: ["regular", "management"],
  },
];

// Entrance Exam Fields - B.Tech NRI (Optional)
export const entranceExamFieldsBTechNRI: FormFieldConfig[] = [
  {
    id: 170,
    name: "hasEntranceExam",
    type: "select",
    label: "Do you have Entrance Exam Qualification?",
    required: true,
    info: "Select 'Yes' if you have appeared for any entrance exam.",
    programs: ["btech"],
    admissionTypes: ["nri"],
    options: [
      { value: "yes", label: "Yes" },
      { value: "no", label: "No" },
    ],
  },
  {
    id: 171,
    name: "entranceExamType",
    type: "select",
    label: "Entrance Exam Type",
    required: true,
    errorMessage: "Entrance exam type is required.",
    info: "Type of entrance exam you appeared for.",
    programs: ["btech"],
    admissionTypes: ["nri"],
    dependsOn: "hasEntranceExam",
    dependsOnValue: "yes",
  },
  {
    id: 172,
    name: "entranceExamRollNumber",
    type: "text",
    label: "Entrance Exam Roll Number",
    required: true,
    errorMessage: "Roll number is required.",
    info: "Your roll number/registration number.",
    programs: ["btech"],
    admissionTypes: ["nri"],
    dependsOn: "hasEntranceExam",
    dependsOnValue: "yes",
  },
  {
    id: 173,
    name: "entranceRank",
    type: "number",
    label: "Entrance Exam Rank",
    required: true,
    pattern: "^[0-9]+$",
    errorMessage: "Rank must be numeric.",
    info: "Your rank in the entrance exam.",
    programs: ["btech"],
    admissionTypes: ["nri"],
    dependsOn: "hasEntranceExam",
    dependsOnValue: "yes",
  },
  {
    id: 174,
    name: "entranceExamScore",
    type: "number",
    label: "Entrance Exam Score",
    required: true,
    pattern: "^([0-9]{1,3}|1000)(\\.\\d{1,2})?$",
    errorMessage: "Enter a valid score.",
    info: "Your total score in the entrance exam.",
    programs: ["btech"],
    admissionTypes: ["nri"],
    dependsOn: "hasEntranceExam",
    dependsOnValue: "yes",
  },
];

// MCA Education Fields
export const educationInfoFieldsMCA: FormFieldConfig[] = [
  {
    id: 100,
    name: "bachelorDegree",
    type: "text",
    label: "Bachelor's Degree",
    required: true,
    errorMessage: "Degree is required.",
    info: "Your bachelor's degree field of study (e.g., B.Sc Computer Science, B.Tech Computer Science).",
    programs: ["mca"],
  },
  {
    id: 101,
    name: "bachelorUniversity",
    type: "text",
    label: "University/Board",
    required: true,
    errorMessage: "University name is required.",
    info: "Name of the university that awarded your bachelor's degree.",
    programs: ["mca"],
  },
  {
    id: 102,
    name: "bachelorCGPA",
    type: "number",
    label: "CGPA/Percentage in Bachelor's",
    required: true,
    pattern: "^([0-9]{1,2}|100)(\\.\\d{1,2})?$",
    errorMessage:
      "Enter a valid value (0-100 for percentage or 0-10 for CGPA).",
    info: "Your overall CGPA or percentage in bachelor's degree. This affects your eligibility.",
    programs: ["mca"],
  },
  {
    id: 103,
    name: "bachelorPassoutYear",
    type: "number",
    label: "Year of Passing Bachelor's",
    required: true,
    errorMessage: "Year is required.",
    info: "Year when you completed your bachelor's degree.",
    programs: ["mca"],
  },
];

// MCA Entrance Exam Fields
export const entranceExamFieldsMCA: FormFieldConfig[] = [
  {
    id: 110,
    name: "mcaEntranceExamType",
    type: "select",
    label: "MCA Entrance Exam Type",
    required: true,
    errorMessage: "Entrance exam type is required.",
    info: "Type of MCA entrance exam (CAT, GATE, MAT, university entrance exam, etc.)",
    programs: ["mca"],
  },
  {
    id: 111,
    name: "mcaEntranceScore",
    type: "number",
    label: "Entrance Exam Score/Percentile",
    required: true,
    errorMessage: "Score is required.",
    info: "Your score or percentile in the entrance exam.",
    programs: ["mca"],
  },
  {
    id: 112,
    name: "mcaEntranceRank",
    type: "number",
    label: "Entrance Exam Rank",
    required: false,
    pattern: "^[0-9]+$",
    errorMessage: "Rank must be numeric.",
    info: "Your rank/merit position if applicable.",
    programs: ["mca"],
  },
];

// M.Tech Education Fields
export const educationInfoFieldsMTech: FormFieldConfig[] = [
  {
    id: 120,
    name: "bachelorDegree",
    type: "text",
    label: "Bachelor's Degree/Diploma",
    required: true,
    errorMessage: "Degree is required.",
    info: "Your undergraduate degree (B.Tech, B.Sc, Diploma in Engineering).",
    programs: ["mtech"],
  },
  {
    id: 121,
    name: "bachelorBranch",
    type: "text",
    label: "Bachelor's Branch/Specialization",
    required: true,
    errorMessage: "Branch is required.",
    info: "Your specialization in bachelor's degree (e.g., Civil, Mechanical, Electrical, CSE).",
    programs: ["mtech"],
  },
  {
    id: 122,
    name: "bachelorUniversity",
    type: "text",
    label: "University/Board",
    required: true,
    errorMessage: "University name is required.",
    info: "Institution that awarded your degree.",
    programs: ["mtech"],
  },
  {
    id: 123,
    name: "bachelorCGPA",
    type: "number",
    label: "CGPA/Percentage in Bachelor's",
    required: true,
    pattern: "^([0-9]{1,2}|100)(\\.\\d{1,2})?$",
    errorMessage: "Enter a valid value.",
    info: "Your overall CGPA or percentage. Minimum 6.0 CGPA or 60% usually required.",
    programs: ["mtech"],
  },
  {
    id: 124,
    name: "bachelorPassoutYear",
    type: "number",
    label: "Year of Passing Bachelor's",
    required: true,
    errorMessage: "Year is required.",
    info: "Year when you completed bachelor's degree.",
    programs: ["mtech"],
  },
];

// M.Tech Entrance Exam Fields
export const entranceExamFieldsMTech: FormFieldConfig[] = [
  {
    id: 130,
    name: "mtechEntranceExamType",
    type: "select",
    label: "M.Tech Entrance Exam Type",
    required: true,
    errorMessage: "Entrance exam type is required.",
    info: "Type of exam (GATE, KEAM M.Tech, CAT, university entrance, etc.)",
    programs: ["mtech"],
  },
  {
    id: 131,
    name: "mtechEntranceScore",
    type: "number",
    label: "Entrance Exam Score",
    required: true,
    errorMessage: "Score is required.",
    info: "Your score in the entrance exam (or GATE score/rank).",
    programs: ["mtech"],
  },
  {
    id: 132,
    name: "mtechEntranceRank",
    type: "number",
    label: "Entrance Exam Rank",
    required: false,
    pattern: "^[0-9]+$",
    errorMessage: "Rank must be numeric.",
    info: "Your rank/AIR in the entrance exam if applicable.",
    programs: ["mtech"],
  },
];

// Bank Information Fields
export const bankInfoFields: FormFieldConfig[] = [
  {
    id: 150,
    name: "bankAccountNumber",
    type: "text",
    label: "Bank Account Number",
    required: true,
    pattern: "^[0-9]{9,18}$",
    errorMessage: "Enter a valid bank account number (9-18 digits).",
    info: "Your savings/current bank account number. Used for fee refunds and scholarships.",
  },
  {
    id: 151,
    name: "bankName",
    type: "text",
    label: "Bank Name",
    required: true,
    errorMessage: "Bank name is required.",
    info: "Name of your bank (e.g., State Bank of India, ICICI Bank).",
  },
  {
    id: 152,
    name: "bankIFSCCode",
    type: "text",
    label: "Bank IFSC Code",
    required: true,
    pattern: "^[A-Z]{4}0[A-Z0-9]{6}$",
    errorMessage: "Enter a valid IFSC code (e.g., SBIN0001234).",
    info: "11-character IFSC code of your bank branch. Check your cheque book or bank website.",
  },
  {
    id: 153,
    name: "bankBranch",
    type: "text",
    label: "Bank Branch Name",
    required: true,
    info: "Name of the branch where your account is held.",
  },
];

// Additional Information Fields
export const additionalInfoFields: FormFieldConfig[] = [];

// Utility function to get fields for a specific program
export const getFieldsForProgram = (
  program: "btech" | "mca" | "mtech",
  admissionType: "regular" | "lateral" | "nri" | "management" = "regular",
) => {
  const fields: FormFieldConfig[] = [];

  // Always include personal info
  fields.push(...personalInfoFields);
  fields.push(...parentInfoFields);
  fields.push(...addressInfoFields);

  if (program === "btech") {
    if (admissionType === "lateral") {
      fields.push(...educationInfoFieldsCommon);
      fields.push(...educationInfoFieldsBTechLateral);
      fields.push(...tcFields);
    } else if (admissionType === "regular") {
      fields.push(...educationInfoFieldsCommon);
      fields.push(...educationInfoFieldsBTechRegular);
      fields.push(...entranceExamFieldsBTechRegular);
      fields.push(...tcFields);
    } else if (admissionType === "management") {
      fields.push(...educationInfoFieldsCommon);
      fields.push(...educationInfoFieldsBTechRegular);
      fields.push(...entranceExamFieldsBTechRegular);
      fields.push(...tcFields);
    } else if (admissionType === "nri") {
      fields.push(...educationInfoFieldsCommon);
      fields.push(...educationInfoFieldsBTechRegular);
      fields.push(...entranceExamFieldsBTechNRI);
      fields.push(...tcFields);
    }
  } else if (program === "mca") {
    fields.push(...educationInfoFieldsMCA);
    fields.push(...entranceExamFieldsMCA);
    fields.push(...tcFields);
  } else if (program === "mtech") {
    fields.push(...educationInfoFieldsMTech);
    fields.push(...entranceExamFieldsMTech);
    fields.push(...tcFields);
  }

  // Add bank info and additional info for all programs
  fields.push(...bankInfoFields);
  fields.push(...additionalInfoFields);

  return fields;
};

// Dropdown options
export const dropdownOptions = {
  gender: [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
  ],
  bloodGroup: [
    { value: "A+", label: "A+" },
    { value: "A-", label: "A-" },
    { value: "B+", label: "B+" },
    { value: "B-", label: "B-" },
    { value: "AB+", label: "AB+" },
    { value: "AB-", label: "AB-" },
    { value: "O+", label: "O+" },
    { value: "O-", label: "O-" },
  ],
  category: [
    { value: "General", label: "General" },
    { value: "OBC", label: "OBC - Other Backward Class" },
    {
      value: "SEBC",
      label: "SEBC - Socially and Educationally Backward Class",
    },
    { value: "OEC", label: "OEC - Other Eligible Community" },
    { value: "SC", label: "SC - Scheduled Caste" },
    { value: "ST", label: "ST - Scheduled Tribe" },
  ],

  program: [
    { value: "btech", label: "B.Tech (Bachelor of Technology)" },
    { value: "mca", label: "MCA (Master of Computer Applications)" },
    { value: "mtech", label: "M.Tech (Master of Technology)" },
  ],
  admissionType: [
    { value: "regular", label: "Regular (After 12th)" },
    { value: "lateral", label: "Lateral Entry (Polytechnic/Diploma)" },
    { value: "nri", label: "NRI/Foreign National" },
    { value: "management", label: "Management Quota" },
  ],

  // Updated with proper values
  qualifyingExam: [
    // For B.Tech Regular/NRI (12th standard)
    { value: "kerala-plus-two", label: "Kerala Plus Two" },
    { value: "cbse-12th", label: "CBSE 12th" },
    { value: "icse-12th", label: "ICSE 12th" },
    { value: "state-board-12th", label: "State Board 12th" },
    {
      value: "international",
      label: "International Board (A-Levels, IB, etc.)",
    },

    // For B.Tech Lateral Entry
    { value: "diploma-engineering", label: "Diploma in Engineering" },
    { value: "polytechnic", label: "Polytechnic Diploma" },

    // For MCA
    { value: "bsc-cs", label: "B.Sc Computer Science" },
    { value: "bsc-it", label: "B.Sc Information Technology" },
    { value: "bca", label: "BCA (Bachelor of Computer Applications)" },
    { value: "btech-cs", label: "B.Tech Computer Science" },
    { value: "btech-it", label: "B.Tech IT" },
    { value: "btech-other", label: "B.Tech (Other Streams)" },

    // For M.Tech
    { value: "btech-civil", label: "B.Tech Civil Engineering" },
    { value: "btech-mechanical", label: "B.Tech Mechanical Engineering" },
    { value: "btech-electrical", label: "B.Tech Electrical Engineering" },
    { value: "btech-ece", label: "B.Tech Electronics & Communication" },
    { value: "btech-cse", label: "B.Tech Computer Science" },
    { value: "btech-general", label: "B.Tech (Any Stream)" },
    { value: "bsc-physics", label: "B.Sc Physics" },
    { value: "bsc-mathematics", label: "B.Sc Mathematics" },

    { value: "other", label: "Other" },
  ],

  // Entrance Exam Types
  entranceExamType: [
    // For B.Tech
    { value: "KEAM", label: "KEAM - Kerala Engineering Architecture Medical" },
  ],

  // For MCA entrance
  mcaEntranceExamType: [{ value: "KEAM-MCA", label: "KEAM MCA" }],

  // For M.Tech entrance
  mtechEntranceExamType: [{ value: "KEAM-MTech", label: "KEAM M.Tech" }],

  // Kept for backward compatibility - remove these if not used elsewhere
  qualifyingExamBTech: [
    { value: "kerala-plus-two", label: "Kerala Plus Two" },
    { value: "cbse-12th", label: "CBSE 12th" },
    { value: "icse-12th", label: "ICSE 12th" },
    { value: "state-board-12th", label: "State Board 12th" },
    {
      value: "international",
      label: "International Board (A-Levels, IB, etc.)",
    },
  ],
  qualifyingExamMCAMTech: [
    { value: "bsc-cs", label: "B.Sc Computer Science" },
    { value: "btech-cs", label: "B.Tech Computer Science" },
    { value: "btech-it", label: "B.Tech IT" },
    { value: "btech-other", label: "B.Tech (Other Streams)" },
    { value: "bca", label: "BCA (Bachelor of Computer Applications)" },
  ],
  entranceExamBTech: [
    { value: "KEAM", label: "KEAM (Kerala Engineering Agriculture Medical)" },
    { value: "JEE-Main", label: "JEE Main" },
    { value: "JEE-Advanced", label: "JEE Advanced" },
    { value: "CUET", label: "CUET" },
    { value: "other", label: "Other State Entrance Exam" },
  ],
  entranceExamMCA: [
    { value: "KEAM-MCA", label: "KEAM MCA" },
    { value: "NIMCET", label: "NIMCET" },
    { value: "MAH-MCA-CET", label: "MAH MCA CET" },
    { value: "university-entrance", label: "University Entrance Exam" },
    { value: "other", label: "Other" },
  ],
  entranceExamMTech: [
    { value: "GATE", label: "GATE" },
    { value: "KEAM-MTech", label: "KEAM M.Tech" },
    { value: "university-entrance", label: "University Entrance Exam" },
    { value: "direct", label: "Direct Admission (Based on B.Tech marks)" },
  ],
};
