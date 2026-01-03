# Backend Implementation Prompt for Admission System

You are building an Express.js backend for a college admission management system. The backend will serve two frontends:

1. **Student Admission Frontend** (Next.js) - Where students submit admission applications
2. **Admin Dashboard Frontend** (Vite React) - Where admins manage admissions, approve/reject applications, and configure settings

---

## Project Context

**Database**: PostgreSQL with Prisma ORM  
**Backend**: Express.js + TypeScript  
**Authentication**: JWT-based (for admin dashboard)

The Prisma schema is provided below. Use this schema as the single source of truth for all database operations.

---

## Prisma Schema

```prisma
// [Include the full schema from the original file here - the Student, User, Role, Permission, AdmissionWindow, etc. models]

generator client {
  provider = "prisma-client"
  output   = "../generated/prisma"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id                    Int               @id @default(autoincrement()) @map("user_id")
  username              String            @unique
  passwordHash          String            @map("password_hash")
  email                 String            @unique
  status                UserStatus        @default(active)
  lastLogin             DateTime?         @map("last_login")
  createdAt             DateTime          @default(now()) @map("created_at")
  updatedAt             DateTime          @updatedAt @map("updated_at")
  advisorDetails        AdvisorDetails?
  auditLogs             AuditLog[]
  approvedCertificates  Certificate[]
  hodDetails            HodDetails?
  approvals             NoDueApproval[]
  receivedNotifications Notification[]    @relation("ReceivedNotifications")
  sentNotifications     Notification[]    @relation("SentNotifications")
  principalDetails      PrincipalDetails?
  students              Student[]
  userRoles             UserRole[]

  @@map("users")
}

model Student {
  id                                  Int             @id @default(autoincrement()) @map("student_id")
  advisorId                           Int?            @map("advisor_id")
  createdAt                           DateTime        @default(now()) @map("created_at")
  updatedAt                           DateTime        @updatedAt @map("updated_at")
  name                                String
  password                            String
  dateOfBirth                         DateTime?       @map("date_of_birth")
  email                               String?         @unique
  gender                              Gender
  religion                            String
  nationality                         String          @default("Indian")
  mother_tongue                       String
  blood_group                         String?
  student_phone_number                String          @unique
  permanent_address                   String
  contact_address                     String
  state_of_residence                  String
  aadhaar_number                      String          @unique
  fatherName                          String?
  father_phone_number                 String?
  motherName                          String?
  mother_phone_number                 String?
  parent_email                        String?
  annual_family_income                Decimal?
  guardian_name                       String?
  guardian_relationship               String?
  guardian_email                      String?
  local_guardian_address              String?
  local_guardian_phone_number         String?
  program                             Program
  departmentId                        Int             @map("department_id")
  status                              AdmissionStatus @default(pending)
  admission_number                    String?         @unique
  admission_date                      DateTime?
  admission_type                      AdmissionType   @default(regular)
  category                            String?
  allotted_branch                     String
  is_fee_concession_eligible          Boolean         @default(false)
  last_institution                    String
  tc_number                           String?
  tc_date                             DateTime?
  qualifying_exam_name                String
  qualifying_exam_register_no         String
  percentage                          Float?
  previous_degree_cgpa_or_total_marks Float?
  physics_score                       Float?
  chemistry_score                     Float?
  maths_score                         Float?
  keam_subject_total                  Float?
  entrance_type                       String?
  entrance_roll_no                    String?
  entrance_rank                       Int?
  entrance_total_score                Float?
  account_number                      String?
  bank_name                           String?
  ifsc_code                           String?
  bank_branch                         String?
  admitted_category                   String?
  admission_quota                     String?
  certificates                        Certificate[]
  feeDetails                          FeeDetails[]
  invoices                            Invoice[]
  requests                            NoDueRequest[]
  users                               User?           @relation(fields: [advisorId], references: [id])
  department                          Department      @relation(fields: [departmentId], references: [id])

  @@map("students")
}

// Add these new models to schema:

model AdmissionWindow {
  id          Int      @id @default(autoincrement()) @map("admission_window_id")
  program     Program
  isOpen      Boolean  @default(false) @map("is_open")
  startDate   DateTime @map("start_date")
  endDate     DateTime @map("end_date")
  description String?
  createdAt   DateTime @default(now()) @map("created_at")
  updatedAt   DateTime @updatedAt @map("updated_at")

  @@map("admission_windows")
}

model AdmissionConfig {
  id                Int      @id @default(autoincrement()) @map("config_id")
  key               String   @unique
  value             String
  description       String?
  lastModifiedBy    Int?     @map("last_modified_by")
  createdAt         DateTime @default(now()) @map("created_at")
  updatedAt         DateTime @updatedAt @map("updated_at")

  @@map("admission_configs")
}

enum Program {
  btech
  mca
  mtech
}

enum AdmissionStatus {
  pending
  approved
  rejected
  waitlisted
}

enum AdmissionType {
  nri
  regular
  lateral
  management
}

enum Gender {
  male
  female
  other
}
```
