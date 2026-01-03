# Implementation Checklist & Quick Start Guide

## 📋 Quick Reference

This file provides a checklist for implementing the new admission form system.

---

## Phase 1: Setup (Day 1)

- [ ] **Create new files** in your project

  - [ ] Copy `components/FormInput-v2.tsx` → Use as FormInput
  - [ ] Copy `components/AdmissionCheck.tsx` → New component
  - [ ] Copy `components/SuccessModal.tsx` → New component
  - [ ] Copy `utilities/form-data-v2.ts` → New form definitions
  - [ ] Copy `app/form/page-v2.tsx` → Replace form page

- [ ] **Create API routes**

  - [ ] `app/api/admission/status/route.ts`
  - [ ] `app/api/admission/validate/route.ts`
  - [ ] `app/api/admission/submit/route.ts`
  - [ ] Update `app/api/generate-docx/route.ts` (use route-v2 version)

- [ ] **Update imports in components**
  - [ ] Check all import paths are correct
  - [ ] Verify icon libraries are installed (`react-icons`)
  - [ ] Ensure Framer Motion is installed

---

## Phase 2: Database Setup (Day 2)

- [ ] **Update Prisma Schema** (`prisma/schema.prisma`)

  - [ ] Add `AdmissionWindow` model
  - [ ] Add `StudentSubmission` model
  - [ ] Add new fields to `Student` model if needed
  - [ ] Review field mappings

- [ ] **Run migrations**

  ```bash
  npx prisma migrate dev --name add_admission_system
  npx prisma generate
  ```

- [ ] **Create seed data** (optional but recommended)

  ```bash
  # Create prisma/seed.ts with admission window data
  npx prisma db seed
  ```

- [ ] **Verify database schema**
  ```bash
  npx prisma studio
  ```

---

## Phase 3: Backend Implementation (Day 3-4)

- [ ] **Implement POST /api/admission/submit**

  - [ ] Add Prisma client import
  - [ ] Implement email duplicate check
  - [ ] Implement aadhaar duplicate check
  - [ ] Add error handling (409 for duplicates)
  - [ ] Create student record in database
  - [ ] Generate admission number
  - [ ] Return success response with admission number

- [ ] **Implement GET /api/admission/status**

  - [ ] Query `AdmissionWindow` model
  - [ ] Check current date against startDate/endDate
  - [ ] Return open/closed status for each program
  - [ ] Include deadline information

- [ ] **Implement POST /api/admission/validate**

  - [ ] Add email/aadhaar existence check
  - [ ] Return 409 if exists, 200 if valid
  - [ ] Add helpful error messages

- [ ] **Update POST /api/generate-docx**
  - [ ] Support program parameter
  - [ ] Select correct template based on program
  - [ ] Add data masking for sensitive fields
  - [ ] Test with different programs

---

## Phase 4: Frontend Testing (Day 5)

- [ ] **Component Testing**

  - [ ] Test AdmissionCheck loads
  - [ ] Test AdmissionCheck with no open admissions
  - [ ] Test AdmissionCheck with open admissions
  - [ ] Test program selection buttons
  - [ ] Test form field rendering

- [ ] **Form Testing**

  - [ ] Test B.Tech Regular form
  - [ ] Test B.Tech Lateral form
  - [ ] Test B.Tech NRI form
  - [ ] Test B.Tech Management form
  - [ ] Test MCA form
  - [ ] Test M.Tech form

- [ ] **Field Validation**

  - [ ] Test required field validation
  - [ ] Test email pattern validation
  - [ ] Test phone pattern validation
  - [ ] Test Aadhaar pattern validation
  - [ ] Test error messages display

- [ ] **Tooltip Testing**
  - [ ] Click ℹ️ icons to show tooltips
  - [ ] Verify tooltip content is helpful
  - [ ] Test on mobile (tooltip positioning)

---

## Phase 5: API Integration Testing (Day 6)

- [ ] **Test /api/admission/status**

  ```bash
  curl http://localhost:3000/api/admission/status
  ```

  - [ ] Verify response structure
  - [ ] Check open/closed status correct

- [ ] **Test /api/admission/validate**

  ```bash
  curl -X POST http://localhost:3000/api/admission/validate \
    -H "Content-Type: application/json" \
    -d '{"email":"test@example.com","aadhaar":"123456789012"}'
  ```

  - [ ] First request: 200 (valid)
  - [ ] Second request with same email: 409 (duplicate)

- [ ] **Test /api/admission/submit**

  - [ ] Submit valid form data
  - [ ] Verify admission number generated
  - [ ] Check student saved in database
  - [ ] Verify success response includes admissionNumber

- [ ] **Test /api/generate-docx**
  - [ ] Request DOCX for B.Tech
  - [ ] Request DOCX for MCA
  - [ ] Request DOCX for M.Tech
  - [ ] Verify files can be opened in Word

---

## Phase 6: End-to-End Testing (Day 7)

- [ ] **Complete User Flow**

  - [ ] Open form page
  - [ ] Verify admissions open message shows
  - [ ] Select B.Tech program
  - [ ] Select Regular admission type
  - [ ] Fill all required fields
  - [ ] Submit form
  - [ ] Verify success modal appears
  - [ ] Note admission number
  - [ ] Download DOCX file
  - [ ] Verify DOCX opens in Word

- [ ] **Error Flow Testing**

  - [ ] Try duplicate email: should get 409 error
  - [ ] Try duplicate aadhaar: should get 409 error
  - [ ] Try invalid email: should show validation error
  - [ ] Try invalid phone: should show validation error
  - [ ] Submit with missing required fields: should show errors

- [ ] **Data Integrity**
  - [ ] Query database for submitted student
  - [ ] Verify all fields saved correctly
  - [ ] Check admission_number format
  - [ ] Check status = "pending"

---

## Phase 7: Documentation & Deployment (Day 8)

- [ ] **Documentation**

  - [ ] Update deployment instructions in README
  - [ ] Document environment variables needed
  - [ ] Create admin guide for opening/closing admissions
  - [ ] Document any customizations made

- [ ] **Code Quality**

  - [ ] Run linter: `npm run lint`
  - [ ] Check TypeScript: `npx tsc --noEmit`
  - [ ] Review console for warnings
  - [ ] Test on different browsers

- [ ] **Performance**

  - [ ] Check page load time
  - [ ] Verify no console errors
  - [ ] Test form submission speed
  - [ ] Monitor database query performance

- [ ] **Security**

  - [ ] Verify email input sanitized
  - [ ] Check Aadhaar not logged in plain text
  - [ ] Verify bank account masked in logs
  - [ ] Review CORS settings

- [ ] **Staging Deployment**

  - [ ] Deploy to staging environment
  - [ ] Run full test suite
  - [ ] Get client approval

- [ ] **Production Deployment**
  - [ ] Backup database
  - [ ] Deploy to production
  - [ ] Monitor logs for errors
  - [ ] Test a live submission

---

## 🔧 Quick Configuration Guide

### Enable/Disable Admissions

Edit `app/api/admission/status/route.ts`:

```typescript
const admissionsOpen = {
  btech: {
    open: true, // ← Change to false to close
    deadline: "2025-05-31",
    description: "B.Tech admissions are currently open.",
  },
  // ...
};
```

### Add Custom Error Message

Edit any field in `utilities/form-data-v2.ts`:

```typescript
{
  name: "email",
  errorMessage: "Your custom message here",
}
```

### Change DOCX Template

1. Edit `public/template-btech.docx` in Microsoft Word
2. Use `{fieldName}` syntax for placeholders
3. Save file
4. Test with: `curl -X POST /api/generate-docx ...`

### Add New Form Section

1. Add field definitions to `form-data-v2.ts`
2. Update ID ranges in `app/form/page-v2.tsx`
3. Run migration if schema changed
4. Test rendering

---

## 📞 Common Issues & Fixes

| Issue                       | Solution                                                     |
| --------------------------- | ------------------------------------------------------------ |
| "Admissions closed" message | Check `admission_windows` table, insert open record          |
| DOCX download fails         | Verify template file exists, check template syntax           |
| Form fields not appearing   | Check field `programs` property includes selected program    |
| Database errors on submit   | Check schema migration ran, verify Prisma generated          |
| "Email already exists"      | Check for duplicates, use admin delete if needed             |
| API 404 errors              | Verify route file structure, check file names are `route.ts` |
| Tooltip not showing         | Check info field has text, verify FiInfo icon renders        |

---

## 📊 Database Schema Reference

Key tables after implementation:

```sql
-- Admission windows (controls which programs accept applications)
SELECT * FROM admission_windows;

-- Student applications
SELECT id, name, email, aadhaar_number, program, admission_number, status, created_at
FROM students;

-- Submission audit trail
SELECT * FROM student_submissions;
```

---

## 🎯 Success Criteria

Your implementation is complete when:

- ✅ Form page loads without errors
- ✅ Admission status check works
- ✅ All program forms render correctly
- ✅ Form fields validate properly
- ✅ Tooltips show helpful information
- ✅ Form submission succeeds
- ✅ Student data saves to database
- ✅ Admission number generates
- ✅ Success modal displays
- ✅ DOCX download works
- ✅ Duplicate email/aadhaar detection works
- ✅ All error messages are clear and helpful

---

## 📚 Additional Resources

- `BACKEND_IMPLEMENTATION_GUIDE.md` - Detailed API documentation
- `MIGRATION_GUIDE.md` - Step-by-step migration from old system
- `README_SYSTEM.md` - Complete system documentation
- Form field config: `utilities/form-data-v2.ts`
- Component code: See individual `.tsx` files

---

**Estimated Total Time**: 8 days (can be parallelized to 4-5 days)

**Next Steps**: Start with Phase 1 Setup and work through each phase sequentially.

Good luck! 🚀
