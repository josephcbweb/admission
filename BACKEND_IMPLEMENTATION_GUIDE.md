# Backend Implementation Guide for Admission Form System

This document outlines the required backend endpoints and database setup for the refactored admission form system.

## Overview

The admission system needs to be integrated with the Prisma schema provided. The frontend will communicate with the backend via REST APIs instead of storing data locally.

---

## Required Backend Endpoints

### 1. **Check Admission Status**

**Endpoint:** `GET /api/admission/status`

**Purpose:** Check if admissions are currently open for each program

**Response:**

```json
{
  "admissionsOpen": {
    "btech": {
      "open": true,
      "deadline": "2025-05-31",
      "description": "B.Tech admissions are currently open"
    },
    "mca": {
      "open": true,
      "deadline": "2025-06-15",
      "description": "MCA admissions are currently open"
    },
    "mtech": {
      "open": false,
      "deadline": "2025-07-31",
      "description": "M.Tech admissions will open from July 2025"
    }
  }
}
```

**Implementation Notes:**

- Create an `AdmissionWindow` model in Prisma to store admission periods
- Check if the current date falls within the admission window for each program
- Return user-friendly messages for closed admissions

---

### 2. **Validate Email/Aadhaar Uniqueness**

**Endpoint:** `POST /api/admission/validate`

**Purpose:** Check if a student with the given email or Aadhaar already exists

**Request Body:**

```json
{
  "email": "student@example.com",
  "aadhaar": "123456789012"
}
```

**Response:**

```json
{
  "emailExists": false,
  "aadhaarExists": false,
  "message": "Validation passed"
}
```

**Status Codes:**

- `200`: Validation successful (can proceed)
- `409`: Conflict (email or Aadhaar already exists)

**Implementation Notes:**

- Query the Student table for existing email and aadhaar_number
- Return helpful messages if data exists (e.g., "An account with this email already exists. Please use a different email or contact support.")

---

### 3. **Submit Admission Form**

**Endpoint:** `POST /api/admission/submit`

**Purpose:** Submit the complete admission form and store in database

**Request Body:**

```json
{
  "program": "btech",
  "admissionType": "regular",
  "personalInfo": {
    "name": "John Doe",
    "dateOfBirth": "2005-03-15",
    "gender": "male",
    "email": "john@example.com",
    "phone": "9876543210",
    "aadhaar": "123456789012",
    "bloodGroup": "O+",
    "religion": "Hindu",
    "nationality": "Indian",
    "motherTongue": "Tamil"
  },
  "parentInfo": {
    "fatherName": "Father Name",
    "fatherPhone": "9876543211",
    "motherName": "Mother Name",
    "motherPhone": "9876543212",
    "parentEmail": "parent@example.com",
    "annualFamilyIncome": "500000"
  },
  "addressInfo": {
    "permanentAddress": "123, Main Street",
    "permanentAddressState": "Kerala",
    "contactAddress": "456, Temp Street",
    "contactAddressState": "Kerala",
    "localGuardianName": "Uncle Name",
    "localGuardianAddress": "789, Local Street",
    "localGuardianPhone": "9876543213"
  },
  "educationInfo": {
    "qualifyingExam": "CBSE 12th",
    "examRegisterNumber": "CB123456",
    "examInstitute": "School Name",
    "physicsScore": "85",
    "chemistryScore": "88",
    "mathsScore": "92",
    "totalPercentage": "88.3",
    "tcNumber": "TC2023001",
    "tcDate": "2023-05-15",
    "tcIssuedBy": "School Name"
  },
  "entranceInfo": {
    "examType": "KEAM",
    "examRollNumber": "K123456",
    "examRank": "5000",
    "examScore": "285.5"
  },
  "bankInfo": {
    "accountNumber": "123456789012345",
    "bankName": "State Bank of India",
    "ifscCode": "SBIN0001234",
    "bankBranch": "Main Branch"
  },
  "additionalInfo": {
    "category": "OBC",
    "admissionQuota": "General",
    "feeConcessionEligible": false
  }
}
```

**Response:**

```json
{
  "success": true,
  "studentId": 42,
  "admissionNumber": "BTech-2025-001",
  "message": "Your admission form has been submitted successfully. Your admission number is BTech-2025-001. You will receive an email confirmation shortly.",
  "formUrl": "/admission-form-print/BTech-2025-001"
}
```

**Status Codes:**

- `201`: Created (submission successful)
- `400`: Bad Request (validation error)
- `409`: Conflict (student already exists)
- `500`: Server Error

**Database Operations:**

- Insert into `Student` table with all provided data
- Set `status` to `pending`
- Set `admission_type` based on submitted data
- Generate unique `admission_number` (format: `PROGRAM-YEAR-SEQUENCE`)
- Set `admission_date` to current date
- Create related records if needed (address, education details, etc.)

**Implementation Notes:**

- Validate all required fields before insertion
- Use transaction to ensure atomic operation
- Implement duplicate check using Prisma's unique constraints
- Hash or securely store the password field if needed
- Return the admission number for document generation

---

### 4. **Get Admission Form (For Printing)**

**Endpoint:** `GET /api/admission/:admissionNumber`

**Purpose:** Retrieve student data for printing/generating document

**Response:**

```json
{
  "student": {
    "id": 42,
    "name": "John Doe",
    "email": "john@example.com",
    "aadhaar": "123456789012",
    "program": "btech",
    "admissionNumber": "BTech-2025-001",
    "status": "pending",
    "admissionDate": "2025-01-15"
    // ... all other student fields
  }
}
```

**Implementation Notes:**

- Verify the admission number exists
- Return all student fields needed for document generation
- Consider returning in a format suitable for template rendering

---

### 5. **Get Admission Status for Student**

**Endpoint:** `GET /api/admission/status/:admissionNumber`

**Purpose:** Allow students to check their application status

**Response:**

```json
{
  "admissionNumber": "BTech-2025-001",
  "status": "pending",
  "submittedAt": "2025-01-15T10:30:00Z",
  "lastUpdated": "2025-01-15T10:30:00Z",
  "message": "Your application is under review. You will be notified once a decision is made."
}
```

---

## Required Models and Migrations

### New Fields/Models Needed

Based on the form, ensure these fields exist in the `Student` model:

```prisma
model Student {
  // ... existing fields

  // New fields to add if not present
  mother_tongue       String?
  local_guardian_name String?          // For day scholars with local guardians

  // Education details (could be separate model but inline for simplicity)
  last_institution      String?
  qualifying_exam_name  String?
  qualifying_exam_register_no String?

  // For tracking admission windows
  admissionSubmittedAt  DateTime?

  // Program-specific data (ensure support)
  // program field should support: "btech", "mca", "mtech"
}

// Optional: Create AdmissionWindow model for managing admission periods
model AdmissionWindow {
  id        Int      @id @default(autoincrement())
  program   String   // "btech", "mca", "mtech"
  startDate DateTime
  endDate   DateTime
  isOpen    Boolean  @default(true)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("admission_windows")
}

// Optional: Create StudentSubmission model for audit trail
model StudentSubmission {
  id          Int      @id @default(autoincrement())
  studentId   Int
  submittedAt DateTime @default(now())
  ipAddress   String?
  userAgent   String?
  student     Student  @relation(fields: [studentId], references: [id])

  @@map("student_submissions")
}
```

### Prisma Migrate Commands

Run these commands after updating schema.prisma:

```bash
npx prisma migrate dev --name add_admission_fields
npx prisma generate
```

---

## File Structure for Backend

The backend API should be organized as:

```
app/api/
├── admission/
│   ├── status/
│   │   └── route.ts          # GET /api/admission/status
│   ├── validate/
│   │   └── route.ts          # POST /api/admission/validate
│   ├── submit/
│   │   └── route.ts          # POST /api/admission/submit
│   ├── [admissionNumber]/
│   │   └── route.ts          # GET /api/admission/:admissionNumber
│   └── check-submission/
│       └── route.ts          # GET /api/admission/check-submission/:admissionNumber
└── generate-docx/
    └── route.ts              # POST /api/generate-docx (update to use DB)
```

---

## Validation Rules (Backend)

Implement these validations on the backend:

1. **Email Validation:**

   - Must be unique in Student table
   - Valid email format
   - Return 409 if exists

2. **Aadhaar Validation:**

   - Must be 12 digits
   - Must be unique in Student table
   - Return 409 if exists

3. **Phone Numbers:**

   - Must be 10 digits (India)
   - Valid numeric format

4. **Dates:**

   - DOB must be reasonable (student age 17-35)
   - All dates must be in valid format

5. **Education Scores:**

   - Must be numeric
   - Percentage: 0-100
   - Marks: depends on exam

6. **Admission Type & Program:**
   - Validate against enum values
   - Check if admission window is open

---

## Error Handling

Return appropriate HTTP status codes and messages:

```json
{
  "success": false,
  "error": "EmailAlreadyExists",
  "message": "An account with this email already exists. Please contact admin@college.edu if you believe this is an error.",
  "code": 409
}
```

Common Error Codes:

- `400`: Validation failed
- `409`: Resource already exists (duplicate email/aadhaar)
- `422`: Unprocessable entity (invalid data format)
- `500`: Server error

---

## Security Considerations

1. **CORS:** Configure appropriately for frontend domain
2. **Rate Limiting:** Limit submissions per IP (max 5 per hour)
3. **Input Sanitization:** Sanitize all text inputs
4. **Authentication:** Consider requiring email verification before form submission
5. **Logging:** Log all submissions for audit trail
6. **Environment Variables:** Store sensitive configuration in .env

---

## Testing the Endpoints

Use curl or Postman to test:

```bash
# Check admission status
curl http://localhost:3000/api/admission/status

# Validate email/aadhaar
curl -X POST http://localhost:3000/api/admission/validate \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","aadhaar":"123456789012"}'

# Submit admission form
curl -X POST http://localhost:3000/api/admission/submit \
  -H "Content-Type: application/json" \
  -d '{...form data...}'
```

---

## Summary of Required Routes

| Method | Endpoint                                | Purpose                           |
| ------ | --------------------------------------- | --------------------------------- |
| GET    | `/api/admission/status`                 | Check if admissions are open      |
| POST   | `/api/admission/validate`               | Validate email/aadhaar uniqueness |
| POST   | `/api/admission/submit`                 | Submit complete form              |
| GET    | `/api/admission/:admissionNumber`       | Get student data for printing     |
| GET    | `/api/admission/check/:admissionNumber` | Check application status          |
| POST   | `/api/generate-docx`                    | Generate DOCX for printing        |

---

## Next Steps

1. Update Prisma schema with new fields
2. Run migrations: `npx prisma migrate dev`
3. Create the API routes listed above
4. Implement validation middleware
5. Set up error handling
6. Test all endpoints
7. Connect frontend to these endpoints
