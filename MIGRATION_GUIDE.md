# Migration Guide: From Old Form to New Admission System

## Overview

This guide explains how to transition from the old admission form system to the new refactored system. The new system includes:

- Program-specific forms (B.Tech, MCA, M.Tech)
- Admission type variations (Regular, Lateral, NRI, Management)
- Comprehensive field documentation with tooltips
- Real backend integration (no local SQLite)
- Success modals and submission tracking
- Multi-program DOCX template support

## Step 1: Update Component Imports

Replace the old form page with the new version:

### Old (app/form/page.tsx)

```typescript
import { inputs } from "../../utilities/form-data";
import { populateStudentInfo } from "@/db/statements";
```

### New (app/form/page.tsx or replace with page-v2.tsx)

```typescript
import AdmissionCheck from "@/components/AdmissionCheck";
import SuccessModal from "@/components/SuccessModal";
import FormInput from "@/components/FormInput-v2";
import { getFieldsForProgram } from "@/utilities/form-data-v2";
```

## Step 2: Update Database Schema

Add new fields to your Prisma schema:

```prisma
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

Run migration:

```bash
npx prisma migrate dev --name add_admission_windows
npx prisma generate
```

## Step 3: Implement Backend Routes

The system expects these API routes:

### Routes to Create:

1. **GET /api/admission/status**

   - Check which programs have open admissions
   - File: `app/api/admission/status/route.ts` (provided)

2. **POST /api/admission/validate**

   - Validate email/aadhaar uniqueness
   - File: `app/api/admission/validate/route.ts` (provided)

3. **POST /api/admission/submit**

   - Save form data to database
   - File: `app/api/admission/submit/route.ts` (provided, needs Prisma implementation)

4. **POST /api/generate-docx** (Updated)
   - Generate DOCX for multiple programs
   - File: `app/api/generate-docx/route-v2.ts` (provided)

## Step 4: Replace Old Files

Old files can be archived or removed:

- `db/statements.ts` - No longer needed (local SQLite)
- `utilities/form-data.ts` - Replace with `utilities/form-data-v2.ts`
- `components/FormInput.tsx` - Replace with `components/FormInput-v2.tsx`
- `app/form/page.tsx` - Replace with `app/form/page-v2.tsx`

## Step 5: Create Multiple Template Files

The new system supports program-specific templates:

- `public/template-btech.docx` - B.Tech admission form
- `public/template-mca.docx` - MCA admission form
- `public/template-mtech.docx` - M.Tech admission form

If specific templates don't exist, the system falls back to `public/template.docx`.

## Step 6: Update Environment Variables

Add these to `.env` or `.env.local`:

```env
# Database (Prisma)
DATABASE_URL="postgresql://user:password@localhost:5432/admission_db"

# Optional: Rate limiting
RATE_LIMIT_ENABLED=true
RATE_LIMIT_WINDOW=3600
RATE_LIMIT_MAX_REQUESTS=5

# Optional: Email notifications
MAIL_SERVICE_URL="https://api.mailservice.com"
MAIL_API_KEY="your-api-key"
```

## Step 7: Test the System

### 1. Test Admission Status Check

```bash
curl http://localhost:3000/api/admission/status
```

### 2. Test Email/Aadhaar Validation

```bash
curl -X POST http://localhost:3000/api/admission/validate \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","aadhaar":"123456789012"}'
```

### 3. Test Form Submission

```bash
curl -X POST http://localhost:3000/api/admission/submit \
  -H "Content-Type: application/json" \
  -d '{...form data...}'
```

## Step 8: Handle User-Facing Changes

### Messaging Updates

Update these pages/components to reflect new system:

1. **Home Page (components/Home.tsx)**

   - Update CTA text: "Begin Your Application"
   - Link to `/form` instead of old admission link

2. **Success Page**

   - Now shows modal instead of redirect
   - Admission number is prominently displayed
   - Email confirmation reference

3. **Navigation**
   - Add "Check Application Status" link (future feature)
   - Link to application form

## File Structure After Migration

```
app/
├── form/
│   └── page.tsx (← updated from page-v2.tsx)
├── api/
│   ├── admission/
│   │   ├── status/
│   │   │   └── route.ts
│   │   ├── validate/
│   │   │   └── route.ts
│   │   ├── submit/
│   │   │   └── route.ts
│   │   └── check/
│   │       └── [admissionNumber]/
│   │           └── route.ts (optional - for checking status)
│   └── generate-docx/
│       └── route.ts (← updated)
│
components/
├── FormInput.tsx (← updated from FormInput-v2.tsx)
├── AdmissionCheck.tsx (← new)
├── SuccessModal.tsx (← new)
├── Home.tsx
└── ...

utilities/
├── form-data.ts (← replaced by form-data-v2.ts)
├── form-data-v2.ts (← new - primary data source)
└── ...

public/
├── template.docx (← generic fallback)
├── template-btech.docx (← program-specific)
├── template-mca.docx (← program-specific)
└── template-mtech.docx (← program-specific)
```

## Key Differences from Old System

### Old System

- Single generic form for all students
- Stored data in local SQLite database
- No admission status checking
- Basic error handling
- Single DOCX template

### New System

- Program-specific forms with conditional fields
- Data stored in PostgreSQL via Prisma
- Real-time admission status validation
- Comprehensive error messages with helpful suggestions
- Multi-program DOCX templates
- Success modal with admission number
- Tooltips for complex fields (Category, TC, etc.)
- Field-level validation with clear error messages
- Support for lateral entry, NRI, management quotas

## Troubleshooting

### Issue: "No admissions currently open"

- Check `AdmissionWindow` records in database
- Ensure at least one record has `isOpen=true` and dates are current

### Issue: "Student already exists" error

- Check for existing student with same email/aadhaar
- Query: `SELECT * FROM students WHERE email='...' OR aadhaar_number='...'`

### Issue: DOCX generation fails

- Ensure template files exist in `public/` directory
- Check template structure matches Docxtemplater expectations
- Verify field names in body data match template placeholders

### Issue: API routes return 404

- Verify Next.js app directory structure
- Ensure route files are named `route.ts` (not `route.js`)
- Check file paths match endpoint URLs

## Next Steps

1. ✅ Update database schema
2. ✅ Implement Prisma queries in API routes
3. ✅ Create program-specific DOCX templates
4. ✅ Test end-to-end flow
5. ✅ Set up email notifications
6. ✅ Add application status checking page
7. ✅ Deploy to production

## Support

For issues or questions about implementation:

- See `BACKEND_IMPLEMENTATION_GUIDE.md` for detailed API docs
- Check form field configuration in `utilities/form-data-v2.ts`
- Review component structure in component files
