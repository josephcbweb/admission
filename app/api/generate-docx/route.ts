import { NextResponse } from "next/server";
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableCell,
  TableRow,
  WidthType,
  AlignmentType,
  BorderStyle,
  HeadingLevel,
  UnderlineType,
  VerticalAlign,
} from "docx";

type DocElement = Paragraph | Table;

export async function POST(req: Request) {
  try {
    const formData = await req.json();

    const program = (formData.program || "").toUpperCase(); // BTECH, MCA, MTECH
    const admissionType = (formData.admissionType || "regular").toLowerCase();

    // Pick the right template based on program
    let children: DocElement[];
    if (program === "BTECH") {
      children = buildBTechDocument(formData, admissionType);
    } else {
      // MCA and MTECH share the same PG template
      children = buildPGDocument(formData, program);
    }

    const doc = new Document({
      sections: [
        {
          properties: {
            page: {
              margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 },
            },
          },
          children,
        },
      ],
    });

    const buffer = await Packer.toBuffer(doc);

    return new NextResponse(buffer as any, {
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "Content-Disposition": `attachment; filename="CEC_Admission_Form_${formData.admissionNumber || "Application"
          }.docx"`,
      },
    });
  } catch (error) {
    console.error("Error generating document:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to generate document",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

// ============================================================
// B.TECH TEMPLATE
// ============================================================

function buildBTechDocument(
  formData: any,
  admissionType: string,
): DocElement[] {
  const isLateral = admissionType === "lateral";
  const isNRI = admissionType === "nri";
  const hasEntrance = !isLateral; // lateral has no entrance exam
  let sectionNum = 1;

  const children: DocElement[] = [
    ...buildHeaderSection(formData, "BTECH", admissionType),

    // 1. Personal Information
    createSectionHeader(`${sectionNum++}. PERSONAL INFORMATION`),
    createFormTable([
      ["Full Name (as per 10th certificate)", formData.name || ""],
      ["Date of Birth", formData.dateOfBirth || ""],
      ["Gender", formData.gender || ""],
      ["Blood Group", formData.bloodGroup || ""],
      ["Nationality", formData.nationality || ""],
      ["Religion", formData.religion || ""],
      ["Caste", formData.caste || ""],
      ["Category", formData.category || ""],
      ["Mother Tongue", formData.motherTongue || ""],
      ["Aadhaar Number", formData.aadhaar || ""],
      ["Preferred Department/Branch", formData.preferredDepartmentName || ""],
    ]),

    // 2. Contact Information
    createSectionHeader(`${sectionNum++}. CONTACT INFORMATION`),
    createFormTable([
      ["Email Address", formData.email || ""],
      ["Mobile Number", formData.phone || ""],
    ]),

    // 3. Permanent Address
    createSectionHeader(`${sectionNum++}. PERMANENT ADDRESS`),
    createFormTable([
      ["Address", formData.permanentAddress || ""],
      ["State", formData.permanentAddressState || ""],
      ["PIN Code", formData.permanentPincode || ""],
    ]),

    // 4. Contact/Correspondence Address
    createSectionHeader(`${sectionNum++}. CONTACT/CORRESPONDENCE ADDRESS`),
    createFormTable([
      ["Address", formData.contactAddress || ""],
      ["State", formData.contactAddressState || ""],
      ["PIN Code", formData.contactPincode || ""],
    ]),

    // 5. Local Guardian Information
    createSectionHeader(`${sectionNum++}. LOCAL GUARDIAN INFORMATION`),
    createFormTable([
      ["Local Guardian Name", formData.localGuardianName || ""],
      ["Local Guardian Address", formData.localGuardianAddress || ""],
      ["Local Guardian Phone", formData.localGuardianPhone || ""],
    ]),

    // 6. Parent/Guardian Information
    ...buildParentSection(formData, sectionNum++),
  ];

  // 7. Educational Qualifications
  children.push(
    createSectionHeader(`${sectionNum++}. EDUCATIONAL QUALIFICATIONS`),
  );

  if (isLateral) {
    // Qualifying exam common fields
    children.push(
      createFormTable([
        ["Qualifying Examination", formData.qualifyingExam || ""],
        ["Register Number", formData.qualifyingExamRegisterNo || ""],
        ["Exam Conducted By", formData.qualifyingExamInstitute || ""],
        ["Institution / School Name", formData.qualifyingSchool || ""],
        ["Year of Passing", formData.qualifyingExamPassoutYear || ""],
      ]),
    );
    // Polytechnic/Diploma details
    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: "Polytechnic/Diploma Details:",
            bold: true,
            size: 22,
          }),
        ],
        spacing: { before: 200, after: 100 },
      }),
    );
    children.push(
      createFormTable([
        ["Polytechnic Institute", formData.polytechnicInstitute || ""],
        ["Branch/Stream", formData.polytechnicBranch || ""],
        ["Semesters Completed", formData.polytechnicSemestersCompleted || ""],
        ["CGPA", formData.polytechnicCGPA || ""],
        ["Year of Passing", formData.polytechnicPassoutYear || ""],
      ]),
    );
  } else {
    // Regular / NRI / Management: common fields + Plus Two scores
    children.push(
      createFormTable([
        ["Qualifying Examination", formData.qualifyingExam || ""],
        ["Register Number", formData.qualifyingExamRegisterNo || ""],
        ["Exam Conducted By", formData.qualifyingExamInstitute || ""],
        ["Institution / School Name", formData.qualifyingSchool || ""],
        ["Year of Passing", formData.qualifyingExamPassoutYear || ""],
      ]),
    );
    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: "Plus Two / 12th Marks:",
            bold: true,
            size: 22,
          }),
        ],
        spacing: { before: 200, after: 100 },
      }),
    );
    children.push(
      createFormTable([
        ["Physics Score", formData.physicsScore || ""],
        ["Chemistry Score", formData.chemistryScore || ""],
        ["Mathematics Score", formData.mathsScore || ""],
        ["Total Percentage", formData.totalPercentage || ""],
      ]),
    );
  }

  // 8. Entrance Examination Details (not for lateral)
  if (hasEntrance) {
    children.push(
      createSectionHeader(`${sectionNum++}. ENTRANCE EXAMINATION DETAILS`),
    );
    if (isNRI) {
      children.push(
        createFormTable([
          [
            "Have you written any Entrance Exam?",
            formData.hasEntranceExam === "yes" ? "Yes" : "No",
          ],
          ...(formData.hasEntranceExam === "yes"
            ? [
              ["Entrance Exam Type", formData.entranceExamType || ""],
              ["Roll Number", formData.entranceExamRollNumber || ""],
              ["Rank", formData.entranceRank || ""],
              ["Score", formData.entranceExamScore || ""],
            ]
            : []),
        ] as string[][]),
      );
    } else {
      children.push(
        createFormTable([
          ["Entrance Exam Type", formData.entranceExamType || ""],
          ["Roll Number", formData.entranceExamRollNumber || ""],
          ["Rank", formData.entranceRank || ""],
          ["Score", formData.entranceExamScore || ""],
        ]),
      );
    }
  }

  // TC, Bank, Additional, Declaration, Signatures, Office Use
  children.push(...buildTailSections(formData, sectionNum));

  return children;
}

// ============================================================
// PG TEMPLATE (MCA & M.TECH)
// ============================================================

function buildPGDocument(formData: any, program: string): DocElement[] {
  const isMTech = program === "MTECH";
  let sectionNum = 1;

  const children: DocElement[] = [
    ...buildHeaderSection(formData, program, "regular"),

    // 1. Personal Information
    createSectionHeader(`${sectionNum++}. PERSONAL INFORMATION`),
    createFormTable([
      ["Full Name (as per degree certificate)", formData.name || ""],
      ["Date of Birth", formData.dateOfBirth || ""],
      ["Gender", formData.gender || ""],
      ["Blood Group", formData.bloodGroup || ""],
      ["Nationality", formData.nationality || ""],
      ["Religion", formData.religion || ""],
      ["Caste", formData.caste || ""],
      ["Category", formData.category || ""],
      ["Mother Tongue", formData.motherTongue || ""],
      ["Aadhaar Number", formData.aadhaar || ""],
      [
        isMTech ? "Preferred Specialization" : "Preferred Department",
        formData.preferredDepartmentName || "",
      ],
    ]),

    // 2. Contact Information
    createSectionHeader(`${sectionNum++}. CONTACT INFORMATION`),
    createFormTable([
      ["Email Address", formData.email || ""],
      ["Mobile Number", formData.phone || ""],
    ]),

    // 3. Permanent Address
    createSectionHeader(`${sectionNum++}. PERMANENT ADDRESS`),
    createFormTable([
      ["Address", formData.permanentAddress || ""],
      ["State", formData.permanentAddressState || ""],
      ["PIN Code", formData.permanentPincode || ""],
    ]),

    // 4. Contact/Correspondence Address
    createSectionHeader(`${sectionNum++}. CONTACT/CORRESPONDENCE ADDRESS`),
    createFormTable([
      ["Address", formData.contactAddress || ""],
      ["State", formData.contactAddressState || ""],
      ["PIN Code", formData.contactPincode || ""],
    ]),

    // 5. Local Guardian Information
    createSectionHeader(`${sectionNum++}. LOCAL GUARDIAN INFORMATION`),
    createFormTable([
      ["Local Guardian Name", formData.localGuardianName || ""],
      ["Local Guardian Address", formData.localGuardianAddress || ""],
      ["Local Guardian Phone", formData.localGuardianPhone || ""],
    ]),

    // 6. Parent/Guardian Information
    ...buildParentSection(formData, sectionNum++),
  ];

  // 7. Educational Qualifications (PG-specific)
  children.push(
    createSectionHeader(`${sectionNum++}. EDUCATIONAL QUALIFICATIONS`),
  );

  if (isMTech) {
    children.push(
      createFormTable([
        ["Bachelor's Degree/Diploma", formData.bachelorDegree || ""],
        ["Branch/Specialization", formData.bachelorBranch || ""],
        ["Last Institution Attended", formData.qualifyingSchool || ""],
        ["Register/Roll Number", formData.qualifyingExamRegisterNo || ""],
        ["University/Board", formData.bachelorUniversity || ""],
        ["CGPA/Percentage", formData.bachelorCGPA || ""],
        ["Year of Passing", formData.bachelorPassoutYear || ""],
      ]),
    );
  } else {
    // MCA
    children.push(
      createFormTable([
        ["Bachelor's Degree", formData.bachelorDegree || ""],
        ["Last Institution Attended", formData.qualifyingSchool || ""],
        ["Register/Roll Number", formData.qualifyingExamRegisterNo || ""],
        ["University/Board", formData.bachelorUniversity || ""],
        ["CGPA/Percentage", formData.bachelorCGPA || ""],
        ["Year of Passing", formData.bachelorPassoutYear || ""],
      ]),
    );
  }

  // 8. Entrance Examination Details
  children.push(
    createSectionHeader(`${sectionNum++}. ENTRANCE EXAMINATION DETAILS`),
  );

  const isNRI = formData.admissionType === "nri";

  if (isNRI) {
    children.push(
      createFormTable([
        [
          "Have you written any Entrance Exam?",
          formData.hasEntranceExam === "yes" ? "Yes" : "No",
        ],
        ...(formData.hasEntranceExam === "yes"
          ? [
            ...(isMTech
              ? [
                ["M.Tech Entrance Exam Type", formData.mtechEntranceExamType || ""],
                ["Score", formData.mtechEntranceScore || ""],
                ["Rank", formData.mtechEntranceRank || ""],
              ]
              : [
                ["MCA Entrance Exam Type", formData.mcaEntranceExamType || ""],
                ["Score/Percentile", formData.mcaEntranceScore || ""],
                ["Rank", formData.mcaEntranceRank || ""],
              ]),
          ]
          : []),
      ] as string[][]),
    );
  } else {
    if (isMTech) {
      children.push(
        createFormTable([
          ["M.Tech Entrance Exam Type", formData.mtechEntranceExamType || ""],
          ["Score", formData.mtechEntranceScore || ""],
          ["Rank", formData.mtechEntranceRank || ""],
        ]),
      );
    } else {
      children.push(
        createFormTable([
          ["MCA Entrance Exam Type", formData.mcaEntranceExamType || ""],
          ["Score/Percentile", formData.mcaEntranceScore || ""],
          ["Rank", formData.mcaEntranceRank || ""],
        ]),
      );
    }
  }

  // TC, Bank, Additional, Declaration, Signatures, Office Use
  children.push(...buildTailSections(formData, sectionNum));

  return children;
}

// ============================================================
// SHARED / COMMON BUILDERS
// ============================================================

function buildHeaderSection(
  formData: any,
  program: string,
  admissionType: string,
): DocElement[] {
  const programLabel =
    program === "BTECH" ? "B.Tech" : program === "MCA" ? "MCA" : "M.Tech";
  const categoryLabel =
    admissionType === "nri" ? "NRI" : admissionType.toUpperCase();

  return [
    // College Header
    new Paragraph({
      children: [
        new TextRun({
          text: "COLLEGE OF ENGINEERING, CHERTHALA",
          bold: true,
          size: 32,
          font: "Times New Roman",
        }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: { after: 100 },
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: "An Autonomous Institution",
          size: 22,
          italics: true,
          font: "Times New Roman",
        }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: { after: 100 },
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: "Cherthala, Alappuzha District, Kerala - 688524",
          size: 20,
          font: "Times New Roman",
        }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: { after: 200 },
    }),

    // Horizontal Line
    new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      borders: {
        top: { style: BorderStyle.DOUBLE, size: 6, color: "000000" },
        bottom: { style: BorderStyle.NONE },
        left: { style: BorderStyle.NONE },
        right: { style: BorderStyle.NONE },
      },
      rows: [
        new TableRow({
          height: { value: 100, rule: "exact" },
          children: [
            new TableCell({
              children: [new Paragraph("")],
              borders: {
                top: { style: BorderStyle.NONE },
                bottom: { style: BorderStyle.NONE },
                left: { style: BorderStyle.NONE },
                right: { style: BorderStyle.NONE },
              },
            }),
          ],
        }),
      ],
    }),

    // Title
    new Paragraph({
      children: [
        new TextRun({
          text: `${programLabel} ADMISSION APPLICATION FORM`,
          bold: true,
          size: 28,
          font: "Times New Roman",
          underline: { type: UnderlineType.DOUBLE },
        }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: { before: 200, after: 300 },
    }),

    // Info Box
    createHeaderInfoBox([
      ["Academic Year", "2025-2026"],
      ["Admission Number", formData.admissionNumber || "N/A"],
      ["Program", programLabel],
      ["Admission Category", categoryLabel],
    ]),

    // Photo Placeholder
    new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      margins: { top: 200, bottom: 200 },
      rows: [
        new TableRow({
          children: [
            new TableCell({
              children: [
                new Paragraph({
                  children: [new TextRun({ text: "Affix Recent", size: 18 })],
                  alignment: AlignmentType.CENTER,
                }),
                new Paragraph({
                  children: [new TextRun({ text: "Passport Size", size: 18 })],
                  alignment: AlignmentType.CENTER,
                }),
                new Paragraph({
                  children: [new TextRun({ text: "Photograph", size: 18 })],
                  alignment: AlignmentType.CENTER,
                }),
              ],
              width: { size: 20, type: WidthType.PERCENTAGE },
              verticalAlign: VerticalAlign.CENTER,
              margins: { top: 200, bottom: 200, left: 100, right: 100 },
            }),
            new TableCell({
              children: [new Paragraph("")],
              width: { size: 80, type: WidthType.PERCENTAGE },
              borders: {
                top: { style: BorderStyle.NONE },
                bottom: { style: BorderStyle.NONE },
                left: { style: BorderStyle.NONE },
                right: { style: BorderStyle.NONE },
              },
            }),
          ],
        }),
      ],
    }),
  ];
}

function buildParentSection(formData: any, sectionNum: number): DocElement[] {
  return [
    createSectionHeader(`${sectionNum}. PARENT/GUARDIAN INFORMATION`),
    new Paragraph({
      children: [
        new TextRun({ text: "Father's Details:", bold: true, size: 22 }),
      ],
      spacing: { before: 150, after: 100 },
    }),
    createFormTable([
      ["Father's Name", formData.fatherName || ""],
      ["Occupation", formData.fatherOccupation || ""],
      ["Mobile Number", formData.fatherPhone || ""],
    ]),
    new Paragraph({
      children: [
        new TextRun({ text: "Mother's Details:", bold: true, size: 22 }),
      ],
      spacing: { before: 200, after: 100 },
    }),
    createFormTable([
      ["Mother's Name", formData.motherName || ""],
      ["Occupation", formData.motherOccupation || ""],
      ["Mobile Number", formData.motherPhone || ""],
    ]),
    new Paragraph({
      children: [new TextRun({ text: "Other Details:", bold: true, size: 22 })],
      spacing: { before: 200, after: 100 },
    }),
    createFormTable([
      ["Parent Email (Any One)", formData.parentEmail || ""],
      ["Annual Family Income (₹)", formData.annualFamilyIncome || ""],
      ["Guardian's Name (if applicable)", formData.guardianName || ""],
      ["Guardian Relationship", formData.guardianRelationship || ""],
    ]),
  ];
}

/** Builds TC, Bank, Additional Info, Declaration, Signatures, Office Use */
function buildTailSections(formData: any, sectionNum: number): DocElement[] {
  const noBorder = {
    top: { style: BorderStyle.NONE },
    bottom: { style: BorderStyle.NONE },
    left: { style: BorderStyle.NONE },
    right: { style: BorderStyle.NONE },
  };

  return [
    // TC Details
    createSectionHeader(`${sectionNum++}. TC DETAILS`),
    createFormTable([
      ["TC Number", formData.tcNumber || ""],
      [
        "TC Date",
        formData.tcDate
          ? new Date(formData.tcDate).toLocaleDateString("en-IN")
          : "",
      ],
      ["TC Issued By", formData.tcIssuedBy || ""],
    ]),

    // Bank Details
    createSectionHeader(
      `${sectionNum++}. BANK ACCOUNT DETAILS (For Scholarship/Refund)`,
    ),
    createFormTable([
      ["Bank Name", formData.bankName || ""],
      ["Branch Name", formData.bankBranch || ""],
      ["Account Number", formData.bankAccountNumber || ""],
      ["IFSC Code", formData.bankIFSCCode || ""],
    ]),

    // Additional Information
    createSectionHeader(`${sectionNum++}. ADDITIONAL INFORMATION`),
    createCheckboxTable([
      [
        "Hostel Accommodation Required",
        formData.hostelService === true ||
        formData.hostelService === "true" ||
        formData.hostelService === "on",
      ],
      [
        "Bus Transportation Required",
        formData.busService === true ||
        formData.busService === "true" ||
        formData.busService === "on",
      ],
      [
        "Apply for Fee Concession",
        formData.applyForFeeConcession === true ||
        formData.applyForFeeConcession === "true" ||
        formData.applyForFeeConcession === "on",
      ],
    ]),
    new Paragraph({
      children: [
        new TextRun({ text: "Other Information: ", bold: true, size: 22 }),
        new TextRun({ text: formData.additionalInfo || "None", size: 22 }),
      ],
      spacing: { before: 150, after: 300 },
    }),

    // Declaration
    createSectionHeader("DECLARATION"),
    new Paragraph({
      children: [
        new TextRun({
          text: "I hereby declare that the information provided above is true and correct to the best of my knowledge and belief. I understand that any false information may lead to cancellation of my admission without any notice. I agree to abide by the rules and regulations of the College of Engineering, Cherthala.",
          size: 22,
        }),
      ],
      alignment: AlignmentType.JUSTIFIED,
      spacing: { after: 400 },
    }),

    // Signature Section
    new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      borders: {
        ...noBorder,
        insideHorizontal: { style: BorderStyle.NONE },
        insideVertical: { style: BorderStyle.NONE },
      },
      rows: [
        new TableRow({
          children: [
            new TableCell({
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: "Place: ___________________",
                      size: 22,
                    }),
                  ],
                  spacing: { after: 200 },
                }),
                new Paragraph({
                  children: [
                    new TextRun({
                      text: "Date: ____________________",
                      size: 22,
                    }),
                  ],
                }),
              ],
              width: { size: 50, type: WidthType.PERCENTAGE },
              borders: noBorder,
            }),
            new TableCell({
              children: [
                new Paragraph({
                  children: [
                    new TextRun({ text: "Signature of Applicant", size: 22 }),
                  ],
                  alignment: AlignmentType.CENTER,
                  spacing: { after: 200 },
                }),
                new Paragraph({
                  children: [
                    new TextRun({
                      text: "_______________________",
                      size: 22,
                    }),
                  ],
                  alignment: AlignmentType.CENTER,
                }),
              ],
              width: { size: 50, type: WidthType.PERCENTAGE },
              borders: noBorder,
            }),
          ],
        }),
      ],
    }),

    // Parent/Guardian Signature
    new Paragraph({
      children: [new TextRun({ text: "" })],
      spacing: { before: 400 },
    }),
    new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      borders: noBorder,
      rows: [
        new TableRow({
          children: [
            new TableCell({
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: "Signature of Parent/Guardian",
                      size: 22,
                    }),
                  ],
                  alignment: AlignmentType.CENTER,
                  spacing: { after: 200 },
                }),
                new Paragraph({
                  children: [
                    new TextRun({
                      text: "_______________________",
                      size: 22,
                    }),
                  ],
                  alignment: AlignmentType.CENTER,
                }),
              ],
              borders: noBorder,
            }),
          ],
        }),
      ],
    }),

    // Office Use Only
    new Paragraph({
      children: [new TextRun({ text: "" })],
      spacing: { before: 600 },
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: "FOR OFFICE USE ONLY",
          bold: true,
          size: 24,
          underline: { type: UnderlineType.SINGLE },
        }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: { after: 200 },
    }),
    createFormTable([
      ["Application Received Date", ""],
      ["Application Fee Receipt No.", ""],
      ["Verification Status", ""],
      ["Approved By", ""],
      ["Remarks", ""],
    ]),
  ];
}

// Helper Functions
function createSectionHeader(title: string) {
  return new Paragraph({
    children: [
      new TextRun({
        text: title,
        bold: true,
        size: 24,
        font: "Times New Roman",
      }),
    ],
    spacing: { before: 400, after: 200 },
    border: {
      bottom: {
        color: "000000",
        space: 1,
        style: BorderStyle.SINGLE,
        size: 6,
      },
    },
  });
}

function createHeaderInfoBox(data: string[][]) {
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: {
      top: { style: BorderStyle.DOUBLE, size: 6, color: "000000" },
      bottom: { style: BorderStyle.DOUBLE, size: 6, color: "000000" },
      left: { style: BorderStyle.DOUBLE, size: 6, color: "000000" },
      right: { style: BorderStyle.DOUBLE, size: 6, color: "000000" },
      insideHorizontal: { style: BorderStyle.SINGLE, size: 3 },
      insideVertical: { style: BorderStyle.SINGLE, size: 3 },
    },
    margins: {
      top: 100,
      bottom: 100,
      left: 100,
      right: 100,
    },
    rows: data.map(
      ([label, value]) =>
        new TableRow({
          children: [
            new TableCell({
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: label,
                      bold: true,
                      size: 22,
                    }),
                  ],
                }),
              ],
              width: { size: 40, type: WidthType.PERCENTAGE },
              shading: {
                fill: "F0F0F0",
              },
            }),
            new TableCell({
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: value,
                      size: 22,
                      bold: true,
                    }),
                  ],
                }),
              ],
              width: { size: 60, type: WidthType.PERCENTAGE },
            }),
          ],
        }),
    ),
  });
}

function createFormTable(data: string[][]) {
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: {
      top: { style: BorderStyle.SINGLE, size: 3 },
      bottom: { style: BorderStyle.SINGLE, size: 3 },
      left: { style: BorderStyle.SINGLE, size: 3 },
      right: { style: BorderStyle.SINGLE, size: 3 },
      insideHorizontal: { style: BorderStyle.SINGLE, size: 3 },
      insideVertical: { style: BorderStyle.SINGLE, size: 3 },
    },
    rows: data.map(
      ([label, value]) =>
        new TableRow({
          children: [
            new TableCell({
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: label,
                      size: 22,
                      bold: true,
                    }),
                  ],
                }),
              ],
              width: { size: 40, type: WidthType.PERCENTAGE },
              shading: {
                fill: "F5F5F5",
              },
              margins: {
                top: 100,
                bottom: 100,
                left: 100,
                right: 100,
              },
            }),
            new TableCell({
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: value || "",
                      size: 22,
                    }),
                  ],
                }),
              ],
              width: { size: 60, type: WidthType.PERCENTAGE },
              margins: {
                top: 100,
                bottom: 100,
                left: 100,
                right: 100,
              },
            }),
          ],
        }),
    ),
  });
}

function createCheckboxTable(data: [string, boolean | undefined][]) {
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: {
      top: { style: BorderStyle.SINGLE, size: 3 },
      bottom: { style: BorderStyle.SINGLE, size: 3 },
      left: { style: BorderStyle.SINGLE, size: 3 },
      right: { style: BorderStyle.SINGLE, size: 3 },
      insideHorizontal: { style: BorderStyle.SINGLE, size: 3 },
      insideVertical: { style: BorderStyle.SINGLE, size: 3 },
    },
    rows: data.map(
      ([label, checked]) =>
        new TableRow({
          children: [
            new TableCell({
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: label,
                      size: 22,
                      bold: true,
                    }),
                  ],
                }),
              ],
              width: { size: 70, type: WidthType.PERCENTAGE },
              shading: {
                fill: "F5F5F5",
              },
              margins: {
                top: 100,
                bottom: 100,
                left: 100,
                right: 100,
              },
            }),
            new TableCell({
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: checked ? "☑ Yes" : "☐ No",
                      size: 22,
                      bold: true,
                    }),
                  ],
                  alignment: AlignmentType.CENTER,
                }),
              ],
              width: { size: 30, type: WidthType.PERCENTAGE },
              margins: {
                top: 100,
                bottom: 100,
                left: 100,
                right: 100,
              },
            }),
          ],
        }),
    ),
  });
}
