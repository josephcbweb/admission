import { promises as fs } from "fs";
import { NextResponse, NextRequest } from "next/server";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";

/**
 * POST /api/generate-docx
 *
 * Generates a DOCX document for the admission form based on the program.
 * Supports: B.Tech, MCA, M.Tech
 *
 * Expected body:
 * {
 *   program: "btech" | "mca" | "mtech",
 *   admissionNumber: string,
 *   ... (all form data)
 * }
 */

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { program, admissionNumber } = body;

    if (!program) {
      return NextResponse.json(
        { error: "Program is required" },
        { status: 400 }
      );
    }

    // Select template based on program
    let templatePath = "public/template-btech.docx";
    switch (program) {
      case "mca":
        templatePath = "public/template-mca.docx";
        break;
      case "mtech":
        templatePath = "public/template-mtech.docx";
        break;
      case "btech":
      default:
        templatePath = "public/template-btech.docx";
        break;
    }

    // Try to read template, fall back to generic if not found
    let template;
    try {
      template = await fs.readFile(templatePath, "binary");
    } catch (err) {
      console.warn(
        `Template ${templatePath} not found, using generic template`
      );
      // Fallback to generic template
      template = await fs.readFile("public/template.docx", "binary");
    }

    const zip = new PizZip(template);
    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
    });

    // Prepare data for template
    const currentDate = new Date().toLocaleDateString("en-GB");
    const templateData = {
      ...body,
      date: currentDate,
      submissionDate: currentDate,
      admissionNumber: admissionNumber || "PENDING",
      // Map program names
      programName:
        program === "btech"
          ? "B.Tech (Bachelor of Technology)"
          : program === "mca"
          ? "MCA (Master of Computer Applications)"
          : "M.Tech (Master of Technology)",
      // Format dates
      dob: body.dateOfBirth
        ? new Date(body.dateOfBirth).toLocaleDateString("en-GB")
        : "",
      tcDate: body.tcDate
        ? new Date(body.tcDate).toLocaleDateString("en-GB")
        : "",
      // Format numbers
      aadhaar: body.aadhaar ? maskAadhaar(body.aadhaar) : "",
      bankAccount: body.bankAccountNumber
        ? maskBankAccount(body.bankAccountNumber)
        : "",
    };

    // Render the template
    try {
      doc.render(templateData);
    } catch (error) {
      console.error("Docxtemplater rendering error:", error);
      return NextResponse.json(
        { error: "Template rendering failed" },
        { status: 500 }
      );
    }

    // Generate buffer
    const buffer = doc.getZip().generate({
      type: "nodebuffer",
      mimeType:
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    });

    // Return document
    return new NextResponse(new Uint8Array(buffer), {
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "Content-Disposition": `attachment; filename="admission-${
          admissionNumber || "form"
        }.docx"`,
      },
    });
  } catch (error) {
    console.error("DOCX generation error:", error);
    return NextResponse.json(
      { error: "Document generation failed" },
      { status: 500 }
    );
  }
}

// Utility function to mask Aadhaar (show last 4 digits only)
function maskAadhaar(aadhaar: string): string {
  if (aadhaar.length < 4) return aadhaar;
  return "XXXX XXXX " + aadhaar.slice(-4);
}

// Utility function to mask bank account (show last 4 digits only)
function maskBankAccount(account: string): string {
  if (account.length < 4) return account;
  return "XXXX XXXX XXXX " + account.slice(-4);
}
