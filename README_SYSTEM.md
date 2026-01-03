# Admission Form System - Complete Documentation

## Table of Contents

1. [System Overview](#system-overview)
2. [Features](#features)
3. [Architecture](#architecture)
4. [File Structure](#file-structure)
5. [How to Use](#how-to-use)
6. [Field Descriptions](#field-descriptions)
7. [API Endpoints](#api-endpoints)
8. [Customization Guide](#customization-guide)
9. [Troubleshooting](#troubleshooting)

## System Overview

This is a comprehensive college admission form system for accepting applications for multiple programs:

- **B.Tech** (4-year undergraduate degree)
- **MCA** (2-year Master's in Computer Applications)
- **M.Tech** (2-year Master's in Technology)

The system includes:

- Real-time admission status checking
- Program-specific forms with conditional fields
- Comprehensive field documentation with tooltips
- Backend integration with PostgreSQL/Prisma
- DOCX form generation
- Success modals with admission number tracking
- Form validation with user-friendly error messages

## Features

### ✅ Admission Window Management

- Check which programs have open admissions
- Display deadline information
- Show closed programs with future open dates
- Friendly messages when no admissions are open

### ✅ Program Selection

- Choose between B.Tech, MCA, M.Tech
- Program-specific form fields
- Conditional admission type selection (B.Tech only)

### ✅ Intelligent Form Fields

- **B.Tech Regular**: Plus two marks (Physics, Chemistry, Maths) + KEAM
- **B.Tech Lateral**: Polytechnic CGPA + semester info
- **B.Tech NRI**: International qualifications support
- **B.Tech Management**: Special management quota form
- **MCA**: Bachelor's degree info + CAT/GATE/MAT scores
- **M.Tech**: Bachelor's + entrance exam scores

### ✅ Field Documentation

Every field has:

- Clear label and required indicator
- Help tooltip (ℹ️ icon) with explanation
- Examples of valid input
- Context about what the field is used for
- Special guidance (e.g., OBC category explanation)

### ✅ Comprehensive Form Sections

1. **Personal Information**: Name, DOB, gender, blood group, etc.
2. **Parent/Guardian Information**: Father, mother, guardian details
3. **Address Information**: Permanent, contact, and local guardian addresses
4. **Education Information**: Previous exam marks, institution details
5. **Entrance Exam**: Rank, score, exam type
6. **Bank Information**: For fee refunds and scholarships
7. **Additional Information**: Category, fee concession eligibility

### ✅ Validation & Error Handling

- Real-time field validation
- Pattern matching for phone, email, Aadhaar, etc.
- Duplicate email/Aadhaar checking (backend)
- Clear, actionable error messages
- Field-level error display

### ✅ Success Management

- Modal popup with admission number
- Confirmation of submission
- Next steps information
- Download form option
- Status check link (for future implementation)

### ✅ Multi-Program DOCX Generation

- Separate templates for B.Tech, MCA, M.Tech
- Program-specific field mapping
- Data masking for sensitive info (Aadhaar, bank account)
- Date formatting
- Automatic filename with admission number

## Architecture

### Frontend Stack

- **Framework**: Next.js 13+ (App Router)
- **UI Library**: React with Framer Motion (animations)
- **Styling**: Tailwind CSS
- **Icons**: React Icons (FiInfo, FiCheckCircle, etc.)
- **State Management**: React hooks (useState, useCallback)

### Backend Stack

- **API**: Next.js API Routes (app/api/)
- **Database**: PostgreSQL with Prisma ORM
- **Document Generation**: docxtemplater + pizzip
- **Validation**: Server-side validation

### Data Flow

```
User Browser
    ↓
1. AdmissionCheck Component (checks if admissions open)
    ↓
2. Form Component (displays program-specific fields)
    ↓ (user fills and validates client-side)
    ↓
3. API Submission (POST /api/admission/submit)
    ↓
4. Backend Validation & Database Insert
    ↓
5. Success Modal (shows admission number)
    ↓
6. DOCX Generation (POST /api/generate-docx)
    ↓
7. Download to User
```

## File Structure

```
admission/
├── BACKEND_IMPLEMENTATION_GUIDE.md      # Backend implementation details
├── MIGRATION_GUIDE.md                    # Migration from old system
├── README.md                             # This file
│
├── app/
│   ├── form/
│   │   ├── page.tsx                     # Main form page (replace with page-v2)
│   │   └── layout.tsx
│   ├── api/
│   │   ├── admission/
│   │   │   ├── status/route.ts          # GET - check admission status
│   │   │   ├── validate/route.ts        # POST - validate email/aadhaar
│   │   │   └── submit/route.ts          # POST - submit form
│   │   └── generate-docx/
│   │       ├── route.ts                 # Old version
│   │       └── route-v2.ts              # New multi-program version
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── AdmissionCheck.tsx                # NEW - Checks admission status
│   ├── SuccessModal.tsx                  # NEW - Success confirmation
│   ├── FormInput.tsx                     # Old version
│   ├── FormInput-v2.tsx                  # NEW - Enhanced with tooltips
│   ├── Home.tsx                          # Landing page
│   ├── HomeButton.tsx
│   └── Navbar.tsx
│
├── utilities/
│   ├── form-data.ts                      # Old field definitions
│   ├── form-data-v2.ts                   # NEW - Program-specific fields
│   └── [other utilities]
│
├── db/
│   ├── statements.ts                     # Old - SQLite (to be removed)
│   └── [prisma related]
│
├── public/
│   ├── template.docx                     # Generic template (fallback)
│   ├── template-btech.docx               # B.Tech template
│   ├── template-mca.docx                 # MCA template
│   ├── template-mtech.docx               # M.Tech template
│   └── [other assets]
│
├── prisma/
│   └── schema.prisma                     # Database schema
│
└── [config files]
    ├── package.json
    ├── next.config.ts
    ├── tsconfig.json
    └── etc.
```

## How to Use

### For End Users (Students)

1. **Navigate to Form**

   - Go to `/form` in the application
   - System checks if admissions are open

2. **Select Program**

   - Choose B.Tech, MCA, or M.Tech
   - For B.Tech, select admission type:
     - Regular (After 12th with entrance exam)
     - Lateral (Polytechnic/Diploma to 2nd year)
     - NRI (Foreign nationals)
     - Management (Management quota)

3. **Fill Form**

   - Scroll through sections:
     - Personal Information
     - Parent/Guardian Info
     - Address Information
     - Education Details
     - Entrance Exam Scores
     - Bank Account Details
     - Additional Information
   - Hover over ℹ️ icons for field explanations
   - Fix any red error messages

4. **Submit Form**

   - Click "Submit Application"
   - System validates and submits to backend
   - Success modal appears with admission number

5. **Download Form**
   - Click "Download Form" button
   - DOCX file with your admission is downloaded

### For Administrators

1. **Configure Admission Windows**

   ```sql
   INSERT INTO admission_windows (program, startDate, endDate, isOpen)
   VALUES
   ('btech', '2025-01-01', '2025-05-31', true),
   ('mca', '2025-01-15', '2025-06-15', true),
   ('mtech', '2025-07-01', '2025-08-31', false);
   ```

2. **Monitor Submissions**

   - Check `students` table in database
   - Filter by `admission_type`, `program`, `status`
   - Track via `student_submissions` table

3. **Review Applications**
   - Query by admission_number
   - Update status: pending → approved/rejected/waitlisted
   - Send notifications (future feature)

## Field Descriptions

### Personal Information

| Field           | Required | Type   | Notes                                      |
| --------------- | -------- | ------ | ------------------------------------------ |
| Full Name       | ✅       | Text   | Capital letters, 3+ chars                  |
| Date of Birth   | ✅       | Date   | Age 17-35 typically                        |
| Gender          | ✅       | Select | Male, Female, Other                        |
| Blood Group     | ❌       | Select | For emergency medical care                 |
| Religion        | ❌       | Text   | For hostel arrangements                    |
| Mother Tongue   | ❌       | Text   | Primary home language                      |
| Nationality     | ✅       | Text   | "Indian" for most, country name for others |
| Email           | ✅       | Email  | For admissions communication               |
| Phone           | ✅       | Tel    | 10-digit Indian number                     |
| Aadhaar         | ✅       | Text   | 12-digit unique ID                         |
| Category        | ✅       | Select | General/OBC/SC/ST (for quota)              |
| Admission Quota | ✅       | Select | General/Sponsored/Management               |

### Education Information (Program-Specific)

**B.Tech Regular/NRI:**

- Physics Score (Plus Two)
- Chemistry Score (Plus Two)
- Mathematics Score (Plus Two)
- Total Percentage (Plus Two)
- Entrance Exam Type (KEAM, JEE Main, etc.)
- Entrance Roll Number
- Entrance Rank
- Entrance Score

**B.Tech Lateral:**

- Polytechnic Institute Name
- Polytechnic Branch/Stream
- Semesters Completed
- CGPA in Polytechnic
- Year of Passing

**MCA:**

- Bachelor's Degree (B.Sc CS, B.Tech CS, BCA, etc.)
- Bachelor's University
- CGPA/Percentage in Bachelor's
- Year of Passing
- MCA Entrance Exam Type (CAT, GATE, MAT, etc.)
- Entrance Score/Percentile
- Entrance Rank (optional)

**M.Tech:**

- Bachelor's Degree
- Bachelor's Branch/Specialization
- Bachelor's University
- CGPA/Percentage
- Year of Passing
- M.Tech Entrance Exam Type (GATE, KEAM, etc.)
- Entrance Score
- Entrance Rank (optional)

### Category Explanation (Tooltip)

The category field determines your eligibility for different quotas:

- **General**: No reservation, open to all
- **OBC** (Other Backward Class): For economically/socially backward classes with valid certificate
- **SC** (Scheduled Caste): For members of notified SCs
- **ST** (Scheduled Tribe): For members of notified STs

This directly impacts admission chances and fees.

## API Endpoints

All documented in `BACKEND_IMPLEMENTATION_GUIDE.md`

### Key Endpoints

```
GET /api/admission/status
├─ Returns: { admissionsOpen: { btech, mca, mtech } with open/deadline status }
├─ Used by: AdmissionCheck component
└─ When: Page loads, every 5 minutes

POST /api/admission/submit
├─ Body: { program, admissionType, ... form data }
├─ Returns: { success, admissionNumber, studentId, message }
├─ Used by: Form submission
└─ Rate limited: 5 requests/hour per IP

POST /api/admission/validate
├─ Body: { email, aadhaar }
├─ Returns: { emailExists, aadhaarExists, message }
├─ Used by: Pre-submit validation (future)
└─ Rate limited: 10 requests/minute per IP

POST /api/generate-docx
├─ Body: { program, ... form data }
├─ Returns: DOCX file (binary)
├─ Used by: Download form button
└─ Supports: B.Tech, MCA, M.Tech templates
```

## Customization Guide

### 1. Adding a New Field

**Step 1**: Add to `utilities/form-data-v2.ts`

```typescript
{
  id: 999,
  name: "myNewField",
  type: "text",
  label: "My New Field",
  required: true,
  pattern: "^[A-Za-z]+$",
  errorMessage: "Only letters allowed",
  info: "This is my new field for...",
  programs: ["btech", "mca"], // Which programs show this field
}
```

**Step 2**: Update database schema (`prisma/schema.prisma`)

```prisma
model Student {
  // ... existing fields
  myNewField String?
}
```

**Step 3**: Run migration

```bash
npx prisma migrate dev --name add_my_new_field
```

**Step 4**: Update API route (`app/api/admission/submit/route.ts`)

```typescript
myNewField: studentData.myNewField,
```

### 2. Changing Admission Status

Edit `app/api/admission/status/route.ts`:

```typescript
const admissionsOpen = {
  btech: {
    open: false, // ← Change here
    deadline: "2025-05-31",
    description: "...",
  },
  // ...
};
```

### 3. Customizing Error Messages

Edit field definitions in `utilities/form-data-v2.ts`:

```typescript
{
  // ...
  errorMessage: "Your custom error message here",
}
```

### 4. Changing DOCX Templates

1. Edit `public/template-btech.docx` in Word
2. Add placeholders matching field names: `{fieldName}`
3. Save and test

### 5. Modifying Form Sections

Form sections are grouped in `app/form/page-v2.tsx`:

```typescript
const groupedFields = {
  personal: fields.filter((f) => [1, 2, 3...].includes(f.id)),
  // ...
};
```

Update ID ranges to add/remove fields from sections.

## Troubleshooting

### "Admissions currently closed"

**Cause**: No open admission windows in database

**Fix**:

```sql
INSERT INTO admission_windows
VALUES (1, 'btech', NOW(), NOW() + INTERVAL '120 days', true);
```

### "Email/Aadhaar already exists"

**Cause**: Duplicate entry in database

**Fix**:

```sql
-- Check for duplicates
SELECT email, COUNT(*) FROM students GROUP BY email HAVING COUNT(*) > 1;

-- Delete duplicate (careful!)
DELETE FROM students WHERE email = 'duplicate@example.com' AND id != (
  SELECT MIN(id) FROM students WHERE email = 'duplicate@example.com'
);
```

### "DOCX generation failed"

**Cause**: Missing or corrupted template

**Fix**:

1. Verify template exists: `ls -la public/template-*.docx`
2. Ensure placeholders match field names in code
3. Check docxtemplater syntax in template
4. Use `public/template.docx` as fallback

### "API route returns 404"

**Cause**: Incorrect file structure

**Fix**:

- ✅ Correct: `app/api/admission/submit/route.ts` → `POST /api/admission/submit`
- ❌ Wrong: `app/api/admission-submit/route.ts`

### "Form fields not showing"

**Cause**: Field visibility filter

**Check**: In `form-data-v2.ts`, field has `programs` property:

```typescript
programs: ["btech"], // Only shows for B.Tech
```

Remove or add your program to make field visible.

## Support & Contact

- **Backend Questions**: See `BACKEND_IMPLEMENTATION_GUIDE.md`
- **Migration Issues**: See `MIGRATION_GUIDE.md`
- **Field Configuration**: Check `utilities/form-data-v2.ts`
- **Component Code**: Review component files directly

---

**Last Updated**: January 2025
**Version**: 2.0 (Refactored)
