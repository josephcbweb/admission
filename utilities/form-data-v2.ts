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
  minAge?: number; // Minimum age validation for date fields
  max?: string | number; // Max value or "current" for current year/date
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
    minAge: 16,
    errorMessage: "Date of Birth is required.",
    info: "Must be at least 16 years old.",
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
    type: "select",
    label: "Religion",
    required: true,
    errorMessage: "Religion is required.",
    info: "Select your religion.",
    options: [
      { value: "Hindu", label: "Hindu" },
      { value: "Christian", label: "Christian" },
      { value: "Muslim", label: "Muslim" },
      { value: "Sikh", label: "Sikh" },
      { value: "Jain", label: "Jain" },
      { value: "Buddhist", label: "Buddhist" },
      { value: "Other", label: "Other" },
    ],
  },
  {
    id: 999, // Use a unique ID for Caste
    name: "caste",
    type: "select",
    label: "Caste",
    required: true,
    errorMessage: "Caste is required.",
    info: "Select your caste. Options depend on religion.",
    dependsOn: "religion",
    // Options will be populated dynamically in the component
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
    info: "We will send your application status updates to this email.",
  },
  {
    id: 9,
    name: "phone",
    type: "tel",
    label: "Mobile Number",
    required: true,
    pattern: "^[6-9]\\d{9}$",
    errorMessage: "Enter a valid 10-digit mobile number.",
    info: "Your primary contact number. Do not prefix +91.",
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
    label: "Department / Branch",
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
    id: 210, // New ID for fatherOccupation
    name: "fatherOccupation",
    type: "text",
    label: "Father's Occupation",
    required: true,
    errorMessage: "Father's occupation is required.",
    info: "Current occupation of your father.",
  },
  {
    id: 21,
    name: "fatherPhone",
    type: "tel",
    label: "Father's Phone",
    required: false,
    pattern: "^[6-9]\\d{9}$",
    errorMessage: "Enter a valid 10-digit phone number (starts with 6-9).",
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
    id: 230, // New ID for motherOccupation
    name: "motherOccupation",
    type: "text",
    label: "Mother's Occupation",
    required: true,
    errorMessage: "Mother's occupation is required.",
    info: "Current occupation of your mother.",
  },
  {
    id: 23,
    name: "motherPhone",
    type: "tel",
    label: "Mother's Phone",
    required: false,
    pattern: "^[6-9]\\d{9}$",
    errorMessage: "Enter a valid 10-digit phone number (starts with 6-9).",
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
    placeholder: "Door/House Number, Street, Village, Taluk, District, PIN: 123456",
    errorMessage: "Permanent address is required.",
    info: "Your official residential address from official documents (e.g., Aadhaar, ID proof).",
  },
  {
    id: 41,
    name: "permanentAddressState",
    type: "select",
    label: "Permanent Address - State",
    required: true,
    errorMessage: "State is required.",
    info: "State where your permanent address is located.",
    options: [
      { value: "Kerala", label: "Kerala" },
      { value: "Tamil Nadu", label: "Tamil Nadu" },
      { value: "Karnataka", label: "Karnataka" },
      { value: "Andhra Pradesh", label: "Andhra Pradesh" },
      { value: "Telangana", label: "Telangana" },
      { value: "Maharashtra", label: "Maharashtra" },
      { value: "Delhi", label: "Delhi" },
      { value: "Other", label: "Other" },
    ],
  },
  {
    id: 44, // New ID for permanentPincode
    name: "permanentPincode",
    type: "text",
    label: "Permanent Address - Pincode",
    required: true,
    pattern: "^\\s*[1-9][0-9]{5}\\s*$",
    errorMessage: "Enter a valid 6-digit PIN code.",
    info: "6-digit postal index number.",
  },
  {
    id: 42,
    name: "contactAddress",
    type: "textarea",
    label: "Contact Address",
    required: true,
    placeholder: "Door/House Number, Street, Village, Taluk, District, PIN: 123456",
    errorMessage: "Contact address is required.",
    info: "Your current residential address. If same as permanent, you can copy it.",
  },
  {
    id: 43,
    name: "contactAddressState",
    type: "select",
    label: "Contact Address - State",
    required: true,
    errorMessage: "State is required.",
    info: "State where your current address is located.",
    options: [
      { value: "Kerala", label: "Kerala" },
      { value: "Tamil Nadu", label: "Tamil Nadu" },
      { value: "Karnataka", label: "Karnataka" },
      { value: "Andhra Pradesh", label: "Andhra Pradesh" },
      { value: "Telangana", label: "Telangana" },
      { value: "Maharashtra", label: "Maharashtra" },
      { value: "Delhi", label: "Delhi" },
      { value: "Other", label: "Other" },
    ],
  },
  {
    id: 460, // New ID for contactPincode
    name: "contactPincode",
    type: "text",
    label: "Contact Address - Pincode",
    required: true,
    pattern: "^\\s*[1-9][0-9]{5}\\s*$",
    errorMessage: "Enter a valid 6-digit PIN code.",
    info: "6-digit postal index number.",
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
    info: "Mobile number of your local guardian.",
  },
];

// Education Information Fields
export const educationInfoFields: FormFieldConfig[] = [
  {
    id: 60,
    name: "qualifyingExam",
    type: "select",
    label: "Qualifying Examination",
    required: true,
    errorMessage: "Please select your qualifying examination.",
    info: "The examination based on which you are seeking admission.",
    // Options loaded based on program
  },
  {
    id: 61,
    name: "qualifyingBoard",
    type: "text",
    label: "Board / University",
    required: true,
    errorMessage: "Board/University is required.",
    info: "Name of the board (e.g., CBSE, Kerala State Board) or University.",
  },
  {
    id: 62,
    name: "qualifyingSchool",
    type: "text",
    label: "Institution / School Name",
    required: true,
    errorMessage: "Institution name is required.",
    info: "Name of the school or college where you completed the qualifying exam.",
  },
  {
    id: 63,
    name: "qualifyingYear",
    type: "text",
    label: "Year of Passing",
    required: true,
    pattern: "^(20)[2-9][0-9]$|^(20)[0-1][0-9]$|^(19)[9][0-9]$", // Basic year validation ~1990-2099
    errorMessage: "Enter a valid year (e.g., 2024).",
    info: "Year in which you passed the qualifying examination.",
  },
  {
    id: 64,
    name: "qualifyingRegNo",
    type: "text",
    label: "Register Number",
    required: true,
    errorMessage: "Register number is required.",
    info: "Registration number of your qualifying examination.",
  },
  {
    id: 65,
    name: "qualifyingMaxMarks",
    type: "number",
    label: "Maximum Marks (Total)",
    required: true,
    pattern: "^[0-9]+(\\.[0-9]+)?$",
    errorMessage: "Enter a valid number.",
    info: "Total maximum marks for all subjects.",
  },
  {
    id: 66,
    name: "qualifyingObtainedMarks",
    type: "number",
    label: "Marks Obtained (Total)",
    required: true,
    pattern: "^[0-9]+(\\.[0-9]+)?$",
    errorMessage: "Enter a valid number.",
    info: "Total marks obtained in all subjects.",
  },
  {
    id: 67,
    name: "qualifyingPercentage",
    type: "number",
    label: "Percentage / CGPA",
    required: true,
    pattern: "^[0-9]+(\\.[0-9]+)?$",
    errorMessage: "Enter a valid percentage/CGPA.",
    info: "Aggregate percentage or CGPA.",
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
    admissionTypes: ["regular", "nri", "management"],
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
    admissionTypes: ["regular", "nri", "management"],
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
    admissionTypes: ["regular", "nri", "management"],
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
    programs: ["btech"],
    admissionTypes: ["regular", "nri", "management"],
    options: [
      { value: "kerala-plus-two", label: "Kerala Plus Two" },
      { value: "cbse-12th", label: "CBSE 12th" },
      { value: "icse-12th", label: "ICSE 12th" },
      { value: "state-board-12th", label: "Other State Board 12th" },
      { value: "international", label: "International Board/Other" },
    ],
  },
  {
    id: 601, // Unique ID for lateral
    name: "qualifyingExam",
    type: "select",
    label: "Qualifying Exam",
    required: true,
    errorMessage: "Qualifying exam is required.",
    info: "The final exam of your previous level of education.",
    programs: ["btech"],
    admissionTypes: ["lateral"],
    options: [
      { value: "diploma-engineering", label: "Diploma in Engineering" },
      { value: "polytechnic", label: "Polytechnic Diploma" },
    ],
  },
  {
    id: 602, // Unique ID for MCA
    name: "qualifyingExam",
    type: "select",
    label: "Qualifying Exam",
    required: true,
    errorMessage: "Qualifying exam is required.",
    info: "The final exam of your previous level of education.",
    programs: ["mca"],
    options: [
      { value: "bca", label: "BCA" },
      { value: "bsc-cs", label: "B.Sc Computer Science" },
      { value: "btech-cs", label: "B.Tech CS/IT" },
      { value: "other", label: "Other Degree with Maths" },
    ],
  },
  {
    id: 603, // Unique ID for MTech
    name: "qualifyingExam",
    type: "select",
    label: "Qualifying Exam",
    required: true,
    errorMessage: "Qualifying exam is required.",
    info: "The final exam of your previous level of education.",
    programs: ["mtech"],
    options: [
      { value: "btech", label: "B.Tech/B.E" },
      { value: "msc", label: "M.Sc" },
      { value: "mca", label: "MCA" },
    ],
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
    pattern: "^20[0-9]{2}$",
    errorMessage: "Enter a valid year (e.g., 2024).",
    info: "Year when you passed your qualifying exam.",
    max: "current", // Validation: Cannot be in future
  },
  {
    id: 68,
    name: "qualifyingSchool",
    type: "text",
    label: "Institution / School Name",
    required: true,
    errorMessage: "Institution name is required.",
    info: "Name of the school or college where you completed the qualifying exam.",
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
    admissionTypes: ["regular", "nri", "management"],
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
    admissionTypes: ["regular", "nri", "management"],
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
    admissionTypes: ["regular", "nri", "management"],
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
    admissionTypes: ["regular", "nri", "management"],
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
    max: "current",
  },
];

// TC Information Fields
export const tcFields: FormFieldConfig[] = [
  {
    id: 80,
    name: "tcNumber",
    type: "text",
    label: "TC Number",
    required: true,
    errorMessage: "TC Number is required.",
    info: "Number mentioned on your Transfer Certificate.",
  },
  {
    id: 81,
    name: "tcDate",
    type: "date",
    label: "TC Issue Date",
    required: true,
    errorMessage: "Date is required.",
    info: "Date mentioned on your Transfer Certificate.",
    max: "current",
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

// Additional Information Fields
export const additionalInfoFields: FormFieldConfig[] = [
  {
    id: 160,
    name: "hostelService",
    type: "checkbox",
    label: "Hostel Accommodation Required",
    required: false,
    info: "Check if you wish to apply for college hostel.",
  },
  {
    id: 161,
    name: "busService",
    type: "checkbox",
    label: "Bus Transportation Required",
    required: false,
    info: "Check if you wish to avail college bus facility.",
  },
  {
    id: 162,
    name: "applyForFeeConcession",
    type: "checkbox",
    label: "Apply for Fee Concession (if eligible)",
    required: false,
    info: "Check if you wish to be considered for fee concession based on income/category.",
  },
  {
    id: 163,
    name: "additionalInfo",
    type: "textarea",
    label: "Any other information",
    required: false,
    info: "Any medical conditions, achievements or other details you want to share.",
    placeholder: "Medical history, extra-curricular achievements, etc."
  },
];

// Utility function to get fields for a specific program
export const getFieldsForProgram = (
  program: "BTECH" | "MCA" | "MTECH",
  admissionType: "regular" | "lateral" | "nri" | "management" = "regular",
) => {
  const fields: FormFieldConfig[] = [];

  // Always include personal info
  fields.push(...personalInfoFields);
  fields.push(...parentInfoFields);
  fields.push(...addressInfoFields);

  if (program === "BTECH") {
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
  } else if (program === "MCA") {
    fields.push(...educationInfoFieldsMCA);
    fields.push(...entranceExamFieldsMCA);
    fields.push(...tcFields);
  } else if (program === "MTECH") {
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

  // Religion Options
  religion: [
    { value: "Hindu", label: "Hindu" },
    { value: "Christian", label: "Christian" },
    { value: "Muslim", label: "Muslim" },
    { value: "Sikh", label: "Sikh" },
    { value: "Jain", label: "Jain" },
    { value: "Buddhist", label: "Buddhist" },
    { value: "Other", label: "Other" },
  ],

  // Caste Data (Mapping Religion -> Castes)
  // Note: This matches the structure expected by the frontend logic we will implement
  casteData: {
    Hindu: [
      { value: "Nair", label: "Nair" },
      { value: "Ezhava", label: "Ezhava" },
      { value: "Brahmin", label: "Brahmin" },
      { value: "Vishwakarma", label: "Vishwakarma" },
      { value: "Thiyya", label: "Thiyya" },
      { value: "SC", label: "Scheduled Caste (SC)" },
      { value: "ST", label: "Scheduled Tribe (ST)" },
      { value: "General", label: "General/Other" },
    ],
    Christian: [
      { value: "Roman Catholic", label: "Roman Catholic (RC)" },
      { value: "Latin Catholic", label: "Latin Catholic (LC)" },
      { value: "Jacobite", label: "Jacobite" },
      { value: "Orthodox", label: "Orthodox" },
      { value: "Marthoma", label: "Marthoma" },
      { value: "CSI", label: "CSI" },
      { value: "Pentecost", label: "Pentecost" },
      { value: "General", label: "General/Other" },
    ],
    Muslim: [
      { value: "Sunni", label: "Sunni" },
      { value: "Mujahid", label: "Mujahid" },
      { value: "Jamaat-e-Islami", label: "Jamaat-e-Islami" },
      { value: "General", label: "General/Other" },
    ],
    Sikh: [
      { value: "NA", label: "Not Applicable" },
    ],
    Jain: [
      { value: "NA", label: "Not Applicable" },
    ],
    Buddhist: [
      { value: "NA", label: "Not Applicable" },
    ],
    Other: [
      { value: "Other", label: "Other" },
    ],
  } as Record<string, { value: string; label: string }[]>,

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
