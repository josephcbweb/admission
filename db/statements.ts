import Database from 'better-sqlite3';

// Define the interface for the student information
interface StudentInfo {
    name: string;
    dob: string; // Use string for date in YYYY-MM-DD format
    gender: string;
    bloodGroup?: string;
    religionOrCaste: string;
    dayScholar: string;
    admittedCategory: string;
    stateOfResidence: string;
    nationality: string;
    fathersName: string;
    mothersName: string;
    guardianName: string;
    occupation: string;
    relationShip: string;
    aadhar: string;
    emailIDStudent: string;
    emailIDFather?: string;
    emailIDGuardian?: string;
    permanentAddress: string;
    permanentAddressPhone: string;
    contactAddress: string;
    contactAddressPhone: string;
    localGuardianAddress?: string;
    localGuardianAddressPhone?: string;
    qualifiedExam: string;
    qualifiedExamRegisterNo: string;
    qualifiedExamInstitution: string;
    TCNumber: string;
    dateOfTC: string; // Use string for date in YYYY-MM-DD format
    TCIssuedInstitution: string;
    marksOfQualifyingInstitutionType: string;
    marksOfQualifyingInstitution: string;
    physics: string;
    chemistry: string;
    maths: string;
    entranceRollNumber: string;
    entranceRank: string;
    bankAccountNo: string;
    bankIFSCCode: string;
    bankName: string;
}

export function populateStudentInfo(values: StudentInfo): void {
    // Connect to SQLite database (or create it if it doesn't exist)
    const db = new Database('students.db');

    // Create the table if it doesn't exist
    db.exec(`CREATE TABLE IF NOT EXISTS StudentInfo (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        dob DATE NOT NULL,
        gender TEXT NOT NULL,
        bloodGroup TEXT,
        religionOrCaste TEXT NOT NULL,
        dayScholar TEXT NOT NULL,
        admittedCategory TEXT NOT NULL,
        stateOfResidence TEXT NOT NULL,
        nationality TEXT NOT NULL,
        fathersName TEXT NOT NULL,
        mothersName TEXT NOT NULL,
        guardianName TEXT NOT NULL,
        occupation TEXT NOT NULL,
        relationShip TEXT NOT NULL,
        aadhar TEXT NOT NULL,
        emailIDStudent TEXT NOT NULL,
        emailIDFather TEXT,
        emailIDGuardian TEXT,
        permanentAddress TEXT NOT NULL,
        permanentAddressPhone TEXT NOT NULL,
        contactAddress TEXT NOT NULL,
        contactAddressPhone TEXT NOT NULL,
        localGuardianAddress TEXT,
        localGuardianAddressPhone TEXT,
        qualifiedExam TEXT NOT NULL,
        qualifiedExamRegisterNo TEXT NOT NULL,
        qualifiedExamInstitution TEXT NOT NULL,
        TCNumber TEXT NOT NULL,
        dateOfTC DATE NOT NULL,
        TCIssuedInstitution TEXT NOT NULL,
        marksOfQualifyingInstitutionType TEXT NOT NULL,
        marksOfQualifyingInstitution TEXT NOT NULL,
        physics TEXT NOT NULL,
        chemistry TEXT NOT NULL,
        maths TEXT NOT NULL,
        entranceRollNumber TEXT NOT NULL,
        entranceRank TEXT NOT NULL,
        bankAccountNo TEXT NOT NULL,
        bankIFSCCode TEXT NOT NULL,
        bankName TEXT NOT NULL
    );`);

    // Prepare the insert statement
    const stmt = db.prepare(`INSERT INTO StudentInfo (
        name, dob, gender, bloodGroup, religionOrCaste, dayScholar, admittedCategory,
        stateOfResidence, nationality, fathersName, mothersName, guardianName, occupation,
        relationShip, aadhar, emailIDStudent, emailIDFather, emailIDGuardian,
        permanentAddress, permanentAddressPhone, contactAddress, contactAddressPhone,
        localGuardianAddress, localGuardianAddressPhone, qualifiedExam,
        qualifiedExamRegisterNo, qualifiedExamInstitution, TCNumber, dateOfTC,
        TCIssuedInstitution, marksOfQualifyingInstitutionType, marksOfQualifyingInstitution,
        physics, chemistry, maths, entranceRollNumber, entranceRank, bankAccountNo,
        bankIFSCCode, bankName
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);

    // Execute the insert statement
    const result = stmt.run(
        values.name, values.dob, values.gender, values.bloodGroup,
        values.religionOrCaste, values.dayScholar, values.admittedCategory,
        values.stateOfResidence, values.nationality, values.fathersName,
        values.mothersName, values.guardianName, values.occupation,
        values.relationShip, values.aadhar, values.emailIDStudent,
        values.emailIDFather, values.emailIDGuardian, values.permanentAddress,
        values.permanentAddressPhone, values.contactAddress, values.contactAddressPhone,
        values.localGuardianAddress, values.localGuardianAddressPhone,
        values.qualifiedExam, values.qualifiedExamRegisterNo,
        values.qualifiedExamInstitution, values.TCNumber, values.dateOfTC,
        values.TCIssuedInstitution, values.marksOfQualifyingInstitutionType,
        values.marksOfQualifyingInstitution, values.physics, values.chemistry,
        values.maths, values.entranceRollNumber, values.entranceRank,
        values.bankAccountNo, values.bankIFSCCode, values.bankName
    );

    console.log(`A row has been inserted with rowid ${result.lastInsertRowid}`);

    // Close the database connection
    db.close();
}
