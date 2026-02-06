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

export async function POST(req: Request) {
  try {
    const formData = await req.json();

    const doc = new Document({
      sections: [
        {
          properties: {
            page: {
              margin: {
                top: 1440, // 1 inch
                right: 1440,
                bottom: 1440,
                left: 1440,
              },
            },
          },
          children: [
            // College Header with Border
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
                  text: "ADMISSION APPLICATION FORM",
                  bold: true,
                  size: 28,
                  font: "Times New Roman",
                  underline: {
                    type: UnderlineType.DOUBLE,
                  },
                }),
              ],
              alignment: AlignmentType.CENTER,
              spacing: { before: 200, after: 300 },
            }),

            // Academic Year and Program Info Box
            createHeaderInfoBox([
              ["Academic Year", "2025-2026"],
              ["Admission Number", formData.admissionNumber || "N/A"],
              ["Program", formData.program || "N/A"],
              ["Admission Category", formData.admissionType || "N/A"],
            ]),

            // Photo and Signature Placeholder
            new Table({
              width: { size: 100, type: WidthType.PERCENTAGE },
              margins: {
                top: 200,
                bottom: 200,
              },
              rows: [
                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph({
                          children: [
                            new TextRun({
                              text: "Affix Recent",
                              size: 18,
                            }),
                          ],
                          alignment: AlignmentType.CENTER,
                        }),
                        new Paragraph({
                          children: [
                            new TextRun({
                              text: "Passport Size",
                              size: 18,
                            }),
                          ],
                          alignment: AlignmentType.CENTER,
                        }),
                        new Paragraph({
                          children: [
                            new TextRun({
                              text: "Photograph",
                              size: 18,
                            }),
                          ],
                          alignment: AlignmentType.CENTER,
                        }),
                      ],
                      width: { size: 20, type: WidthType.PERCENTAGE },
                      verticalAlign: VerticalAlign.CENTER,
                      margins: {
                        top: 200,
                        bottom: 200,
                        left: 100,
                        right: 100,
                      },
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

            // Section 1: Personal Information
            createSectionHeader("1. PERSONAL INFORMATION"),
            createFormTable([
              ["Full Name (as per 10th certificate)", formData.name || ""],
              ["Date of Birth", formData.dateOfBirth || ""],
              ["Gender", formData.gender || ""],
              ["Blood Group", formData.bloodGroup || ""],
              ["Nationality", formData.nationality || ""],
              ["Religion", formData.religion || ""],
              ["Category", formData.category || ""],
              ["Aadhaar Number", formData.aadhaarNumber || ""],
            ]),

            // Section 2: Contact Information
            createSectionHeader("2. CONTACT INFORMATION"),
            createFormTable([
              ["Email Address", formData.email || ""],
              ["Mobile Number", formData.mobile || ""],
              ["Alternate Mobile Number", formData.alternateMobile || ""],
            ]),

            // Section 3: Permanent Address
            createSectionHeader("3. PERMANENT ADDRESS"),
            createFormTable([
              ["Address", formData.permanentAddress || ""],
              ["City/Town", formData.permanentCity || ""],
              ["State", formData.permanentState || ""],
              ["PIN Code", formData.permanentPincode || ""],
            ]),

            // Section 4: Current Address
            createSectionHeader("4. CURRENT/CORRESPONDENCE ADDRESS"),
            createFormTable([
              ["Address", formData.currentAddress || ""],
              ["City/Town", formData.currentCity || ""],
              ["State", formData.currentState || ""],
              ["PIN Code", formData.currentPincode || ""],
            ]),

            // Section 5: Parent/Guardian Information
            createSectionHeader("5. PARENT/GUARDIAN INFORMATION"),
            new Paragraph({
              children: [
                new TextRun({
                  text: "Father's Details:",
                  bold: true,
                  size: 22,
                }),
              ],
              spacing: { before: 150, after: 100 },
            }),
            createFormTable([
              ["Father's Name", formData.fatherName || ""],
              ["Occupation", formData.fatherOccupation || ""],
              ["Mobile Number", formData.fatherMobile || ""],
            ]),

            new Paragraph({
              children: [
                new TextRun({
                  text: "Mother's Details:",
                  bold: true,
                  size: 22,
                }),
              ],
              spacing: { before: 200, after: 100 },
            }),
            createFormTable([
              ["Mother's Name", formData.motherName || ""],
              ["Occupation", formData.motherOccupation || ""],
              ["Mobile Number", formData.motherMobile || ""],
            ]),

            new Paragraph({
              children: [
                new TextRun({
                  text: "Guardian Details (if applicable):",
                  bold: true,
                  size: 22,
                }),
              ],
              spacing: { before: 200, after: 100 },
            }),
            createFormTable([
              ["Guardian's Name", formData.guardianName || ""],
              ["Relationship", formData.guardianRelationship || ""],
            ]),

            // Section 6: Educational Qualifications
            createSectionHeader("6. EDUCATIONAL QUALIFICATIONS"),
            createFormTable([
              ["Qualifying Examination", formData.qualifyingExam || ""],
              ["Board/University", formData.qualifyingBoard || ""],
              ["Institution Name", formData.qualifyingSchool || ""],
              ["Year of Passing", formData.qualifyingYear || ""],
              ["Maximum Marks", formData.qualifyingMaxMarks || ""],
              ["Marks Obtained", formData.qualifyingObtainedMarks || ""],
              ["Percentage/CGPA", formData.qualifyingPercentage || ""],
            ]),

            // Section 7: Entrance Examination Details
            createSectionHeader("7. ENTRANCE EXAMINATION DETAILS"),
            createFormTable([
              ["Entrance Exam Name", formData.entranceExamType || ""],
              [
                "Roll Number",
                formData.entranceRollNumber ||
                formData.entranceExamRollNumber ||
                "",
              ],
              ["Rank Obtained", formData.entranceRank || ""],
              [
                "Score/Percentile",
                formData.entranceScore || formData.entranceExamScore || "",
              ],
              [
                "Preferred Department/Branch",
                formData.preferredDepartmentName ||
                formData.preferredDepartment ||
                "",
              ],
              ["Admission Quota", formData.admissionQuota || ""],
            ]),

            // Section 8: Bank Details
            createSectionHeader(
              "8. BANK ACCOUNT DETAILS (For Scholarship/Refund)",
            ),
            createFormTable([
              ["Bank Name", formData.bankName || ""],
              ["Branch Name", formData.bankBranch || ""],
              ["Account Number", formData.accountNumber || ""],
              ["IFSC Code", formData.ifscCode || ""],
            ]),

            // Section 9: Services Required
            createSectionHeader("9. COLLEGE SERVICES"),
            createCheckboxTable([
              ["Hostel Accommodation Required", formData.hostelService],
              ["Bus Transportation Required", formData.busService],
              ["Fee Concession Applied", formData.applyForFeeConcession],
            ]),

            // Section 10: Additional Information
            createSectionHeader("10. ADDITIONAL INFORMATION"),
            new Paragraph({
              children: [
                new TextRun({
                  text: formData.additionalInfo || "None",
                  size: 22,
                }),
              ],
              spacing: { before: 100, after: 300 },
            }),

            // Declaration Section
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
                top: { style: BorderStyle.NONE },
                bottom: { style: BorderStyle.NONE },
                left: { style: BorderStyle.NONE },
                right: { style: BorderStyle.NONE },
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
                      borders: {
                        top: { style: BorderStyle.NONE },
                        bottom: { style: BorderStyle.NONE },
                        left: { style: BorderStyle.NONE },
                        right: { style: BorderStyle.NONE },
                      },
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          children: [
                            new TextRun({
                              text: "Signature of Applicant",
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
                      width: { size: 50, type: WidthType.PERCENTAGE },
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

            // Parent/Guardian Signature
            new Paragraph({
              children: [
                new TextRun({
                  text: "",
                }),
              ],
              spacing: { before: 400 },
            }),
            new Table({
              width: { size: 100, type: WidthType.PERCENTAGE },
              borders: {
                top: { style: BorderStyle.NONE },
                bottom: { style: BorderStyle.NONE },
                left: { style: BorderStyle.NONE },
                right: { style: BorderStyle.NONE },
              },
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

            // Footer - For Office Use Only
            new Paragraph({
              children: [
                new TextRun({
                  text: "",
                }),
              ],
              spacing: { before: 600 },
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: "FOR OFFICE USE ONLY",
                  bold: true,
                  size: 24,
                  underline: {
                    type: UnderlineType.SINGLE,
                  },
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
          ],
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
